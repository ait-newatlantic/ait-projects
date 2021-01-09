import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DemandInput from './components/DemandInput/DemandInput'
import BranchDemandOverallReport from './components/BranchDemandOverallReport/BranchDemandOverallReport'
import BranchDemandDetailReport from './components/BranchDemandDetailReport/BranchDemandDetailReport'
import DemandUpdate from './components/DemandUpdate/DemandUpdate'
import CustomerInput from './components/CustomerInput/CustomerInput'
import CustomerList from "./components/CustomerList/CustomerList"
import AdminCustomerList from "./components/AdminCustomerList/AdminCustomerList"
import CustomerUpdate from './components/CustomerUpdate/CustomerUpdate'
import Register from "./components/Register/Register";
import Test from "./components/Test/Test"
import ResetPassword from "./components/ResetPassword/ResetPassword"

import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Error from './components/Error/Error'
import Support from './components/Support/Support'
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import BoardUser from "./components/BoardUser/BoardUser";
import BoardModerator from "./components/BoardModerator/BoardModerator";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";
import Nav from "./components/Nav/Nav"
import UserList from "./components/UserList/UserList"
import UserUpdate from "./components/UserUpdate/UserUpdate"
import AdminDemandDetailReport from "./components/AdminDemandDetailReport/AdminDemandDetailReport"
import AdminDemandOverallReport from "./components/AdminDemanOverallReport/AdminDemandOverallReport"

import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'

require('dotenv').config()

function App() {

  return (
    <div className="App">
      <header className="sticky">
        <Nav />
      </header>
      <ProvinceProvider>
        <ModelProvider>
          <TypeProvider>
            <main className="app-content">
              <Router>
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/support" component={Support} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/mod" exact component={BoardModerator} />
                  <Route path="/admin" exact component={BoardAdmin} />
                  <Route path="/admin/demands/overallreport" exact component={AdminDemandOverallReport} />
                  <Route path="/admin/demands/detailreport" exact component={AdminDemandDetailReport} />
                  <Route path="/admin/customers/list" exact component={AdminCustomerList} />
                  <Route path="/demands/input" exact component={DemandInput} />
                  <Route path="/demands/update/:id" exact component={DemandUpdate} />
                  <Route path="/branch/demands/overallreport" exact component={BranchDemandOverallReport} />
                  <Route path="/branch/demands/detailreport" exact component={BranchDemandDetailReport} />
                  <Route path="/user" component={BoardUser} />
                  <Route path="/userlist" exact component={UserList} />
                  <Route path="/userlist/update/:id" exact component={UserUpdate} />
                  <Route path="/customers/input" exact component={CustomerInput} />
                  <Route path="/customers/list" exact component={CustomerList} />
                  <Route path="/customers/update/:id" exact component={CustomerUpdate} />
                  <Route path='/resetpassword' component={ResetPassword} />
                  <Route path='/test' component={Test} />
                  <Route path='*' component={Error} />
                </Switch>
              </Router>
            </main>
          </TypeProvider>
        </ModelProvider>
      </ProvinceProvider>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
