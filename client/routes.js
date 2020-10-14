import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import FileUpload from './components/file-upload'
import CreateProject from './components/create-project'
import CreateInitiative from './components/create-initiative'
import Catalog from './components/catalog'
import Projects from './components/projects'
import SingleProject from './components/single-project'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={UserHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/catalog" render={ (props) => (<Catalog user={this.props.user} categories={this.props.categories} get_catalog={this.props.get_catalog} c_loader={this.props.categories_loader} c_error={this.props.categories_error}/>) }/>
        <Route path="/items/:id" render={ (props) => (<Projects {...props} user={this.props.user}/>) }/>
        <Route path="/projects/:id" render={ (props) => (<SingleProject {...props} user={this.props.user}/>) }/>

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/create-initiative" render={ (props) => (<CreateInitiative user={this.props.user} categories={this.props.categories} c_loader={this.props.categories_loader} c_error={this.props.categories_error}/>) }/>
            <Route path="/create-project" render={ (props) => (<CreateProject user={this.props.user} categories={this.props.categories} c_loader={this.props.categories_loader} c_error={this.props.categories_error}/>) }/>
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays as a fallback */}
        <Route component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
