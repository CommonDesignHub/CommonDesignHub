import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

class Catalog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item:{},
      projects:[],
      images:[],
      comment:""
    }
  }

  componentDidMount(){
    this.getItem()
  }

  onImageChange = event => {
    this.setState({
      images: event.target.files
    })
  }

  submitComment = async (e)=>{
    e.preventDefault()
    var payload = {
      content: this.state.comment
    }
    if(this.state.images.length){
      const formData = new FormData()

      Array.from(this.state.images).forEach(image => {
        formData.append('files', image)
      })
      var res = await axios.post(`http://localhost:1337/api/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      var image_url = res.data.path
      payload.image_url="/"+image_url
    }

    axios.post(`/api/item/${this.state.item.id}/comment`, payload)
      .then(res => {
        let id = res.data.id
        this.getItem()
      })
      .catch(err => {
        console.log(err)
      })
  }

  commentTextareaOnchange = (e) => {
    this.setState({comment: e.target.value})
  }

  getItem = (e)=>{
    var id = this.props.match.params.id
    axios.get(`/api/item/${id}`)
    .then((ret)=>{
      let list = ret.data.projects
      list.map((project) => {
        project.voteCount = 0
        project.priority = 0
        project.votes.forEach(vote => {
          if (vote.dir && vote.createdAt) {
            project.priority+=parseInt(vote.dir)
          }
          if (vote.dir) {
            project.voteCount+=parseInt(vote.dir)
          }
        })
      })
      list = list.sort((a, b) => b.priority-a.priority)
      this.setState({item: ret.data, projects:list})
    })
    .catch(()=>{})
  }

  voteProject = (pid, dir)=>{
    var user_id = this.props.user.id
    if(!user_id){
      return
    }
    axios.post(`/api/vote?pid=${pid}&dir=${dir}`)
    .then((ret)=>{
      const project = this.state.projects.find(project => project.id === pid)
      let i = -1
      const bool = project && project.votes && project.votes.some((vote) => {
        i++
        return vote.userId === user_id
      })
      if (bool) {
        // if user has already voted, update vote on front end
        project.votes[i]={userId: user_id, dir: dir}
        this.setState({projects: this.state.projects})
      } else if (project) {
        // if user has not voted, add vote to votes array
        project.votes.push({userId: user_id, dir: dir})
        this.setState({projects: this.state.projects})
      }
    })
    .catch(()=>{})
  }

  render() {
    let list = this.state.projects
    list.map((project) => {
      project.voteCount = 0
      project.votes.forEach(vote => {
        if (vote.dir) {
          project.voteCount+=parseInt(vote.dir)
        }

      })
    })
    var item = this.state.item
    return (
      <React.Fragment>
        {list.length?<div>
          {this.state.item.id?(
            <div>
              <p>{item.title}</p>
              <br/>
              <p>Projects List</p>
              <div className="project-container">
                {
                  list.length
                  ?list.map(project => (
                    <div className="project-bar" style={{backgroundColor: project.color, width:"100%"}} key={project.id} id={project.id}>
                      <div style={{width:"5em"}}>
                        <div className="vote-btn-container">
                          <button id={`up${project.id}`} className="upvote" onClick={this.voteProject.bind(this, project.id, 1)}>Up</button>
                          <button id={`dn${project.id}`} className="downvote" onClick={this.voteProject.bind(this, project.id, -1)}>Dn</button>
                        </div>
                        <p>Likes: {project.voteCount}</p>
                      </div>
                      <div style={{width:"100%"}}>
                        <Link to={`/projects/${project.id}`} style={{textAlign:"center", marginRight:"150px"}}>{project.title}</Link>
                      </div>
                      <div style= {{display:"inline-flex"}}><img style={{border:"1px solid #ddd", borderRadius:"4px", padding:"5px", width:"100px", margin:"10px"}} src={project.image_url?project.image_url:"/assets/placeholder.png"}></img></div>
                    </div>
                  ))
                  :null
                }
              </div>
            </div>
          ):null}
          <br/>
          <br/>
          <br/>
          {this.props.user.id?
          <form onSubmit={this.submitComment}>
            <p>Submit a comment</p>
            <textarea onChange={this.commentTextareaOnchange}></textarea>
            <p>Attach an image to comment</p>
            <input
              type="file"
              name="files"
              onChange={this.onImageChange}
              alt="image"
            />
            <button type="submit">Submit</button>
          </form>
          :null}
          <br/>
          <br/>
          <br/>
          {item.comments && item.comments.map((comment, i)=>{
            return <div key = {`c${i}`} style={{padding:"5px", border:"1px solid black", backgroundColor:"whitesmoke"}}>
              <p>{comment.user.username}: {comment.content}</p>
              {comment.image_url?<img style={{height:"100px", width:"100px"}} src={comment.image_url}></img>:null}
            </div>
          })}
          </div>:null}
      </React.Fragment>

    )
  }
}

export default Catalog

/*
 * PROP TYPES
 */
Catalog.propTypes = {}
