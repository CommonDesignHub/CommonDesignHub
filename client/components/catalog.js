import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Catalog extends Component {
  constructor() {
    super()

    this.state = {}
  }

  onClick = (e)=>{
    var elem = document.getElementById(`subcategory${e}`)
    elem.classList.toggle("hidden")
  }

  render() {
    return (
      <div>
        {this.props.c_loader?<h3>Loading Catalogs</h3>:null}
        {this.props.categories.length?
          <ul>
            {this.props.categories.map((category, i)=>{
              return <li key={`a${i}`} className={`category${category.id}`} style={{margin:"10px"}}><div style={{display:"inline", cursor:"pointer"}} onClick={this.onClick.bind(this, category.id)}>{`Dept - ${category.title}`}</div>
                <ul id={`subcategory${category.id}`}>{category.items.map((item, j)=>{return <li key={`b${j}`} style={{margin:"10px"}}><Link to={`/items/${item.id}`}>{item.title}</Link></li>})}</ul>
              </li>
            })}
          </ul>
          :null}
        <p>- Want to see more here? Consider adding to the catalog by <Link to="/create-project">submiting a project</Link> or <Link to="/create-initiative">creating an initiative.</Link></p>
      </div>
    )
  }
}

export default Catalog

/**
 * PROP TYPES
 */
Catalog.propTypes = {}
