import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

class SingleProject extends Component {
  constructor(props) {
    super(props)

    this.state = {project:{}, comment:"", images:[]}
  }

  componentDidMount(){
    this.getProject()
  }

  getProject = ()=>{
    var id = this.props.match.params.id
    axios.get(`/api/project/${id}`)
    .then((ret)=>{
      this.setState({project: ret.data})
    })
    .catch(()=>{})
  }

  onImageChange = event => {
    this.setState({
      images: event.target.files
    })
  }

  commentTextareaOnchange = (e) => {
    this.setState({comment: e.target.value})
  }

  onSubmit = async (e)=>{
    e.preventDefault()

    var image_url
    if(this.state.images.length){
      const formData = new FormData()

      Array.from(this.state.images).forEach(image => {
        formData.append('files', image)
      })
      var res = await axios.post(`http://localhost:1337/api/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      var image_url = res.data.path
    }

    var comment_text = this.state.comment
    var comment = {image_url, project_id:this.state.project.id}
    axios.post(`http://localhost:1337/api/comment`, comment)
    .then(()=>{})
    .catch(()=>{})
  }

  render() {
    var project = this.state.project
    return (
      <div style={{backgroundColor:project.color}}>
        {project.item?<h3>{project.item.title} Open Source Project</h3>:null}
        <p>Title - {project.title}</p>
        <p>Description - {project.description}</p>
        <img src={project.image_url}></img>
        <p></p>
        <p>Version Control URL - <a href={project.version_control_url}>{project.version_control_url}</a></p>
         {project.user?<p>Submitted by: {project.user.email}</p>:null}
        <br/><br/>
        <form onSubmit={this.onSubmit}>
          <p>Submit a comment</p>
          <textarea onChange={this.commentTextareaOnchange}></textarea>
          <p>Attach an image for thumbnail</p>
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SingleProject

/**
 * PROP TYPES
 */
SingleProject.propTypes = {}
