import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

class Catalog extends Component {
  constructor(props) {
    super(props)

    this.state = {item:{}, projects:[]}
  }

  componentDidMount(){
    this.getItem()
  }

  getItem = (e)=>{
    var id = this.props.match.params.id
    axios.get(`/api/item/${id}`)
    .then((ret)=>{
      this.setState({item: ret.data, projects:ret.data.projects})
    })
    .catch(()=>{})
  }

  voteProject = (pid, dir)=>{
    var user_id = this.props.user.id
    console.log("a")
    if(!user_id){
      return
    }
        console.log("b")

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

    return (
      <React.Fragment>
        {this.state.item.id?(
          <div>
            <p>{this.state.item.title}</p>
            <p>{this.state.item.description}</p>
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
                      <Link to={`/project/${project.id}`} style={{textAlign:"center", marginRight:"150px"}}>{project.title}</Link>
                    </div>
                    <div style={{float:"right", height:"100%", backgroundColor:"green"}}>Right aligned thumbnail</div>
                  </div>
                ))
                :null
              }
            </div>
          </div>
        ):null}
      </React.Fragment>

    )
  }
}

export default Catalog

/**
 * PROP TYPES
 */
Catalog.propTypes = {}
