import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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
  	axios.get(`/api/item/1`)
  	.then((ret)=>{
  		this.setState({item: ret.data, projects:ret.data.projects}, ()=>{console.log(this.state)})
  	})
  	.catch(()=>{})
  }

  render() {

    return (
      <React.Fragment>
        {this.state.item.id?(
        	<div>
		        <p>{this.state.item.title}</p>
		      	<p>{this.state.item.description}</p>
		      	<br/>
		      	<p>Projects List</p>
		      	<h1>THIS SHOULD BE A LIST OF REDDIT LIKE POSTS WITH THUMBNAIL</h1>
			      <ul>
			      	{this.state.projects.map((project)=>{
			      		return <li><Link to={`/project/${project.id}`}>{project.title}</Link></li>
			      	})}
			      </ul>
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
