import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import PropTypes from 'prop-types'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import * as MaterialUIIcons from '@material-ui/icons/'
import { Link } from 'react-router-dom'

import BranchService from "../../services/branch.service"
import CustomerService from "../../services/customer.service"
import BusinessTypeService from "../../services/business_type.service"
import ProvinceService from "../../services/province.service"

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const useStyles = makeStyles({
    container: {
        maxHeight: 500,
    },
})

function TablePaginationActions(props) {
    const classes = useStyles1()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

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
    )
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default function CustomerListHistory() {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50)

    const [customers, setCustomers] = useState([])
    const [customer_name, setCustomerName] = useState("")

    const [branches, setBranches] = useState([])
    const [branch_name, setBranchName] = useState("")

    const [business_types, setBusinessTypes] = useState([])
    const [business_type_name, setBusinessTypeName] = useState("")

    const [provinces, setProvinces] = useState([])
    const [province_name, setProvinceName] = useState("")

    const [flag, setFlag] = useState(0)

    const columns = [
        {
            id: 'branch_name',
            label: 'Chi nhánh',
            align: 'left',
            minWidth: 'auto'
        },
        {
            id: 'name',
            label: 'Người nhập',
            align: 'left',
            minWidth: 'auto'
        },
        {
            id: 'customer_name',
            label: 'Tên khách hàng',
            align: 'left',
            minWidth: 'auto'
        },
        {
            id: 'customer_number',
            label: 'SĐT khách hàng',
            align: 'left',
            minWidth: 'auto'
        },
        {
            id: 'business_type_name',
            label: 'Loại khách hàng',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'customer_manager',
            label: 'Người đại diện',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'customer_manager_number',
            label: 'SĐT người đại diện',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'customer_manager_email',
            label: 'Email người đại diện',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'customer_taxcode',
            label: 'Mã số thuế',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'province_name',
            label: 'Khu vực khách hàng',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'customer_address',
            label: 'Địa chỉ khách hàng',
            minWidth: 'auto',
            align: 'left',
        },
        {
            id: 'createdAt',
            label: 'Ngày tạo form',
            minWidth: 'auto',
            align: 'left',
            format: (value) => value.substring(0, 10)
        },
        {
            id: 'updatedAt',
            label: 'Ngày cập nhật',
            minWidth: 'auto',
            align: 'left',
            format: (value) => value.substring(0, 10)
        },
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const FetchCustomers = () => {
        CustomerService.get_customers().then((response) => {
            setCustomers(response.data)
        })
    }

    const FetchBranches = () => {
        BranchService.get_branchs().then((response) => {
            setBranches(response.data)
        })
    }

    const FetchBusinessTypes = () => {
        BusinessTypeService.get_business_types().then((response) => {
            setBusinessTypes(response.data)
        })
    }

    const FetchProvinces = () => {
        ProvinceService.get_provinces().then((response) => {
            setProvinces(response.data)
        })
    }

    const handleSubmit = () => {
        const username = ""
        CustomerService.get_customer_by_branch_hide(
            username, branch_name, customer_name, province_name, business_type_name
        ).then((response) => {
            setCustomers(response.data)
        })
    }

    const onClickUnHide = (id) => {
        CustomerService.unhide_customer(id).then((response) => {
            console.log(response)
            handleSubmit()
        })
    }

    const onClickFlag = () => {
        if (flag == 0) {
            setFlag(1)
        }
        else setFlag(0)
    }

    useEffect(() => {
        FetchBranches()
        FetchCustomers()
        FetchBusinessTypes()
        FetchProvinces()
    }, [])

    useEffect(() => {
        handleSubmit()
    }, [branch_name, customer_name, province_name, business_type_name])

    return (
        <div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <h4 className="font-weight-bold text-secondary">LỊCH SỬ KHÁCH HÀNG</h4>
                </div>
                <div className="col d-flex justify-content-end">
                    <div>
                        <Link to="/dashboard/admin/customers/list/" className="btn btn-sm btn-hover" role="button">
                            <MaterialUIIcons.SupervisedUserCircle />DANH SÁCH
                        </Link>
                    </div>
                    <div>
                        <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
                            <MaterialUIIcons.FilterList />FILTER
                    </button>
                    </div>
                    <div>
                        <Link to="/dashboard/customers/input" className="btn btn-sm btn-hover" role="button">
                            <MaterialUIIcons.Add />TẠO MỚI
                            </Link>
                    </div>
                    <div>
                        <ReactHTMLTableToExcel
                            className="btn btn-sm btn-hover"
                            table="emp"
                            filename="Danh sách khách hàng"
                            sheet="Sheet"
                            buttonText={<div><MaterialUIIcons.GetApp />EXPORT</div>}
                        />
                    </div>
                </div>
            </div>
            {flag == 1 ?
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <InputLabel shrink>
                            Chi nhánh
                                </InputLabel>
                        <Autocomplete
                            name="branchId"
                            id="branchId"
                            value={branch_name}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    setBranchName("")
                                }
                                else setBranchName(newValue)
                            }}
                            options={branches.map((option) => option.branch_name)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                        <FormHelperText>Nhập tên chi nhánh</FormHelperText>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <InputLabel shrink>
                            Tên khách hàng
                                </InputLabel>
                        <Autocomplete
                            name="customerId"
                            id="customerId"
                            value={customer_name}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    setCustomerName("")
                                }
                                else setCustomerName(newValue)
                            }}
                            options={customers.map((option) => option.customer_name)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                        <FormHelperText>Nhập tên khách hàng</FormHelperText>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <InputLabel shrink>
                            Loại khách hàng
                                </InputLabel>
                        <Autocomplete
                            name="business_typeId"
                            id="business_typeId"
                            value={business_type_name}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    setBusinessTypeName("")
                                }
                                else
                                    setBusinessTypeName(newValue)
                            }}
                            options={business_types.map((option) => option.business_type_name)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                        <FormHelperText>Nhập loại khách hàng</FormHelperText>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <InputLabel shrink>
                            Khu vực khách hàng
                                </InputLabel>
                        <Autocomplete
                            name="provinceId"
                            id="provinceId"
                            value={province_name}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    setProvinceName("")
                                }
                                else setProvinceName(newValue)
                            }}
                            options={provinces.map((option) => option.province_name)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                        <FormHelperText>Nhập khu vực khách hàng</FormHelperText>
                    </div>
                </div>
                : <div></div>
            }
            <TableContainer className="table-container">
                <Table id="emp" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell

                                align="center"
                                style={{ minWidth: "'auto'" }}
                            >
                                <strong className="text-danger">
                                    Khôi phục
                             </strong>
                            </TableCell>
                            <TableCell

                                align="center"
                                style={{ minWidth: "'auto'" }}
                            >
                                <strong className="text-primary">
                                    Cập nhật
                                    </strong>
                            </TableCell>
                            <TableCell

                                align="center"
                                style={{ minWidth: "'auto'" }}
                            >
                                <strong>
                                    STT
                                    </strong>
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
                        {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell

                                        align="center"
                                        style={{ minWidth: "'auto'" }}
                                    >
                                        <IconButton color="secondary" aria-label="restore" onClick={() => onClickUnHide(row.id)}>
                                            <MaterialUIIcons.Restore />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell

                                        align="center"
                                        style={{ minWidth: "'auto'" }}
                                    >
                                        <Link className="text-primary" to={`/dashboard/customers/update/` + btoa(`${row.id}`)}>
                                            <MaterialUIIcons.Update />
                                        </Link>
                                    </TableCell>
                                    <TableCell

                                        align="center"
                                        style={{ minWidth: "'auto'" }}
                                    >
                                        {index + 1}
                                    </TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format ? column.format(value) : value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[50, 100, 200, { label: 'All', value: -1 }]}
                component="div"
                count={customers.length}
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
        </div>
    )
}