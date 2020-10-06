import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {categories: [], categories_loader: false, categories_error:null, isLoggedIn:null, user_is_loading: false}
  }

  componentDidMount(){
  	this.getUserLoggedIn()
  	this.getCatalog()
  }

  getCatalog = ()=>{
  	this.setState({categories_loader: true}, ()=>{
	  	axios.get('/api/category/')
	  	.then((ret)=>{ this.setState({categories: ret.data, categories_loader:false}) })
	  	.catch((e)=>{ this.setState({categories_loader: false, categories_error: e}) })
  	})
  }

  getUserLoggedIn = () => {
  	this.setState({user_is_loading: true}, ()=>{  		
	    axios.get('/auth/me')
	    .then((res)=>{this.setState({user_is_loading: false, isLoggedIn: !!res.data.id})})
	    .catch(()=>{})	
  	})
  }

  render(){
	  return (
	    <div>
	      <Navbar 
		      is_logged_in={this.state.isLoggedIn}
		      user_is_loading={this.state.user_is_loading}
	      />
	      <Routes
	      	categories={this.state.categories}
		      categories_loader={this.state.categories_loader}
		      categories_error={this.state.categories_error}
		      is_logged_in={this.state.isLoggedIn}
		      user_is_loading={this.state.user_is_loading}
				/>
	    </div>
	  )
  }
}

export default App
