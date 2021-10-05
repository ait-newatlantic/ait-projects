import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";

//Libraries
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import * as MaterialUIIcons from "@material-ui/icons/";
import { useWindowWidth } from "@react-hook/window-size";
import { Dropdown, DropdownButton } from "react-bootstrap";

//Services
import AuthService from "../../services/auth.service";

//Components
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
import UserUpdate from "../UserUpdate/UserUpdate";
import KPI from "../KPI/KPI";

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
      background: `#003d80`,
    },
    drawerHeader: {
      alignItems: "center",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1, 2),
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
    nested: {
      paddingLeft: theme.spacing(4),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }));

  const classes = useStyles();
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
    const User = AuthService.getCurrentUser();
    if (User) {
      setCurrentUser(User);
      setShowModeratorBoard(User.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(User.roles.includes("ROLE_ADMIN"));
      setShowEmployeeBoard(User.roles.includes("ROLE_EMPLOYEE"));
    }
  }, []);

  useEffect(() => {
    if (open === false) {
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
        <Toolbar className="bg-light text-dark" variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {currentUser ? (
            <Dropdown className="mr-auto d-flex flex-wrap">
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                size="sm"
                title="Tệp"
              >
                <Dropdown.Item href="https://minio.pqe.com.vn/minio/newatlantic/">
                  Lưu trữ
                </Dropdown.Item>
                <Dropdown.Item href="/settings">Cài đặt</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                size="sm"
                title="Đi"
              >
                <Dropdown.Item href="/home">Đi tới trang chủ</Dropdown.Item>
                <Dropdown.Item href="https://www.newatlantic.vn/">
                  Đi tới newatlantic
                </Dropdown.Item>
                <Dropdown.Item href="http://kamazvietnam.com.vn/">
                  Đi tới kamazvn
                </Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                size="sm"
                title="Trợ giúp"
              >
                <Dropdown.Item href="#/action-1">Chào mừng</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bắt đầu</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Tài liệu</Dropdown.Item>
              </DropdownButton>
            </Dropdown>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>
            </ul>
          )}
          <DropdownButton id="dropdown-basic-button" variant="light" size="sm">
            <Dropdown.Item href="/dashboard/profile">Hồ sơ</Dropdown.Item>
            <Dropdown.Item href="/settings">Cài đặt</Dropdown.Item>
            <Dropdown.Item href="/login" onClick={logOut}>
              Thoát
            </Dropdown.Item>
          </DropdownButton>
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
        <div className={classes.drawerHeader} style={{ minHeight: "48px" }}>
          <div className="flex d-flex flex-wrap align-items-center px-1">
            <div>
              <IconButton onClick={handleDrawerClose}>
                <MaterialUIIcons.Menu style={{ fill: "white" }} />
              </IconButton>
            </div>
            <small className="font-weight-bold text-white text-uppercase">
              New Atlantic IT JSC
            </small>
          </div>
        </div>
        <Divider />
        {showAdminBoard && (
          <List className="text-white">
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/kpi">
              <ListItemText primary="Báo cáo KPI" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/demands/list">
              <ListItemText primary="Báo cáo kinh doanh" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/demands/list/history"
            >
              <ListItemText primary="Lịch sử kinh doanh" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/customers/list">
              <ListItemText primary="Danh sách khách hàng" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/customers/list/history"
            >
              <ListItemText primary="Lịch sử khách hàng" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/users/list">
              <ListItemText primary="Danh sách tài khoản" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/users/list/history"
            >
              <ListItemText primary="Lịch sử tài khoản " />
            </ListItem>
          </List>
        )}
        {showModeratorBoard && (
          <List className="text-white">
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/kpi">
              <ListItemText primary="Báo cáo KPI" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/demands/list">
              <ListItemText primary="Báo cáo kinh doanh" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/demands/list/history"
            >
              <ListItemText primary="Lịch sử kinh doanh" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/customers/list">
              <ListItemText primary="Danh sách khách hàng" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/customers/list/history"
            >
              <ListItemText primary="Lịch sử khách hàng" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/users/list">
              <ListItemText primary="Danh sách tài khoản" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/users/list/history"
            >
              <ListItemText primary="Lịch sử tài khoản " />
            </ListItem>
          </List>
        )}
        {showEmployeeBoard && (
          <List className="text-white">
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/kpi">
              <ListItemText primary="Báo cáo KPI" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/demands/list">
              <ListItemText primary="Báo cáo kinh doanh" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/demands/list/history"
            >
              <ListItemText primary="Lịch sử kinh doanh" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/customers/list">
              <ListItemText primary="Danh sách khách hàng" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/customers/list/history"
            >
              <ListItemText primary="Lịch sử khách hàng" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/users/list">
              <ListItemText primary="Danh sách tài khoản" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/users/list/history"
            >
              <ListItemText primary="Lịch sử tài khoản " />
            </ListItem>
          </List>
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
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/dashboard/register" component={Register} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route
              exact
              path="/dashboard/customers/input"
              component={CustomerInput}
            />
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
            <Route exact path="/dashboard/kpi" component={KPI} />
          </div>
        )}
        {showModeratorBoard && (
          <div className="mx-auto" style={{ maxWidth: `${screenwidth}` }}>
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/dashboard/users/update/:id"
              component={UserUpdate}
            />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/dashboard/register" component={Register} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route
              exact
              path="/dashboard/customers/input"
              component={CustomerInput}
            />
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
            <Route exact path="/dashboard/kpi" component={KPI} />
          </div>
        )}
        {showEmployeeBoard && (
          <div className="mx-auto" style={{ maxWidth: `${screenwidth}` }}>
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/dashboard/users/update/:id"
              component={UserUpdate}
            />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/dashboard/register" component={Register} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route
              exact
              path="/dashboard/customers/input"
              component={CustomerInput}
            />
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
            <Route exact path="/dashboard/kpi" component={KPI} />
          </div>
        )}
      </main>
    </div>
  );
}
