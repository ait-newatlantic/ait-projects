import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BranchDemandInput from './components/BranchDemandInput/BranchDemandInput'
import AdminDemandInput from "./components/AdminDemandInput/AdminDemandInput"
import BranchDemandOverallReport from './components/BranchDemandOverallReport/BranchDemandOverallReport'
import BranchDemandDetailReport from './components/BranchDemandDetailReport/BranchDemandDetailReport'
import DemandUpdate from './components/DemandUpdate/DemandUpdate'
import CustomerInput from './components/CustomerInput/CustomerInput'
import BranchCustomerList from "./components/BranchCustomerList/BranchCustomerList"
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
import Navbar from "./components/Nav/Nav"
import UserList from "./components/UserList/UserList"
import UserUpdate from "./components/UserUpdate/UserUpdate"
import AdminDemandDetailReport from "./components/AdminDemandDetailReport/AdminDemandDetailReport"
import AdminDemandOverallReport from "./components/AdminDemanOverallReport/AdminDemandOverallReport"
import Sidebar from "./components/Sidebar/Sidebar";

import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'

require('dotenv').config()

function App() {

  return (
    <div className="App">
      <header className="sticky">
        <Navbar />
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
                    <Route exact path="/dashboard" component={Sidebar} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/admin/demands/overallreport" component={AdminDemandOverallReport} />
                    <Route exact path="/admin/demands/detailreport" component={AdminDemandDetailReport} />
                    <Route exact path="/admin/demands/input" component={AdminDemandInput} />
                    <Route exact path="/admin/customers/list" component={AdminCustomerList} />
                    <Route exact path="/branch/demands/input" component={BranchDemandInput} />
                    <Route exact path="/demands/update/:id" component={DemandUpdate} />
                    <Route exact path="/branch/demands/overallreport" component={BranchDemandOverallReport} />
                    <Route exact path="/branch/demands/detailreport" component={BranchDemandDetailReport} />
                    <Route exact path="/userlist" component={UserList} />
                    <Route exact path="/userlist/update/:id" component={UserUpdate} />
                    <Route exact path="/customers/input" component={CustomerInput} />
                    <Route exact path="/branch/customers/list" component={BranchCustomerList} />
                    <Route exact path="/customers/update/:id" component={CustomerUpdate} />
                    <Route exact path='/resetpassword' component={ResetPassword} />
                    <Route exact path='/test' component={Test} />
                    <Route exact path='*' component={Error} />
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
