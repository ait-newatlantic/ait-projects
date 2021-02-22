import React, { useEffect, useState } from 'react'
import DemandService from "../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import * as MaterialUIIcons from '@material-ui/icons/';
import "./style.css"

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

export default function AdminDemandDetailReport() {
    const newDate = new Date()
    const year = newDate.getFullYear()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [fromdate, setFromDate] = useState(`${year}-1-1`);
    const [todate, setToDate] = useState(`${year}-12-31`);
    const [datetype, setDateType] = useState('Tất cả các ngày');
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(0);
    const [branch, setBranch] = useState("");
    const [num, setNum] = useState(0);

    const getDate = () => {
        const employee = branch
        DemandService.get_date(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getUpdatedAt = () => {
        const employee = branch
        DemandService.get_updateAt(employee, fromdate, todate).then((response) => {
            hideLoader()
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getCreatedAt = () => {
        const employee = branch
        DemandService.get_createAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getGoAt = () => {
        const employee = branch
        DemandService.get_goAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const FetchTotal = () => {
        showLoader()
        const employee = branch
        DemandService.get_total(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult2(response.data);
        });
    }

    const Submit = () => {
        const employee = branch
        DemandService.get_goAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
        DemandService.get_total(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult2(response.data);
        });
    }

    const onChangeBranch = (e) => {
        const branch = e.target.value;
        setBranch(branch);
    }

    // const onChangeDateType = (e) => {
    //     const datetype = e.target.value;
    //     setDateType(datetype);
    // };

    const onChangeFromDate = (e) => {
        const fromdate = e.target.value;
        setFromDate(fromdate);
    };

    const onChangeToDate = (e) => {
        const todate = e.target.value;
        setToDate(todate);
    };

    const FetchDemand = () => {
        showLoader()
        const branch = ""
        DemandService.get_demands(branch).then((response) => {
            hideLoader()
            setYearResult(response.data)
            setTotal(response.data.length)
            setNum(num)
        })
    }

    const columns = [
        {
            id: 'employee_field',
            label: 'Người đi thực tế',
            align: 'left',
            minWidth: 120
        },
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
            id: 'customer_area',
            label: 'Khu vực khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_type',
            label: 'Loại khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_opinion',
            label: 'Ý kiến khách hàng',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customer_communication',
            label: 'Phương thưc liên lạc',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'status',
            label: 'Giai đoạn',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'model',
            label: 'Model xe',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'type',
            label: 'Loại xe',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'quantity',
            label: 'Số lượng xe',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'color',
            label: 'Màu xe',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'date',
            label: 'Ngày đi thực tế',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'createdAt',
            label: 'Ngày tạo form',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'updatedAt',
            label: 'Ngày cập nhật',
            minWidth: 120,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'note',
            label: 'Ghi chú',
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
        getGoAt()
        FetchTotal()
    }, [])

    useEffect(() => {
        UserService.getAdminBoard().then(
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
            {content === "Admin" ?
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex md:flex-col mr-auto">
                                <div className="d-inline-flex">
                                    <input className="form-control" type="date"
                                        id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                </div>
                                <div className="d-inline-flex p-2">
                                    <MaterialUIIcons.ArrowForward />
                                </div>
                                <div className="d-inline-flex">
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={onChangeToDate} />
                                </div>
                                <div className="d-inline-flex pl-2">
                                    <button type="button" className="btn btn-primary" onClick={Submit}>
                                        <MaterialUIIcons.Search />Tra cứu
                                                </button>
                                </div>
                            </div>
                            <span>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            </span>
                        </div>
                    </nav>
                    <Paper className={classes.root}>
                        <div className="card-header text-black" style={{ margin: "auto" }}>
                            <div className="d-flex row">
                                <div className="d-inline-flex p-2 mr-auto">
                                    BÁO CÁO CHI TIẾT ({total} nhu cầu từ {fromdate} đến {todate})
                            </div>
                                {/* <div className="d-inline-flex p-2">
                                    <select className="form-control" onChange={onChangeDateType}>
                                        <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                        <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                        <option defaultValue="Ngày cập nhật">Ngày cập nhật</option>
                                        <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                    </select>
                                </div> */}
                                <div className="d-inline-flex p-2">
                                    <select className="form-control col-sm" name="branch" id="branch" onChange={onChangeBranch}>
                                        <option value="">Tất cả</option>
                                        <option value="NVL">NVL</option>
                                        <option value="PDA">PDA</option>
                                        <option value="DONGNAI">DONGNAI</option>
                                        <option value="QUANGTRI">QUANGTRI</option>
                                        <option value="DANANG">DANANG</option>
                                        <option value="VUNGTAU">VUNGTAU</option>
                                        <option value="GIALAI">GIALAI</option>
                                        <option value="TAYNINH">TAYNINH</option>
                                        <option value="DAKLAK">DAKLAK</option>
                                        <option value="LAMDONG">LAMDONG</option>
                                        <option value="CANTHO">CANTHO</option>
                                        <option value="BINHPHUOC">BINHPHUOC</option>
                                        <option value="HUNGYEN">HUNGYEN</option>
                                        <option value="BINHDINH">BINHDINH</option>
                                    </select>
                                </div>
                                <div className="d-inline-flex p-2">
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="emp"
                                        filename="Báo cáo kinh doanh"
                                        sheet="Sheet"
                                        buttonText="Export excel"
                                    />
                                </div>
                            </div>
                        </div>
                        <TableContainer className="table-container">
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" style={{ background: "white" }}><b>Tổng cộng</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Tiếp cận chào hàng</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Chốt đơn hàng</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Chạy thử</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Đàm phán</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Đã cọc</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Đã thanh toán tạm ứng</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Hoàn tất giao dịch</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Đã cọc</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Bàn giao chưa thanh toán</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Lên hợp đồng</b></TableCell>
                                        <TableCell align="right" style={{ background: "white" }}><b>Giao dịch thất bại</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {yearResult2.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell align="right">{row.tongcong}</TableCell>
                                            <TableCell align="right">{row.tiepcanchaohang}</TableCell>
                                            <TableCell align="right">{row.chotdonhang}</TableCell>
                                            <TableCell align="right">{row.chaythu}</TableCell>
                                            <TableCell align="right">{row.damphan}</TableCell>
                                            <TableCell align="right">{row.dacoc}</TableCell>
                                            <TableCell align="right">{row.dathanhtoantamung}</TableCell>
                                            <TableCell align="right">{row.hoantatgiaodich}</TableCell>
                                            <TableCell align="right">{row.dacoc}</TableCell>
                                            <TableCell align="right">{row.bangiaochuathanhtoan}</TableCell>
                                            <TableCell align="right">{row.lenhopdong}</TableCell>
                                            <TableCell align="right">{row.giaodichthatbai}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer className="table-container">
                            <Table id="emp" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            key="idf"
                                            align="center"
                                            style={{ minWidth: "120" }}
                                        >
                                            <strong>#</strong>
                                        </TableCell>
                                        <TableCell
                                            key="idv"
                                            align="center"
                                            style={{ minWidth: "120" }}
                                        >
                                            <strong>Chi nhánh</strong>
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
                                    {yearResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                <TableCell
                                                    key="idx"
                                                    align="center"
                                                    style={{ minWidth: "120" }}
                                                >
                                                    <a href={`/dashboard/demands/update/${row.id}`}>
                                                        {index + 1}
                                                    </a>
                                                </TableCell>
                                                <TableCell
                                                    key="ide"
                                                    align="center"
                                                    style={{ minWidth: "120" }}
                                                >
                                                    {row.employee.split('.')[0]}
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
                            count={yearResult.length}
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
