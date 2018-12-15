import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieDetail from './components/MovieDetail';
import './styles/index.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route component={App} path={'/'} exact/>
      <Route component={MovieDetail} path={'/movie/:id'} />
    </Switch>
  </Router>
  , document.getElementById('root'));