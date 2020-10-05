import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class FileUpload extends Component {
  constructor() {
    super()

    this.state = {
      images: []
    }
  }

  onImageChange = event => {
    console.log(event.target.files)

    this.setState({
      images: event.target.files
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const formData = new FormData()

    Array.from(this.state.images).forEach(image => {
      formData.append('files', image)
    })

    axios
      .post(`http://localhost:1337/api/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>BOILERMAKER</h1>

        <form onSubmit={this.onSubmit}>
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default FileUpload

/**
 * PROP TYPES
 */
FileUpload.propTypes = {}
