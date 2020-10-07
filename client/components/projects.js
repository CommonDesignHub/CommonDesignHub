import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

class Catalog extends Component {
  constructor() {
    super()

    this.state = {item:{}, projects:[]}
  }

  componentDidMount(){
  	this.getItem()
  }

  getItem = (e)=>{
  	var id = this.props.match.params.id
  	axios.get(`/api/item/${id}`)
  	.then((ret)=>{
  		this.setState({item: ret.data, projects:ret.data.projects}, ()=>{console.log(this.state)})
  	})
  	.catch(()=>{})
  }

  voteProject = (project_id, dir, str)=>{
  	//create a vote for the project
  }

  render() {
    let list = this.state.projects
    list.map((project) => {
      project.voteCount = 0
      project.priority = 0
      project.votes.forEach(vote => {
        if (vote.dir && vote.created_at) {
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
		              <div className="project-bar" style={{backgroundColor: project.color}} key={project.id} id={project.id}>
		                <div style={{float:"right"}}>Right alligned thumbnail</div>
		                <div className="vote-btn-container">
		                  <button id={`up${project.id}`} className="upvote" onClick={this.voteProject.bind(this, project.id, 1, 'test subject')}>Up Vote</button>
		                  <button id={`dn${project.id}`} className="downvote" onClick={this.voteProject.bind(this, project.id, -1, 'test subject')}>Dn Vote</button>
		                </div>
		                <Link to={`/project/${project.id}`} style={{textAlign:"center", marginRight:"150px"}}>{project.title}</Link>
		                <p>Likes: {project.voteCount}</p>
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
