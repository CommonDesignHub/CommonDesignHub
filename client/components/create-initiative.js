import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

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
          Items belong to a department so they can be sorted in the <Link to="/catalog">catalog.  </Link>
          Select 'other' if no department options are relevant; you will need to create a new department if so.</h3>
          <form>
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
            </div>
            <label htmlFor="itemname">Initiative Name:</label>
            <input type="text" id="" name="Categorical Item Name (Car, Computer)"/>
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
