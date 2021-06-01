import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AuthService from "../../services/auth.service";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import * as MaterialUIIcons from "@material-ui/icons/";
import { useWindowWidth } from "@react-hook/window-size";
import Home from "../Home/Home";
import CustomerInput from "../CustomerInput/CustomerInput";
import CustomerUpdate from "../CustomerUpdate/CustomerUpdate";
import DemandUpdate from "../DemandUpdate/DemandUpdate";
import CustomerList from "../CustomerList/CustomerList";
import DemandInput from "../DemandInput/DemandInput";
import DemandList from "../DemandList/DemandList";
import UserList from "../UserList/UserList";
import CustomerListHistory from "../CustomerListHistory/CustomerListHistory";
import DemandListHistory from "../DemandListHistory/DemandListHistory";
import UserListHistory from "../UserListHistory/UserListHistory";
import DashBoard from "../DashBoard/DashBoard";
import DiaryInput from "../DiaryInput/DiaryInput";
import ErrorPage from "../ErrorPage/ErrorPage";
import UserUpdate from "../UserUpdate/UserUpdate";

require("dotenv").config();

export default function Sidebar() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const logOut = () => {
    AuthService.logout();
  };

  const drawerWidth = 200;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#1C4E80",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [screenwidth, setWidth] = useState("");

  const onlyWidth = useWindowWidth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"));
    }
  }, []);

  useEffect(() => {
    if (open == false) {
      if (onlyWidth <= "900") {
        setWidth("80vw");
      } else setWidth("100%");
    } else {
      if (onlyWidth <= "900") {
        setWidth("80vw");
      } else setWidth("100%");
    }
  }, [onlyWidth, open]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="bg-light text-dark">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home" className="text-dark">
            <MaterialUIIcons.Apps />
          </Link>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  href="/login"
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                  onClick={logOut}
                >
                  LOGOUT
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <MaterialUIIcons.MenuOpen style={{ fill: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {showAdminBoard && (
          <div className="text-light">
            <List>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <MaterialUIIcons.Dashboard style={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard/demands/list">
                <ListItemIcon>
                  <MaterialUIIcons.Assignment style={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Kinh doanh" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard/customers/list">
                <ListItemIcon>
                  <MaterialUIIcons.SupervisedUserCircle
                    style={{ fill: "white" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Khách hàng" />
              </ListItem>
              {/* <ListItem button component={Link} to="/dashboard/kpi">
                <ListItemIcon>
                  <MaterialUIIcons.Ballot style={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText primary="KPI" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard/diary">
                <ListItemIcon>
                  <MaterialUIIcons.Assignment style={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Nhật ký" />
              </ListItem> */}
              <ListItem button component={Link} to="/dashboard/users/list">
                <ListItemIcon>
                  <MaterialUIIcons.AssignmentInd style={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Tài khoản" />
              </ListItem>
            </List>
          </div>
        )}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {showAdminBoard && (
          <div className="mx-auto" style={{ maxWidth: `${screenwidth}` }}>
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/dashboard/users/update/:id"
              component={UserUpdate}
            />
            <Route exact path="/dashboard/diary" component={ErrorPage} />
            <Route exact path="/dashboard/kpi" component={ErrorPage} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/dashboard/register" component={Register} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route
              exact
              path="/dashboard/customers/input"
              component={CustomerInput}
            />
            <Route exact path="/dashboard/diary/input" component={DiaryInput} />
            <Route
              exact
              path="/dashboard/customers/update/:id"
              component={CustomerUpdate}
            />
            <Route
              exact
              path="/dashboard/demands/update/:id"
              component={DemandUpdate}
            />
            <Route
              exact
              path="/dashboard/demands/input"
              component={DemandInput}
            />
            <Route
              exact
              path="/dashboard/demands/list"
              component={DemandList}
            />
            <Route
              exact
              path="/dashboard/demands/list/history"
              component={DemandListHistory}
            />
            <Route
              exact
              path="/dashboard/customers/list"
              component={CustomerList}
            />
            <Route
              exact
              path="/dashboard/customers/list/history"
              component={CustomerListHistory}
            />
            <Route exact path="/dashboard/users/list" component={UserList} />
            <Route
              exact
              path="/dashboard/users/list/history"
              component={UserListHistory}
            />
          </div>
        )}
        {/* <div className="flex d-flex justify-content-end">
          <small className="text-secondary font-italic">
            Developed by<a href="tel:+84918628660"> Tran Hoang Nam</a>
          </small>
        </div> */}
      </main>
    </div>
  );
}
