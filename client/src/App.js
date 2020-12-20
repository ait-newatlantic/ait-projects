import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import DemandInput from './pages/demands/input/DemandInputPage'
import DemandOverallReport from './pages/demands/report/overall/DemandOverallReportPage'
import DemandDetailReport from './pages/demands/report/detail/DemandDetailReportPage'
import DemandUpdate from './pages/demands/update/DemandUpdatePage'
import CustomerInput from './pages/customers/input/CustomerInputPage'
import CustomerList from "./pages/customers/list/CustomerListPage"
import CustomerUpdate from "./pages/customers/update/CustomerUpdatePage"

//Components
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Error from './components/Error/Error'
import Support from './components/Support/Support'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import BoardUser from "./components/BoardUser/BoardUser";
import BoardModerator from "./components/BoardModerator/BoardModerator";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";
import Nav from "./components/Nav/Nav"

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
