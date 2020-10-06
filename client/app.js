import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount(){
  	this.getCatalog()
  }

  getCatalog = ()=>{
  	console.log("get catalog not yet implemented")
  }
  render(){
  	
	  return (
	    <div>
	      <Navbar />
	      <Routes />
	    </div>
	  )
  }
}

export default App
