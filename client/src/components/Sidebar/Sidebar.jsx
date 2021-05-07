
import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AuthService from "../../services/auth.service"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import * as MaterialUIIcons from '@material-ui/icons/'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'
import UserService from '../../services/user.service'
import Home from "../Home/Home"
import CustomerInput from '../CustomerInput/CustomerInput'
import CustomerUpdate from "../CustomerUpdate/CustomerUpdate"
import DemandUpdate from "../DemandUpdate/DemandUpdate"

import AdminCustomerList from '../Admin/CustomerList/CustomerList'
import AdminDemandInput from '../Admin/DemandInput/DemandInput'
import AdminDemandList from '../Admin/DemandList/DemandList'
import AdminUserList from '../Admin/UserList/UserList'
import AdminCustomerListHistory from '../Admin/CustomerListHistory/CustomerListHistory'
import AdminDemandListHistory from '../Admin/DemandListHistory/DemandListHistory'
import AdminUserListHistory from '../Admin/UserListHistory/UserListHistory'

import ModeratorCustomerList from '../Moderator/CustomerList/CustomerList'
import ModeratorDemandInput from '../Moderator/DemandInput/DemandInput'
import ModeratorDemandList from '../Moderator/DemandList/DemandList'
import ModeratorUserList from '../Moderator/UserList/UserList'
import ModeratorCustomerListHistory from '../Moderator/CustomerListHistory/CustomerListHistory'
import ModeratorDemandListHistory from '../Moderator/DemandListHistory/DemandListHistory'
import ModeratorUserListHistory from '../Moderator/UserListHistory/UserListHistory'

import EmployeeCustomerList from '../Employee/CustomerList/CustomerList'
import EmployeeDemandInput from '../Employee/DemandInput/DemandInput'
import EmployeeDemandList from '../Employee/DemandList/DemandList'
import EmployeeCustomerListHistory from '../Employee/CustomerListHistory/CustomerListHistory'
import EmployeeDemandListHistory from '../Employee/DemandListHistory/DemandListHistory'
import { Typography } from '@material-ui/core'
import AdminDashBoard from '../Admin/DashBoard/DashBoard'
import ModeratorDashBoard from '../Moderator/DashBoard/DashBoard'
import EmployeeDashBoard from '../Employee/DashBoard/DashBoard'
import AdminDiary from '../Admin/Diary/Diary'
import DiaryInput from '../DiaryInput/DiaryInput'
import ErrorPage from '../ErrorPage/ErrorPage'
import UserUpdate from '../UserUpdate/UserUpdate'

require('dotenv').config()

