import React from "react";
import './searching.css'
import {history, S3} from "../index";


const titles = ['Extracting face', 'Preparing Search', 'Searching over 10k photos']
const INTERVAL = 1000



class searching extends React.Component {
  state = {
    titleIndex: 0
  }

  componentDidMount() {
    setTimeout(this.changeTitle.bind(this), INTERVAL)
    this.navigateAfterXTime(5000)
  }

  changeTitle() {
    if (titles.length - 1 > this.state.titleIndex) {
      this.setState({
        titleIndex: this.state.titleIndex + 1
      })
      setTimeout(this.changeTitle.bind(this), INTERVAL)
    }
  }

  navigateAfterXTime = (interval) => {
    setTimeout(() => history.push(`${this.props.location.pathname}/results`),interval)
  }

  render() {
    return (
      <div className='center-container'>
        <div className='item top'>
          <div>Identifying....</div>
          <div className="dark-brown">{titles[this.state.titleIndex]}</div>
          <img className="image" src={`${S3}/index${this.props.location.pathname}`}/>
          <div className="email-input">
            <div className="small-text">Leave your email to be notifyied when we found something relevant</div>
            <input type="email" id="email-input" placeholder="your@email.com"/>
          </div>
          <div className="small-text">
            <div>Ask your friends to help out by uploading photos</div>
            <div className="sharethis-inline-share-buttons"/>
          </div>
        </div>
      </div>
    )
  }

};

export default searching;
