import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {me} from './store'

class App extends Component {
  constructor() {
    super()

    this.state = {
      categories: [],
      categories_loader: false,
      categories_error:null,
      isLoggedIn:null,
    }
  }

  componentDidMount(){
    this.props.loadUserData()

    this.getCatalog()
  }

  getCatalog = ()=>{
    this.setState({categories_loader: true}, ()=>{
      axios.get('/api/category/')
      .then((ret)=>{ this.setState({categories: ret.data, categories_loader:false}) })
      .catch((e)=>{ this.setState({categories_loader: false, categories_error: e}) })
    })
  }

  render(){
    return (
      <div>
        <Navbar

         />
        <Routes
          get_catalog={this.getCatalog}
          categories={this.state.categories}
          categories_loader={this.state.categories_loader}
          categories_error={this.state.categories_error}
          isLoggedIn={this.props.isLoggedIn}
          user = {this.props.user}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user:state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(App))
