import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import LayOut from "./components/layout"
import ListTask from "./pages/ListTask"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <Router>
      <LayOut>
        <Switch>
          <Route exact path='/' component={ListTask} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </LayOut>
    </Router>
  );
}

export default App;
