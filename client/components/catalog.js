import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Catalog extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
      	{this.props.c_loader?<h3>Loading Catalogs</h3>:null}
      	{this.props.categories.length?
      		<ul>
	      		{this.props.categories.map((category)=>{
	      			return <li>{category.title}</li>
	      		})}
      		</ul>
      		:null}
      </div>
    )
  }
}

export default Catalog

/**
 * PROP TYPES
 */
Catalog.propTypes = {}
