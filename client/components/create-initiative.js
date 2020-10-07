import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateInitiative extends Component {
  constructor() {
    super()

    this.state = {
    	selectedCategoryId: null,
    	newCatDisabled:true,
    }
  }

  onCategoryChange = (e)=>{
  	var elem = document.getElementById("categories")
  	this.setState({selectedCategoryId: elem.options[elem.selectedIndex].value})
  	var elem2 = document.getElementById("items")
    elem2.selectedIndex = 0;
  }

  onCategoryChange = (e)=>{
  	var elem = document.getElementById("categories")
  	var value = elem.options[elem.selectedIndex].value

  	if(value == "OTHER") {
  		this.setState({selectedCategoryId: value, newCatDisabled:false})
  	}else{
  		this.setState({selectedCategoryId: value, newCatDisabled:true})
  	}
  }

  render() {
  	var items = this.state.selectedCategoryId && !isNaN(this.state.selectedCategoryId)?this.props.categories.find((category)=>{return category.id==this.state.selectedCategoryId}).items:[]

    return (
    	<React.Fragment>
	      <div>
	      	<h3>The purpose of creating an initiative is to start consideration for work on an open source item.
	      	This item should fall into a category.
	      	Select 'other' if list of categories is not relevant</h3>
	      	<form>
	      	  <label htmlFor="categories">Category</label>
						<select defaultValue={'DEFAULT'} onChange={this.onCategoryChange} name="categories" id="categories">
							<option value="DEFAULT" disabled hidden>Choose here</option>
						  {this.props.categories.map((category, i)=>{
						  	return <option key={i} value={category.id}>{category.title}</option>
						  })}
						  <option value="OTHER">Other</option>
						</select> 
						<div style={{display: this.state.newCatDisabled?"none":"block"}}>
		          <label htmlFor="newcategory">New Category</label>
		      		<input type="text"  disabled={this.state.newCatDisabled} id="newcategory" name="newcategory"/>
						</div>
	      	  <label htmlFor="itemname">Initiative Name:</label>
	      		<input type="text" id="" name="Categorical Item Name (Car, Computer)"/>
	      	  <br/> <br/>
	      	  <label htmlFor="description">Initiative Description:</label>
	      	  <textarea rows="4" cols="50" name="description">Enter text here...</textarea>
	      	  <br/>
	      	  <br/>
	      	  <button type="submit">Submit</button>

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
