import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateInitiative extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
      	<h3>The purpose of creating an initiative is to start consideration for work on an open source item.
      	This item should fall into a category.
      	Select 'other' if list of categories is not relevant</h3>

      	<form>
      	  <label for="pname">Initiative Name:</label><br/>
      		<input type="text" id="" name="Categorical Item Name (Car, Computer)"/>
      	  <label for="pname">Initiative Category:</label><br/>
      		<input type="text" id="" name="Category"/>
      	  <label for="pname">Initiative Description:</label><br/>
      		<input type="text" id="" name="Description"/>
      	</form>
      </div>
    )
  }
}

export default CreateInitiative

/**
 * PROP TYPES
 */
CreateInitiative.propTypes = {}
