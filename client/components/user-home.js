import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: this.props.email,
      projects: []
    }
  }

  componentDidMount(){
    this.getRecentProjects()
  }

  getRecentProjects = ()=>{
    axios.get(`/api/project/latest`)
    .then((ret)=>{
      this.setState({projects: ret.data})
    })
    .catch(()=>{})
  }

  render(){
    return (
      <div>
        <h2>Welcome, {this.state.email}</h2>

        <p>The objective of Common Design Hub is to pool together open source physical design projects
        in the form of a catalog and provide a place for makers to collaborate.</p>
        
        <h2>Latest Projects</h2>
        <div style={{width:"100%", display:"flex", flexWrap:"wrap", cursor:"pointer"}}>
          {this.state.projects.map((project, i)=>{
            return <div
            key={`p${i}`}
            style={{width:"30%", border:"1px solid black", overflow:"hidden", backgroundColor: project.color }}
            onClick={()=>{this.props.history.push(`/projects/${project.id}`)}}>
              <p>{project.item.title}</p>
              <p>{project.title}</p>
              <p>By: {project.user.username}</p>
            </div> 
          })}
        </div>
        <br/>
        <br/>
        <br/>

      </div>
    )
  }
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
