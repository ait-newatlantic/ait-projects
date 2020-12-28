import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DemandInput from './components/DemandInput/DemandInput'
import DemandOverallReport from './components/DemandOverallReport/DemandOverallReport'
import DemandDetailReport from './components/DemandDetailReport/DemandDetailReport'
import DemandUpdate from './components/DemandUpdate/DemandUpdate'
import CustomerInput from './components/CustomerInput/CustomerInput'
import CustomerList from "./components/CustomerList/CustomerList"
import CustomerUpdate from './components/CustomerUpdate/CustomerUpdate'
import Register from "./components/Register/Register";

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

import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'
import { CustomerProvider } from './context/customer/CustomerContext'

import AuthService from "./services/auth.service";

require('dotenv').config()

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    console.log("*Developed by Nam Tran*\n*Contact: namtrhg@gmail.com*")
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

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
                    {showAdminBoard && (
                      <div>
                        <Router>
                          <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/user" component={BoardUser} />
                            <Route path="/userlist" exact component={UserList} />
                            <Route path="/userlist/update/:id" exact component={UserUpdate} />
                            <Route path="/mod" component={BoardModerator} />
                            <Route path="/admin" component={BoardAdmin} />
                            <Route path="/demands/input" exact component={DemandInput} />
                            <Route path="/demands/update/:id" exact component={DemandUpdate} />
                            <Route path="/demands/overallreport" exact component={DemandOverallReport} />
                            <Route path="/demands/detailreport" exact component={DemandDetailReport} />
                            <Route path="/customers/input" exact component={CustomerInput} />
                            <Route path="/customers/list" exact component={CustomerList} />
                            <Route path="/customers/update/:id" exact component={CustomerUpdate} />
                            <Route path='*' component={Error} />
                          </Switch>
                        </Router>
                      </div>
                    )}
                    {showModeratorBoard && (
                      <Router>
                        <Switch>
                          <Route exact path="/profile" component={Profile} />
                          <Route path="/user" component={BoardUser} />
                          <Route path="/mod" component={BoardModerator} />
                          <Route path="/admin" component={BoardAdmin} />
                          <Route path="/demands/input" exact component={DemandInput} />
                          <Route path="/demands/update/:id" exact component={DemandUpdate} />
                          <Route path="/demands/overallreport" exact component={DemandOverallReport} />
                          <Route path="/demands/detailreport" exact component={DemandDetailReport} />
                          <Route path="/customers/input" exact component={CustomerInput} />
                          <Route path="/customers/list" exact component={CustomerList} />
                          <Route path="/customers/update/:id" exact component={CustomerUpdate} />
                          <Route path='*' component={Error} />
                        </Switch>
                      </Router>
                    )}
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
