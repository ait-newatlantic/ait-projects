import React, { useEffect, useState } from 'react'
import UserService from "../../services/user.service"
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../services/loader.service"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CustomerService from "../../services/customer.service"
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import userService from '../../services/user.service';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
    },
    container: {
        maxHeight: 700,
    },
});

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function DemandOverallReport(props) {

    const [userResult, setUserResult] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const currentUser = AuthService.getCurrentUser();
    const [id, setId] = useState("");
    const [content, setContent] = useState("");
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const columns = [
        {
            id: 'username',
            label: 'Tài khoản',
            align: 'left',
            minWidth: 120
        },
        {
            id: 'email',
            label: 'Email',
            align: 'left',
            minWidth: 120
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const FetchUsers = () => {
        showLoader()
        UserService.get_users().then((response) => {
            hideLoader()
            setUserResult(response.data);
        });
    }

    const FetchUsersSpecific = () => {
        showLoader()
        UserService.get_users_specific(currentUser.username.split('.')[0]).then((response) => {
            hideLoader()
            setUserResult(response.data);
        });
    }

    useEffect(() => {
        userService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    useEffect(() => {
        if (currentUser.username.split('.')[0] === "AIT") {
            FetchUsers()
        } else {
            FetchUsersSpecific()
        }
    }, [])

    return (
        <>
            {loader}
            {content === "Admin" ?
                <div className="container-fluid">
                    <Paper className={classes.root}>
                        <div className="card-header text-black" style={{ margin: "auto" }}>
                            <div className="d-flex row">
                                <div className="d-inline-flex p-2 mr-auto">
                                    DANH SÁCH KHÁCH HÀNG
                                        </div>
                                <div className="d-inline-flex p-2">
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="emp"
                                        filename="Danh sách khách hàng"
                                        sheet="Sheet"
                                        buttonText="Export excel"
                                    />
                                </div>
                            </div>
                        </div>
                        <TableContainer className="table-container">
                            <Table id="emp" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            key="idx"
                                            align="center"
                                            style={{ minWidth: "120" }}
                                        >
                                            <strong>#</strong>
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                <strong>{column.label}</strong>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                <TableCell
                                                    key="idx"
                                                    align="center"
                                                    style={{ minWidth: "120" }}
                                                >
                                                    <a href={`/dashboard/userlist/update/${row.id}`}>
                                                        {index + 1}
                                                    </a>
                                                </TableCell>
                                                {columns.map((column) => {
                                                    const value = row[column.id]
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[50, 100, 200, 500, 1000, { label: 'All', value: -1 }]}
                            component="div"
                            count={userResult.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </Paper>
                </div>
                :
                <div>{content}</div>
            }
        </>
    )
}