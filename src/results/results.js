import React from 'react'
import './results.css'
import '../common.css'
import {S3} from '../index'

export default class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: null
        }
    }

    componentDidMount() {
        this.getResults()
    }

    getResults = () => {
        fetch(`http://localhost:8080/photo/${this.props.location.pathname.split('/')[1]}/matching`).then(response => {
            response
                .json()
                .then(data => {
                    this.setState({images: data})
                })
        })
    }

    helpBlock = <div>
        <div className="email-input">
            <div className="small-text">Leave your email to be notifyied when we found more photos</div>
            <input type="email" id="email-input" placeholder="your@email.com"/>
        </div>
        <div className="small-text">
            <div>Ask your friends to help out by uploading photos</div>
            <div className="sharethis-inline-share-buttons"/>
        </div>
    </div>

    render() {

        if (!this.state.images) {
            return <div className="center-container column">One second fetching your results...</div>
        }
        if (this.state.images.length > 1) {
            return (
                <div className="center-container column">
                    <div>Good News! We found a few results that might match your search</div>
                    <div className="center-container">
                        {this
                            .state
                            .images
                            .map((image, index) => index > 0
                                ? <img
                                        className="small-image"
                                        key={index}
                                        src={`${S3}/${image.public_photo_url}`}/>
                                : null)}

                    </div>
                    {this.helpBlock}
                </div>
            )
        } else {
            return <div className="center-container column">Sorry :( No Results {this.helpBlock}
            </div>
        }
    }
}