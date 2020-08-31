import React from 'react';
import './App.css';
import Header from './components/Header'
import User from './components/User'
import Home from './components/Home'
import Footer from './components/Footer'

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path='/' component={Home} />
        <Footer />
      </div >
    </Router>
  );
}

export default App;
