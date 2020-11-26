import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Footer from './components/footer/Footer'
import NCTT from './components/kinhdoanh/nhaplieu/nhucauthucte'
import BCTQKD from './components/kinhdoanh/baocaokinhdoanh/baocaotongquat'
import BCCTKD from './components/kinhdoanh/baocaokinhdoanh/baocaochitiet'
import BDTQKD from './components/kinhdoanh/bieudokd/bieudotongquat'
import BDCTKD from './components/kinhdoanh/bieudokd/bieudochitiet'
import CN_NCTT from './components/kinhdoanh/capnhat/capnhatnctt.jsx'
import KTKH from './components/khachhang/KTKH'
import DSKH from "./components/khachhang/DSKH"
import CNKH from "./components/khachhang/CNKH"
import Sidebar from "./components/sidebar/Sidebar"
import Thongbao from "./components/thongbao/Thongbao"
import Notification from "./components/notification/Notification"

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
import { CustomerProvider } from './context/customer/CustomerContext'
import { NotificationProvider } from "./context/notification/NotificationContext"

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
      <BranchProvider>
        <ProvinceProvider>
          <ModelProvider>
            <TypeProvider>
              <CustomerProvider>
                <NotificationProvider />
                <main className="app-content">
                  <Router>
                    <Switch>
                      <Route exact path={["/", "/home"]} component={Home1} />
                      <Route exact path="/login" component={Login} />
                    </Switch>
                  </Router>
                  {showAdminBoard && (
                    <Router>
                      <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/thongbao" component={Thongbao} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/kinhdoanh/nhaplieu/nhucauthucte" exact component={NCTT} />
                        <Route path="/kinhdoanh/capnhat/nhucauthucte/:id" exact component={CN_NCTT} />
                        <Route path="/kinhdoanh/baocao/tongquatkd" exact component={BCTQKD} />
                        <Route path="/kinhdoanh/baocao/chitietkd" exact component={BCCTKD} />
                        <Route path="/kinhdoanh/bieudokd/bieudotq" exact component={BDTQKD} />
                        <Route path="/kinhdoanh/bieudokd/bieudoct" exact component={BDCTKD} />
                        <Route path="/khachhang/khoitao" exact component={KTKH} />
                        <Route path="/khachhang/danhsach" exact component={DSKH} />
                        <Route path="/khachhang/capnhat/:id" exact component={CNKH} />
                      </Switch>
                    </Router>
                  )}
                  {showModeratorBoard && (
                    <Router>
                      <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/thongbao" component={Thongbao} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/kinhdoanh/nhaplieu/nhucauthucte" exact component={NCTT} />
                        <Route path="/kinhdoanh/capnhat/nhucauthucte/:id" exact component={CN_NCTT} />
                        <Route path="/kinhdoanh/baocao/tongquatkd" exact component={BCTQKD} />
                        <Route path="/kinhdoanh/baocao/chitietkd" exact component={BCCTKD} />
                        <Route path="/kinhdoanh/bieudokd/bieudotq" exact component={BDTQKD} />
                        <Route path="/kinhdoanh/bieudokd/bieudoct" exact component={BDCTKD} />
                        <Route path="/khachhang/khoitao" exact component={KTKH} />
                        <Route path="/khachhang/danhsach" exact component={DSKH} />
                        <Route path="/khachhang/capnhat/:id" exact component={CNKH} />
                      </Switch>
                    </Router>
                  )}
                </main>
                <NotificationProvider/>
              </CustomerProvider>
            </TypeProvider>
          </ModelProvider>
        </ProvinceProvider>
      </BranchProvider>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
