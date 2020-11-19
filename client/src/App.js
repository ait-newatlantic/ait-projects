import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import NCTT from './components/kinhdoanh/nhaplieu/nhucauthucte'
import BCTQKD from './components/kinhdoanh/baocaokinhdoanh/baocaotongquat'
import BCCTKD from './components/kinhdoanh/baocaokinhdoanh/baocaochitiet'
import BDTQKD from './components/kinhdoanh/bieudokd/bieudotongquat'
import BDCTKD from './components/kinhdoanh/bieudokd/bieudochitiet'
import DKKPI from './components/kinhdoanh/nhaplieu/dangkykpi'
import CN_NCTT from './components/kinhdoanh/capnhat/capnhatnctt.jsx'

import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import Profile from "./components/user/profile/Profile";
import Home1 from "./components/user_roles/Home";
import BoardUser from "./components/user_roles/BoardUser";
import BoardModerator from "./components/user_roles/BoardModerator";
import BoardAdmin from "./components/user_roles/BoardAdmin";
import Nav from "./components/nav/Nav"

import { BranchProvider } from './context/branch/BranchContext'
import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'

function App() {
  return (
    <div className="App">
      <header>
        <Nav/>
      </header>
      <BranchProvider>
        <ProvinceProvider>
          <ModelProvider>
            <TypeProvider>
              <main className="app-content">
                <Router>
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home1} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
                    <Route path="/kinhdoanh/nhaplieu/nhucauthucte" exact component={NCTT} />
                    <Route path="/kinhdoanh/capnhat/nhucauthucte/:id" exact component={CN_NCTT} />
                    <Route path="/kinhdoanh/baocao/tongquatkd" exact component={BCTQKD} />
                    <Route path="/kinhdoanh/baocao/chitietkd" exact component={BCCTKD} />
                    <Route path="/kinhdoanh/bieudokd/bieudotq" exact component={BDTQKD} />
                    <Route path="/kinhdoanh/bieudokd/bieudoct" exact component={BDCTKD} />
                    <Route path="/test" exact component={DKKPI} />
                  </Switch>
                </Router>
              </main>
            </TypeProvider>
          </ModelProvider>
        </ProvinceProvider>
      </BranchProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
