import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="App">
      <div className="app-content">
        <Router>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Sidebar />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
