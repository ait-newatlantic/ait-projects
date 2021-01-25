
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
import AuthService from "../../services/auth.service";

import DemandInput from '../DemandInput/DemandInput'
import BranchDemandOverallReport from '../BranchDemandOverallReport/BranchDemandOverallReport'
import BranchDemandDetailReport from '../BranchDemandDetailReport/BranchDemandDetailReport'
import DemandUpdate from '../DemandUpdate/DemandUpdate'
import CustomerInput from '../CustomerInput/CustomerInput'
import BranchCustomerList from "../BranchCustomerList/BranchCustomerList"
import AdminCustomerList from "../AdminCustomerList/AdminCustomerList"
import CustomerUpdate from '../CustomerUpdate/CustomerUpdate'
import Register from "../Register/Register";
import Test from "../Test/Test"
import ResetPassword from "../ResetPassword/ResetPassword"
import UserList from "../UserList/UserList"
import UserUpdate from "../UserUpdate/UserUpdate"
import AdminDemandDetailReport from "../AdminDemandDetailReport/AdminDemandDetailReport"
import AdminDemandOverallReport from "../AdminDemanOverallReport/AdminDemandOverallReport"
import Profile from "../Profile/Profile";

import * as MaterialUIIcons from '@material-ui/icons/';

import "./sidebar.css"

import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'

require('dotenv').config()

export default function Sidebar() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const logOut = () => {
        AuthService.logout();
    };
    const drawerWidth = 245;

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
            background: '#24305E',
            color: 'white'
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
            background: '#24305E',
            color: 'white'
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
            justifyContent: "center",
            // padding: theme.spacing(3),
        },
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [width, height] = useWindowSize()
    const onlyWidth = useWindowWidth()
    const onlyHeight = useWindowHeight()

    useEffect(() => {
        if (onlyWidth <= "600") {
            handleDrawerClose()
        }
        else {
            handleDrawerOpen()
        }
    }, [onlyWidth]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"))
        }
    }, []);


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
                        color="primary"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="p" noWrap>
                        AIT ERP SOFTWARE
                    </Typography>
                    <MaterialUIIcons.Notifications className="ml-auto" style={{ marginRight: "10px" }} />
                    <MaterialUIIcons.Mail className="ml" style={{ marginRight: "10px" }} />
                    <MaterialUIIcons.BugReport className="ml" />
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
                    <Typography variant="p" noWrap>
                        DASHBOARD
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard/demands/input">
                        <ListItemIcon> <MaterialUIIcons.Create style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Nhập nhu cầu thực tế" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/admin/demands/overallreport">
                        <ListItemIcon> <MaterialUIIcons.Assessment style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Báo cáo kinh doanh" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard/customers/input">
                        <ListItemIcon> <MaterialUIIcons.PersonAdd style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Tạo khách hàng mới" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/admin/customers/list">
                        <ListItemIcon> <MaterialUIIcons.Group style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Danh sách khách hàng" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard/resetpassword">
                        <ListItemIcon> <MaterialUIIcons.VpnKey style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/userlist">
                        <ListItemIcon> <MaterialUIIcons.RecentActors style={{ fill: "white" }} /> </ListItemIcon>
                        <ListItemText primary="Danh sách users" />
                    </ListItem>
                    <ListItem button component={Link} to="/login" onClick={logOut}>
                        <ListItemIcon>
                            <MaterialUIIcons.ExitToApp style={{ fill: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route exact path="/dashboard/register" component={Register} />
                <Route exact path="/dashboard/profile" component={Profile} />
                <Route exact path="/dashboard/admin/demands/overallreport" component={AdminDemandOverallReport} />
                <Route exact path="/dashboard/admin/demands/detailreport" component={AdminDemandDetailReport} />
                <Route exact path="/dashboard/admin/customers/list" component={AdminCustomerList} />
                <Route exact path="/dashboard/demands/input" component={DemandInput} />
                <Route exact path="/dashboard/demands/update/:id" component={DemandUpdate} />
                <Route exact path="/dashboard/branch/demands/overallreport" component={BranchDemandOverallReport} />
                <Route exact path="/dashboard/branch/demands/detailreport" component={BranchDemandDetailReport} />
                <Route exact path="/dashboard/userlist" component={UserList} />
                <Route exact path="/dashboard/userlist/update/:id" component={UserUpdate} />
                <Route exact path="/dashboard/customers/input" component={CustomerInput} />
                <Route exact path="/dashboard/branch/customers/list" component={BranchCustomerList} />
                <Route exact path="/dashboard/customers/update/:id" component={CustomerUpdate} />
                <Route exact path='/dashboard/resetpassword' component={ResetPassword} />
                <Route exact path='/dashboard/test' component={Test} />
            </main>
        </div>
    );
}