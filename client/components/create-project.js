import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CreateProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      categories: [],
      selectedCategoryId: null,
      selectedItem: null
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
  	this.setState({selectedCategoryId: elem.options[elem.selectedIndex].value})
  	var elem2 = document.getElementById("items")
    elem2.selectedIndex = 0;
  }

  render() {
  	var items = this.state.selectedCategoryId?this.props.categories.find((category)=>{return category.id==this.state.selectedCategoryId}).items:[]
    return (
      <div>
      	<h3>Create a project here</h3>

      	<form>
      	  <label htmlFor="pname">Project name:</label>
      		<input type="text" id="" name="Name"/>
      	  <br/><br/>
      	  <label htmlFor="repo-url">Repository URL</label>
      		<input type="text" id="" name="url"/>      		
      	  <br/><br/>
      	  <label htmlFor="files">Add a file</label>
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
      	  <br/><br/>
          <label htmlFor="description">Description</label>
      		<input type="text" id="" name="description"/>      		
      	  <br/><br/>
      	  <label htmlFor="categories">Category</label>
					<select defaultValue={'DEFAULT'} onChange={this.onCategoryChange} name="categories" id="categories">
						<option value="DEFAULT" disabled hidden>Choose here</option>
					  {this.props.categories.map((category, i)=>{
					  	return <option key={i} value={category.id}>{category.title}</option>
					  })}
					</select>
					<br/><br/>
      	  <label htmlFor="items">Item</label>
					<select defaultValue={'DEFAULT'} name="items" id="items">
						<option value="DEFAULT" disabled hidden>Choose here</option>
					  {items.map((category, i)=>{
					  	return <option key={i} value={category.id}>{category.title}</option>
					  })}
					</select>
					<p>*If desired category and item are not available, you will have to create an initiative to add them to the catalog tree</p>
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
