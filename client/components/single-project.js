import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

class SingleProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      project:{},
      comment:"",
      images:[]
    }
  }

  componentDidMount(){
    this.getProject()
  }

  getProject = ()=>{
    var id = this.props.match.params.id
    axios.get(`/api/project/${id}`)
    .then((ret)=>{
      this.setState({project: ret.data})
    })
    .catch(()=>{})
  }

  onImageChange = event => {
    this.setState({
      images: event.target.files
    })
  }

  commentTextareaOnchange = (e) => {
    this.setState({comment: e.target.value})
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

    axios.post(`/api/project/${this.state.project.id}/comment`, payload)
      .then(res => {
        let id = res.data.id
        this.getProject()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    var project = this.state.project
    return (
      <React.Fragment>
        {project.title?
          <div>
            <div style={{backgroundColor:project.color}}>
              {project.item?<h3>{project.item.title} Open Source Project</h3>:null}
              <p>Title - {project.title}</p>
              <img src={project.image_url}></img>
              <p>Version Control URL - <a href={project.version_control_url}>{project.version_control_url}</a></p>
              <p>Description - {project.description}</p>
               {project.user?<p>Submitted by: {project.user.username}</p>:null}
              <br/><br/>
            </div>
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
            {project.comments && project.comments.map((comment, i)=>{
              return <div key = {`c${i}`} style={{padding:"5px", border:"1px solid black", backgroundColor:"whitesmoke"}}>
                <p>{comment.user.username}:</p>
                <p>{comment.content}</p>
                {comment.image_url?<img style={{height:"100px", width:"100px"}} src={comment.image_url}></img>:null}
              </div>
            })}
          </div>
        :null}
      </React.Fragment>
    )
  }
}

export default SingleProject

/**
 * PROP TYPES
 */
SingleProject.propTypes = {}
