import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Catalog extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount(){
    this.props.get_catalog()
  }

  onClick = (e)=>{
    var elem = document.getElementById(`subcategory${e}`)
    elem.classList.toggle("hidden")
  }

  render() {

    return (
      <div>
        {this.props.user.id?
          <p>- Want to see more here? Consider adding to the catalog by <Link to="/create-project">submiting a project</Link> or <Link to="/create-initiative">creating an initiative.</Link></p>
        :
          <p>- Want to see more here?  Consider <Link to="/login">logging in</Link> or <Link to="/signup">creating an account</Link> so that you can submit projects and start initiatives.</p>
        }
        {this.props.categories.length?
          <ul>
            {this.props.categories.map((category, i)=>{
              return <li key={`a${i}`} className={`category${category.id}`} style={{margin:"10px"}}><div style={{display:"inline", cursor:"pointer"}} onClick={this.onClick.bind(this, category.id)}>{`Dept - ${category.title}`}</div>
                <ul id={`subcategory${category.id}`}>{category.items.map((item, j)=>{return <li key={`b${j}`} style={{margin:"10px"}}><Link to={`/items/${item.id}`}>{item.title}</Link></li>})}</ul>
              </li>
            })}
          </ul>
          :null}
          <br/><br/><br/>
      </div>
    )
  }
}

export default Catalog

/**
 * PROP TYPES
 */
Catalog.propTypes = {}
