import React from 'react';
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
import useFullPageLoader from "../../services/loader.service"
import { useState } from 'react';
import { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

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


export default function BranchCustomerList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [content, setContent] = useState("");
    const [customerResult, setCustomerResult] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const currentUser = AuthService.getCurrentUser();
    const [flag, setFlag] = useState(0);

    const FetchAllData = () => {
        showLoader()
        const employee = currentUser.username.split('.')[0]
        CustomerService.get_customers(employee).then((response) => {
            hideLoader()
            setCustomerResult(response.data)
        })
    }

    const OnClickSearchTool = () => {
        if (flag === 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    }

    const columns = [
        {
            id: 'customer',
            label: 'Tên khách hàng',
            align: 'left',
            minWidth: 120
        },
        {
            id: 'customer_number',
            label: 'SĐT khách hàng',
            align: 'left',
            minWidth: 120
        },
        {
            id: 'customer_type',
            label: 'Loại khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_representative',
            label: 'Người đại diện',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_representative_number',
            label: 'SĐT người đại diện',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_representative_email',
            label: 'Email người đại diện',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_taxcode',
            label: 'Mã số thuế',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_area',
            label: 'Khu vực khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_address',
            label: 'Địa chỉ khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        FetchAllData()
    }, [])

    useEffect(() => {
        UserService.getModeratorBoard().then(
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

    return (
        <>
            {loader}
            {content === "Moderator" ?
                <Paper className={classes.root}>
                    <div className="card-header text-white" style={{ background: "#24305e", margin: "auto", maxWidth: "82vw" }}>
                        <div className="row">
                            <div className="col-sm">DANH SÁCH KHÁCH HÀNG</div>
                            <div className="col-sm text-right">
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp"
                                    filename="Danh sách khách hàng"
                                    sheet="Sheet"
                                    buttonText="Export excel"
                                />
                                <button type="button" className="btn btn-success" style={{ marginLeft: "5px" }} onClick={OnClickSearchTool}>
                                    Bộ lọc
                                                </button>
                            </div>
                        </div>
                    </div>
                    {flag === 1 ?
                        <div className="row" style={{ margin: "auto", maxWidth: "82vw" }}>
                            <div className="col-sm">

                            </div>
                            <div className="col-sm">

                            </div>
                            <div className="col-sm">

                            </div>
                            <div className="col-sm">

                            </div>
                        </div>
                        :
                        <div></div>
                    }
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
                                {customerResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            <TableCell
                                                key="idx"
                                                align="center"
                                                style={{ minWidth: "120" }}
                                            >
                                                <a href={`/dashboard/customers/update/${row.id}`}>
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
                        count={customerResult.length}
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
                :
                <div>{content}</div>
            }
        </>
    );
}