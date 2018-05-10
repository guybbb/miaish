import React from "react";
import Camera from "react-camera";
import {history} from "../index";
import axios from "axios"
import ImageLoader from "react-image-file"

import "./upload.css";
import "../common.css"

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  takePicture = () => {
    this
      .camera
      .capture()
      .then(blob => {
        this.img.src = URL.createObjectURL(blob);
        this.img.onload = () => {
          URL.revokeObjectURL(this.src);
        };

        this.setState({image: blob})
      });

    // this.camera.capture().then(blob => this.setState({image:blob}));
  };

  onChange = e => {
    if (e.target.files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
        // the result image data
        this.img.src = e.target.result;
      }

      reader.readAsDataURL(e.target.files[0]);
    }
    this.setState({image: e.target.files[0]});
  };

  openCamera = () => {
    this.setState({
      openCamera: !this.state.openCamera
    });
  };

  upoadToServer = () => {
    const formData = new FormData();

    if (!this.state.image.name) {
      formData.append('image', this.state.image, 'capture.jpeg');
    } else {
      formData.append('image', this.state.image);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({uploading: `${percentCompleted}%`})
      }
    };

    axios
      .post('http://localhost:8080/photo', formData, config)
      .then(response => history.push(response.data.photoId));
  };

  render() {
    return (
      <div className="center-container column">
        <div className="input-container">
          <input
            type="file"
            id="file"
            className="file"
            accept=".jpg,.jpeg,.png"
            onChange={this.onChange}/> {/* <label htmlFor="file">
            {this.state.image && this.state.image.name
              ? this.state.image.name
              : "Upload a file"}
          </label> */}
          <label htmlFor="file">
            Upload a file
          </label>
        </div>
        <div>
          <img
            style={style.captureImage}
            ref={(img) => {
            this.img = img;
          }}/>

          <div onClick={this.openCamera}>
            {this.state.openCamera
              ? "Close Camera"
              : "Open Camera"}
          </div>
        </div>
        <div>
          {this.state.openCamera
            ? (
              <div className="camera-container">
                <Camera
                  style={style.preview}
                  video={{
                  facingMode: 'environment',
                  width: '400',
                  height: '400'
                }}
                  ref={cam => {
                  this.camera = cam;
                }}>
                  <div style={style.captureContainer} onClick={this.takePicture}>
                    <div style={style.captureButton}/>
                  </div>
                </Camera>
              </div>
            )
            : null}
          {this.state.image
            ? <div onClick={this.upoadToServer}>{this.state.uploading
                  ? this.state.uploading
                  : 'Upload'}</div>
            : null}
        </div>
      </div>
    );
  }
}

const style = {
  preview: {
    position: "relative"
  },
  captureContainer: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    zIndex: 1,
    bottom: 0,
    width: "100%"
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    height: 56,
    width: 56,
    color: "#000",
    margin: 20
  },
  captureImage: {
    width: "10%",
    height: "10%"
  }
};

export default UploadScreen;
