import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Join from './components/Join/index';
import Chat from './components/Chat/index';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join}></Route>
      <Route path="/chat" component={Chat}></Route>
    </Router>
  );
}

export default App;
