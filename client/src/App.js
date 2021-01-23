import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import DemandInput from './components/DemandInput/DemandInput'
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
import Support from './components/Support/Support'
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar"
import UserList from "./components/UserList/UserList"
import UserUpdate from "./components/UserUpdate/UserUpdate"
import AdminDemandDetailReport from "./components/AdminDemandDetailReport/AdminDemandDetailReport"
import AdminDemandOverallReport from "./components/AdminDemanOverallReport/AdminDemandOverallReport"
import Sidebar from "./components/Sidebar/Sidebar";
import Error from "./components/Error/Error"

import { ProvinceProvider } from './context/province/ProvinceContext'
import { ModelProvider } from './context/model/ModelContext'
import { TypeProvider } from './context/type/TypeContext'
import Nav from "./components/Nav/Nav";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


export default function App() {

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
    },
  }));


  require('dotenv').config()

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className="App">
      {/* <header className="sticky">
        <Navbar />
      </header> */}
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
                  {/* <div className="wrapper d-flex align-items-stretch" style={{minHeight:"100%", height:"100%"}}>
                    <Sidebar />
                    <div id="content" className="container-fluid">
                      <Nav />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/admin/demands/overallreport" component={AdminDemandOverallReport} />
                      <Route exact path="/admin/demands/detailreport" component={AdminDemandDetailReport} />
                      <Route exact path="/admin/customers/list" component={AdminCustomerList} />
                      <Route exact path="/demands/input" component={DemandInput} />
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
                    </div>
                  </div> */}
                  <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                      position="fixed"
                      className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                      })}
                    >
                      <Toolbar className="bg-light">
                        {/* style={{backgroundColor:"#24305E"}} */}
                        <IconButton
                          color="dark"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          edge="start"
                          className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                          })}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                          Phần mềm doanh nghiệp AIT
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <Drawer
                      variant="permanent"
                      className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                      })}
                      classes={{
                        paper: clsx({
                          [classes.drawerOpen]: open,
                          [classes.drawerClose]: !open,
                        }),
                      }}
                    >
                      <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                      </div>
                      <Divider />
                      <List>
                        <ListItem button component={Link} to="/demands/input">
                          <ListItemIcon> <InboxIcon /> </ListItemIcon>
                          <ListItemText primary="Nhập nhu cầu thực tế" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/demands/overallreport">
                          <ListItemIcon> <InboxIcon /> </ListItemIcon>
                          <ListItemText primary="Báo cáo kinh doanh" />
                        </ListItem>
                      </List>
                      <Divider />
                      <List>
                        <ListItem button component={Link} to="/customers/input">
                          <ListItemIcon> <InboxIcon /> </ListItemIcon>
                          <ListItemText primary="Tạo khách hàng mới" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/customers/list">
                          <ListItemIcon> <InboxIcon /> </ListItemIcon>
                          <ListItemText primary="Danh sách KH" />
                        </ListItem>
                      </List>
                    </Drawer>
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/admin/demands/overallreport" component={AdminDemandOverallReport} />
                      <Route exact path="/admin/demands/detailreport" component={AdminDemandDetailReport} />
                      <Route exact path="/admin/customers/list" component={AdminCustomerList} />
                      <Route exact path="/demands/input" component={DemandInput} />
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
                    </main>
                  </div>
                </Switch>
              </Router>
            </TypeProvider>
          </ModelProvider>
        </ProvinceProvider>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}


