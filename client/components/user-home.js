import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h2>Welcome, {email}</h2>

      <p>The objective of this site is to pool together all of the currently available open source physical design projects and hopefully,
      with the creation of initiatives, fost new open source phsyical design.  Our sole directive is to act as a catalog for makers
      and assist in connecting design to product realization.</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
