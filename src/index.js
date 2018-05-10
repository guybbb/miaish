import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()
export const S3 = 'http://mihaishbucket.s3-website-eu-west-1.amazonaws.com'

ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
registerServiceWorker();
