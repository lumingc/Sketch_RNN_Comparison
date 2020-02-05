import ReactDOM from "react-dom";
import React from "react";
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routing = (
  <React.Fragment>
    <Router>
      <div>
        <Route path = "/" component={App} />
      </div>
    </Router>
  </React.Fragment>
)
ReactDOM.render(
  routing, document.getElementById("root")
);