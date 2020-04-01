import ReactDOM from "react-dom";
import React from "react";
import Consent from './consent'
import Task from './task';
import { BrowserRouter as Router, Route } from "react-router-dom";

const routing = (
  <React.Fragment>
    <Router>
      <div>
        <Route exact path = "/s2/" component={Task} />
        <Route exact path = "/s2/consent" component={Consent}/>
      </div>
    </Router>
  </React.Fragment>
)
ReactDOM.render(
  routing, document.getElementById("root")
);