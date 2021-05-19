import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Register from "./components/Register/Register";

export default function App() {
  return (
    <div className="App">
      <div className="app-content">
        <Router>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Sidebar />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
