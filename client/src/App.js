import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Support from './components/Support/Support'
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="App">
      <main className="app-content">
        <ProvinceProvider>
          <ModelProvider>
            <TypeProvider>
              <Router>
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/support" component={Support} />
                  <Sidebar/>
                </Switch>
              </Router>
            </TypeProvider>
          </ModelProvider>
        </ProvinceProvider>
      </main>
    </div>
  );
}


