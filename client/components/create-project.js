import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class CreateProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      selectedDepartmentId: null,
      selectedItemId: null,
      newCatDisabled:true,
      newItemDisabled:true,
      projectName:"",
      repoUrl:"",
      projectDescription:"",
      alternateDepartmentName:"",
      alternateItemName:"",
      images:[]
    }
  }

  onSubmit = async e => {
    e.preventDefault()

    var {selectedDepartmentId, selectedItemId, projectName, projectDescription, alternateDepartmentName, alternateItemName, repoUrl} = this.state

    var payload = {
      title:projectName,
      version_control_url:repoUrl,
      description:projectDescription,
      categoryId:selectedDepartmentId,
      itemId:selectedItemId,
      alternateDepartmentName:alternateDepartmentName,
      alternateItemName:alternateItemName,
    }

    if(this.state.images.length){
      const formData = new FormData()

      Array.from(this.state.images).forEach(image => {
        formData.append('files', image)
      })
      var res = await axios.post(`http://localhost:1337/api/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      var image_url = res.data.path
      payload.image_url="/"+image_url
    }

    axios
      .post(`http://localhost:1337/api/project`, payload)
      .then(res => {
        let id = res.data.id
        this.props.history.push(`/projects/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onCategoryChange = (e)=>{
    var elem = document.getElementById("categories")
    var value = elem.options[elem.selectedIndex].value

    if(value == "OTHER") {
      this.setState({selectedDepartmentId: value, newCatDisabled:false, selectedItemId:null, newItemDisabled:true})
    }else{
      this.setState({selectedDepartmentId: value, newCatDisabled:true, selectedItemId:null, newItemDisabled:true})
    }
    
    var elem2 = document.getElementById("items")
    elem2.selectedIndex = 0;
  }

  onItemChange = (e)=>{
    var elem = document.getElementById("items")
    var value = elem.options[elem.selectedIndex].value

    var bool
    if(value == "OTHER") {
      bool = false
    }else{
      bool = true
    }
    this.setState({selectedItemId:value, newItemDisabled:bool})
  }

  onChange = (e, thing)=>{
    // things used:
    // projectName:"",
    // repoUrl:"",
    // projectDescription:"",
    // alternateDepartmentName:"",
    // alternateItemName:"",
    var obj = {}
    obj[thing]= e.target.value
    this.setState(obj)
  }

  onImageChange = event => {
    this.setState({
      images: event.target.files
    })
  }

  render() {
    var items = this.state.selectedDepartmentId && !isNaN(this.state.selectedDepartmentId)?this.props.categories.find((category)=>{return category.id==this.state.selectedDepartmentId}).items:[]
    if(!this.props.user.id){
      return(
        <div><p>Please login to submit projects.</p></div>
      )
    }

    return (
      <div>
        <h3>Create a Project</h3>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="pname">Project name:</label>
          <input onChange={(e)=>{this.onChange(e, "projectName")}} type="text" id="" name="Name"/>
          <br/><br/>
          <label htmlFor="repo-url">Repository URL</label>
          <label htmlFor="repo-url">(Preferably Public Github Repo)</label>

          <input onChange={(e)=>{this.onChange(e, "repoUrl")}} type="text" id="" name="url"/>         
          <br/><br/>

          <label htmlFor="description">Project Description</label>
          <textarea onChange={(e)=>{this.onChange(e, "projectDescription")}} id="projectdescription" name="description" placeholder="Enter text here..." rows="4" cols="50" name="description"></textarea>

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
            <input onChange={(e)=>{this.onChange(e, "alternateDepartmentName")}} type="text"  disabled={this.state.newCatDisabled} id="newcategory" name="newcategory"/>
            <br/><br/>
          </div>
          

          <label htmlFor="items">Item</label>
          <select defaultValue={'DEFAULT'} disabled={!this.state.selectedDepartmentId} onChange={this.onItemChange} name="items" id="items">
            <option value="DEFAULT" disabled hidden>Choose here</option>
            {items.map((category, i)=>{
              return <option key={i} value={category.id}>{category.title}</option>
            })}
            <option value="OTHER">Other</option>

          </select>
          <br/><br/>

          <div style={{display: this.state.newItemDisabled?"none":"block"}}>
            <label htmlFor="newitem">Item</label>
            <input onChange={(e)=>{this.onChange(e, "alternateItemName")}} type="text" disabled={this.state.newItemDisabled} id="newitem" name="newitem"/>
          </div>
          <br/>
          <p>Attach an image for thumbnail</p>
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
          <br/>
          <button type="submit">Submit</button>
          <br/><br/>
          <br/><br/>

        </form>

      </div>
    )
  }
}

export default withRouter(CreateProject);

/**
 * PROP TYPES
 */
CreateProject.propTypes = {}
