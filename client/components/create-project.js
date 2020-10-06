import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateProject extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
      	<h3>Create a project here</h3>

      	<form>
      	  <label htmlFor="pname">Project name:</label><br/>
      		<input type="text" id="" name="Name"/>
      	  <label htmlFor="repo-url">Repository URL</label><br/>
      		<input type="text" id="" name="url"/>      		
      	</form>
      	<div>upload a few images</div>
      	<div>description</div>
      	<div>where does it fall on tree?</div>
      	<div>create a project</div>
      	<div>create a project</div>

      </div>
    )
  }
}

export default CreateProject

/**
 * PROP TYPES
 */
CreateProject.propTypes = {}
