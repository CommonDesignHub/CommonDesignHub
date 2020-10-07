import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateInitiative extends Component {
  constructor() {
    super()

    this.state = {selectedCategoryId: null}
  }

  onCategoryChange = (e)=>{
  	var elem = document.getElementById("categories")
  	this.setState({selectedCategoryId: elem.options[elem.selectedIndex].value})
  	var elem2 = document.getElementById("items")
    elem2.selectedIndex = 0;
  }

  render() {
  	var items = this.state.selectedCategoryId?this.props.categories.find((category)=>{return category.id==this.state.selectedCategoryId}).items:[]
console.log(this.state.selectedCategoryId)
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

	      	  <label htmlFor="categories">Category</label>
						<select defaultValue={'DEFAULT'} onChange={this.onCategoryChange} name="categories" id="categories">
							<option value="DEFAULT" disabled hidden>Choose here</option>
						  {this.props.categories.map((category, i)=>{
						  	return <option key={i} value={category.id}>{category.title}</option>
						  })}
						</select> 
	      	  <br/> <br/>
	      	  <label htmlFor="items">Item</label>
						<select defaultValue={'DEFAULT'} name="items" id="items">
							<option value="DEFAULT" disabled hidden>Choose here</option>
						  {items.map((category, i)=>{
						  	return <option key={i} value={category.id}>{category.title}</option>
						  })}
						</select>
						<br/><br/>
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