export default function Sidebar() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showEmployeeBoard, setShowEmployeeBoard] = useState(false)
    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    const logOut = () => {
        AuthService.logout()
    }
    const drawerWidth = 240

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            background: "#212529"
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }))

    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [screenwidth, setWidth] = useState("")

    const onlyWidth = useWindowWidth()
    
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
            setCurrentUser(user)
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
            setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"))
        }
    }, [])

    useEffect(() => {
        if (open == false) {
            if (onlyWidth >= "1500") {
                setWidth("100vw")
            }
            else setWidth("80vw")
        }
        else {
            setWidth("80vw")
        }
    }, [onlyWidth, open])

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
                    <IconButton>
                        <Link to="/home" className="text-dark">
                            <MaterialUIIcons.Apps />
                        </Link>
                    </IconButton>
                    <div className="input-group rounded" style={{ width: "30vw" }}>
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" />
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <div className="row">
                                <li className="col">
                                    <Link to="/dashboard/profile" className="text-dark">
                                        <MaterialUIIcons.AccountBox />
                                    </Link>
                                </li>
                                <li className="col">
                                    <Link to="/dashboard/users/update" className="text-dark">
                                        <MaterialUIIcons.VpnKey />
                                    </Link>
                                </li>
                                <li className="col">
                                    <a href="/login" className="text-dark" onClick={logOut}>
                                        <MaterialUIIcons.ExitToApp />
                                    </a>
                                </li>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    LogIn
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ fill: "white" }} /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {showAdminBoard && (
                    <div className="text-light">
                        <List>
                            <ListItem button component={Link} to="/dashboard/admin">
                                <ListItemIcon> <MaterialUIIcons.Dashboard style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/admin/demands/list">
                                <ListItemIcon> <MaterialUIIcons.BusinessCenter style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Kinh doanh" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/admin/customers/list">
                                <ListItemIcon> <MaterialUIIcons.SupervisedUserCircle style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Khách hàng" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/admin/kpi">
                                <ListItemIcon> <MaterialUIIcons.Ballot style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="KPI" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/admin/diary">
                                <ListItemIcon> <MaterialUIIcons.Assignment style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Nhật ký" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/admin/users/list">
                                <ListItemIcon> <MaterialUIIcons.AssignmentInd style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </List>
                    </div>
                )}
                {showModeratorBoard && (
                    <div className="text-light">
                        <List>
                            <ListItem button component={Link} to="/dashboard/moderator">
                                <ListItemIcon> <MaterialUIIcons.Dashboard style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/moderator/demands/list">
                                <ListItemIcon> <MaterialUIIcons.BusinessCenter style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Kinh doanh" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/moderator/customers/list">
                                <ListItemIcon> <MaterialUIIcons.SupervisedUserCircle style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Khách hàng" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/moderator/kpi">
                                <ListItemIcon> <MaterialUIIcons.Ballot style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="KPI" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/moderator/diary">
                                <ListItemIcon> <MaterialUIIcons.Assignment style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Nhật ký" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/moderator/users/list">
                                <ListItemIcon> <MaterialUIIcons.AssignmentInd style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </List>
                    </div>
                )}
                {showEmployeeBoard && (
                    <div className="text-light">
                        <List>
                            <ListItem button component={Link} to="/dashboard/employee">
                                <ListItemIcon> <MaterialUIIcons.Dashboard style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/employee/demands/list">
                                <ListItemIcon> <MaterialUIIcons.BusinessCenter style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Kinh doanh" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/employee/customers/list">
                                <ListItemIcon> <MaterialUIIcons.SupervisedUserCircle style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Khách hàng" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/employee/kpi">
                                <ListItemIcon> <MaterialUIIcons.Ballot style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="KPI" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard/employee/diary">
                                <ListItemIcon> <MaterialUIIcons.Assignment style={{ fill: "white" }} /> </ListItemIcon>
                                <ListItemText primary="Nhật ký" />
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
                        <Route exact path="/dashboard/users/update" component={UserUpdate} />
                        <Route exact path="/dashboard/admin/diary" component={ErrorPage} />
                        <Route exact path="/dashboard/admin/kpi" component={ErrorPage} />
                        <Route exact path="/dashboard/admin" component={AdminDashBoard} />
                        <Route exact path="/dashboard/register" component={Register} />
                        <Route exact path="/dashboard/profile" component={Profile} />
                        <Route exact path="/dashboard/customers/input" component={CustomerInput} />
                        <Route exact path="/dashboard/diary/input" component={DiaryInput} />
                        <Route exact path="/dashboard/customers/update/:id" component={CustomerUpdate} />
                        <Route exact path="/dashboard/demands/update/:id" component={DemandUpdate} />
                        <Route exact path="/dashboard/admin/demands/input" component={AdminDemandInput} />
                        <Route exact path="/dashboard/admin/demands/list" component={AdminDemandList} />
                        <Route exact path="/dashboard/admin/demands/list/history" component={AdminDemandListHistory} />
                        <Route exact path="/dashboard/admin/customers/list" component={AdminCustomerList} />
                        <Route exact path="/dashboard/admin/customers/list/history" component={AdminCustomerListHistory} />
                        <Route exact path="/dashboard/admin/users/list" component={AdminUserList} />
                        <Route exact path="/dashboard/admin/users/list/history" component={AdminUserListHistory} />
                    </div>
                )}
                {showModeratorBoard && (
                    <div className="mx-auto" style={{ maxWidth: `${screenwidth}` }}>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/dashboard/moderator/diary" component={ErrorPage} />
                        <Route exact path="/dashboard/moderator/kpi" component={ErrorPage} />
                        <Route exact path="/dashboard/moderator" component={ModeratorDashBoard} />
                        <Route exact path="/dashboard/register" component={Register} />
                        <Route exact path="/dashboard/profile" component={Profile} />
                        <Route exact path="/dashboard/customers/input" component={CustomerInput} />
                        <Route exact path="/dashboard/customers/update/:id" component={CustomerUpdate} />
                        <Route exact path="/dashboard/demands/update/:id" component={DemandUpdate} />
                        <Route exact path="/dashboard/moderator/demands/input" component={ModeratorDemandInput} />
                        <Route exact path="/dashboard/moderator/demands/list" component={ModeratorDemandList} />
                        <Route exact path="/dashboard/moderator/demands/list/history" component={ModeratorDemandListHistory} />
                        <Route exact path="/dashboard/moderator/customers/list" component={ModeratorCustomerList} />
                        <Route exact path="/dashboard/moderator/customers/list/history" component={ModeratorCustomerListHistory} />
                        <Route exact path="/dashboard/moderator/users/list" component={ModeratorUserList} />
                        <Route exact path="/dashboard/moderator/users/list/history" component={ModeratorUserListHistory} />
                    </div>
                )}
                {showEmployeeBoard && (
                    <div className="mx-auto" style={{ maxWidth: `${screenwidth}` }}>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/dashboard/employee/diary" component={ErrorPage} />
                        <Route exact path="/dashboard/employee/kpi" component={ErrorPage} />
                        <Route exact path="/dashboard/employee" component={EmployeeDashBoard} />
                        <Route exact path="/dashboard/register" component={Register} />
                        <Route exact path="/dashboard/profile" component={Profile} />
                        <Route exact path="/dashboard/customers/input" component={CustomerInput} />
                        <Route exact path="/dashboard/customers/update/:id" component={CustomerUpdate} />
                        <Route exact path="/dashboard/demands/update/:id" component={DemandUpdate} />
                        <Route exact path="/dashboard/employee/demands/input" component={EmployeeDemandInput} />
                        <Route exact path="/dashboard/employee/demands/list" component={EmployeeDemandList} />
                        <Route exact path="/dashboard/employee/demands/list/history" component={EmployeeDemandListHistory} />
                        <Route exact path="/dashboard/employee/customers/list" component={EmployeeCustomerList} />
                        <Route exact path="/dashboard/employee/customers/list/history" component={EmployeeCustomerListHistory} />
                    </div>
                )}
            </main>
        </div>
    )
}