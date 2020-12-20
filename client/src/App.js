import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Footer from './components/footer/Footer'
import DemandInput from './pages/demands/input/DemandInputPage'
import DemandOverallReport from './pages/demands/report/overall/DemandOverallReportPage'
import DemandDetailReport from './pages/demands/report/detail/DemandDetailReportPage'
import DemandUpdate from './pages/demands/update/DemandUpdatePage'
import CustomerInput from './pages/customers/input/CustomerInputPage'
import CustomerList from "./pages/customers/list/CustomerListPage"
import CustomerUpdate from "./pages/customers/update/CustomerUpdatePage"

import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import Profile from "./components/user/profile/Profile";
import Home1 from "./components/user_roles/Home";
import BoardUser from "./components/user_roles/BoardUser";
import BoardModerator from "./components/user_roles/BoardModerator";
import BoardAdmin from "./components/user_roles/BoardAdmin";
import Nav from "./components/nav/Nav"

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
              <CustomerProvider>
                <main className="app-content">
                  <Router>
                    <Switch>
                      <Route exact path={["/", "/home"]} component={Home1} />
                      <Route exact path="/login" component={Login} />
                    </Switch>
                  </Router>
                  {showAdminBoard && (
                    <div>
                      <Router>
                        <Switch>
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/profile" component={Profile} />
                          <Route path="/user" component={BoardUser} />
                          <Route path="/mod" component={BoardModerator} />
                          <Route path="/admin" component={BoardAdmin} />
                          <Route path="/kinhdoanh/nhaplieu/demands" exact component={DemandInput} />
                          <Route path="/kinhdoanh/capnhat/demands/:id" exact component={DemandUpdate} />
                          <Route path="/kinhdoanh/baocao/tongquatkd" exact component={DemandOverallReport} />
                          <Route path="/kinhdoanh/baocao/chitietkd" exact component={DemandDetailReport} />
                          <Route path="/customers/input" exact component={CustomerInput} />
                          <Route path="/customers/list" exact component={CustomerList} />
                          <Route path="/customers/update/:id" exact component={CustomerUpdate} />
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
                            <Route path="/kinhdoanh/nhaplieu/demands" exact component={DemandInput} />
                            <Route path="/kinhdoanh/capnhat/demands/:id" exact component={DemandUpdate} />
                            <Route path="/kinhdoanh/baocao/tongquatkd" exact component={DemandOverallReport} />
                            <Route path="/kinhdoanh/baocao/chitietkd" exact component={DemandDetailReport} />
                            <Route path="/customers/input" exact component={CustomerInput} />
                            <Route path="/customers/list" exact component={CustomerList} />
                            <Route path="/customers/update/:id" exact component={CustomerUpdate} />
                          </Switch>
                        </Router>
                  )}
                </main>
              </CustomerProvider>
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
