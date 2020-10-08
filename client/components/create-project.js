import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      categories: [],
      selectedCategoryId: null,
      selectedItem: null,
      newCatDisabled:true,
      newItemDisabled:true
    }
  }

  onImageChange = event => {
    console.log(event.target.files)

    this.setState({
      images: event.target.files
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const formData = new FormData()

    Array.from(this.state.images).forEach(image => {
      formData.append('files', image)
    })

    axios
      .post(`http://localhost:1337/api/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onCategoryChange = (e)=>{
  	var elem = document.getElementById("categories")
  	var value = elem.options[elem.selectedIndex].value

  	if(value == "OTHER") {
  		this.setState({selectedCategoryId: value, newCatDisabled:false, selectedItem:null, newItemDisabled:true})
  	}else{
  		this.setState({selectedCategoryId: value, newCatDisabled:true, selectedItem:null, newItemDisabled:true})
  	}
  	
  	var elem2 = document.getElementById("items")
    elem2.selectedIndex = 0;
  }

  onItemChange = ()=>{
  	var elem = document.getElementById("items")
  	var value = elem.options[elem.selectedIndex].value

  	if(value == "OTHER") {
  		this.setState({newItemDisabled:false})
  	}else{
  		this.setState({newItemDisabled:true})
  	}
  }

  render() {
  	var items = this.state.selectedCategoryId && !isNaN(this.state.selectedCategoryId)?this.props.categories.find((category)=>{return category.id==this.state.selectedCategoryId}).items:[]
    return (
      <div>
      	<h3>Create a Project</h3>

      	<form>
      	  <label htmlFor="pname">Project name:</label>
      		<input type="text" id="" name="Name"/>
      	  <br/><br/>
      	  <label htmlFor="repo-url">Repository URL</label>
      		<input type="text" id="" name="url"/>      		
      	  <br/><br/>

      	  <label htmlFor="files">Add an image</label>
          <input
            type="file"
            multiple
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
      	  <br/><br/>

          <label htmlFor="description">Project Description</label>
	        <textarea disabled={this.state.newItemDisabled} id="projectdescription" name="description" rows="4" cols="50" name="description">Enter text here...</textarea>

      	  <br/><br/>
      	  <label htmlFor="categories">Department</label>
					<select defaultValue={'DEFAULT'} onChange={this.onCategoryChange} name="categories" id="categories">
						<option value="DEFAULT" disabled hidden>Choose here</option>
					  {this.props.categories.map((category, i)=>{
					  	return <option key={i} value={category.id}>{category.title}</option>
					  })}
					  <option value="OTHER">Other</option>

					</select>
      	  <br/><br/>

					<div style={{display: this.state.newCatDisabled?"none":"block"}}>
	          <label htmlFor="newcategory">New Department</label>
	      		<input type="text"  disabled={this.state.newCatDisabled} id="newcategory" name="newcategory"/>
						<br/><br/>
					</div>
      	  

      	  <label htmlFor="items">Item</label>
					<select defaultValue={'DEFAULT'} onChange={this.onItemChange} name="items" id="items">
						<option value="DEFAULT" disabled hidden>Choose here</option>
					  {items.map((category, i)=>{
					  	return <option key={i} value={category.id}>{category.title}</option>
					  })}
					  <option value="OTHER">Other</option>

					</select>
      	  <br/><br/>

					<div style={{display: this.state.newItemDisabled?"none":"block"}}>
	          <label htmlFor="newitem">Item</label>
	      		<input type="text" disabled={this.state.newItemDisabled} id="newitem" name="newitem"/>
					</div>
					<div style={{display: this.state.newItemDisabled?"none":"block"}}>
	          <label htmlFor="description">Item Description</label>
	          <textarea disabled={this.state.newItemDisabled} id="itemdescription" name="description" rows="4" cols="50" name="description">Enter text here...</textarea>
					</div>
					<br/>
					<button type="submit">Submit</button>
					<br/>
      	  <br/><br/>
      	  <br/><br/>

      	</form>

      </div>
    )
  }
}


export default CreateProject

/**
 * PROP TYPES
 */
CreateProject.propTypes = {}
