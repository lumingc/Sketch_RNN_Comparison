import ReactDOM from "react-dom";
import React from "react";
import Comparison from './comparison';
import Consent from './consent'
import Rules from './rules';
import { BrowserRouter as Router, Route } from "react-router-dom";

const routing = (
  <React.Fragment>
    <Router>
      <div>
        <Route exact path = "/" component={Rules} />
        <Route exact path = "/comparison" component={Comparison} />
        <Route exact path = "/consent" component={Consent}/>
      </div>
    </Router>
  </React.Fragment>
)
ReactDOM.render(
  routing, document.getElementById("root")
);