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

        <p>The objective of this site is to pool together all of the currently available open source physical design projects and hopefully,
        with the creation of initiatives, foster new open source phsyical design.  Our sole directive is to act as a catalog for makers
        and assist in connecting design to product realization.</p>
        
        <h2>Latest Projects</h2>
        <div style={{width:"100%", display:"flex", flexWrap:"wrap", cursor:"pointer"}}>
          {this.state.projects.map((project, i)=>{
            return <div
            key={`p${i}`}
            style={{width:"30%", border:"1px solid black", overflow:"hidden"}}
            onClick={()=>{this.props.history.push(`/projects/${project.id}`)}}>
              <p>{project.item.title}</p>
              <p>{project.title}</p>
              <p>By: {project.user.email}</p>
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
