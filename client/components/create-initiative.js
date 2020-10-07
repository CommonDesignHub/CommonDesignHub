import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateInitiative extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
    	<React.Fragment>
	      <div>
	      	<h3>The purpose of creating an initiative is to start consideration for work on an open source item.
	      	This item should fall into a category.
	      	Select 'other' if list of categories is not relevant</h3>
	      	<form>
	      	  <label htmlFor="pname">Initiative Name:</label>
	      		<input type="text" id="" name="Categorical Item Name (Car, Computer)"/>
	      	  <br/> <br/>

					  <label htmlFor="categories">Choose a category:</label>
						<select name="categories" id="categories">
  						<option value="" selected disabled hidden>Choose here</option>
						  {this.props.categories.map((category, i)=>{
						  	return <option key={i} value={category.id}>{category.title}</option>
						  })}
						  <option value="0">Other</option>
						</select> 
	      	  <br/> <br/>

	      	  <label htmlFor="pname">Initiative Description:</label>
	      		<input type="text" id="" name="Description"/>
	      	  <br/> <br/>
	      	</form>
	      </div>
    	</React.Fragment>
    )
  }
}

export default CreateInitiative

/**
 * PROP TYPES
 */
CreateInitiative.propTypes = {}
