import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './upload/upload'
import Searching from './searching/searching'
import Results from './results/results'
import {Route, Switch} from 'react-router'
import 'typeface-fira-sans'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">HEADER</div>
        <Switch>
          <Route path='/:id/results' component={Results}/>
          <Route path='/:id' component={Searching}/>
          <Route path='/' component={Upload}/>
        </Switch>
      </div>
    );
  }
}

export default App;
