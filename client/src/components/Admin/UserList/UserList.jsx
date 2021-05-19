import React, { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FormHelperText, InputLabel, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap';

import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import UserService from '../../../services/user.service'
import BranchService from "../../../services/branch.service"
import { CSVLink, CSVDownload } from "react-csv"

export default function AdminUserList() {
    const [userResult, setUserResult] = useState([])
    const [excelData, setExcelData] = useState([])

    const [branches, setBranches] = useState([])
    const [branch_name, setBranchName] = useState("")
    const [flag, setFlag] = useState(0)

    const FetchBranches = () => {
        BranchService.get_branchs().then((response) => {
            setBranches(response.data)
        })
    }

    const handleSubmit = () => {
        const hide = 0
        UserService.get_user_by_branch(hide, branch_name).then((response) => {
            setUserResult(response.data)
            setExcelData(response.data.map(i => (
                {
                    branchname: i.branch.name,
                    name: i.name,
                    username: i.username,
                    email: i.email,
                    role: i.roles[0].name,
                    createdAt: i.createdAt.substring(0, 10),
                    updatedAt: i.updatedAt.substring(0, 10)
                }
            )))
            console.log(excelData)
        })
    }

    const onClickHide = (id) => {
        UserService.hide_user(id).then((response) => {
            handleSubmit()
        })
    }

    const headers = [
        { label: "Chi nhánh", key: "branchname" },
        { label: "Tên nhân viên", key: "name" },
        { label: "Tài khoản", key: "username" },
        { label: "Email", key: "email" },
        { label: "Quyền hạn", key: "role" },
        { label: "Ngày tạo", key: "createdAt" },
        { label: "Ngày cập nhật", key: "updatedAt" },
    ]

    useEffect(() => {
        FetchBranches()
    }, [])

    useEffect(() => {
        handleSubmit()
    }, [branch_name])

    return (
        <div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <h4 className="font-weight-bold text-secondary text-left">DANH SÁCH USERS</h4>
                </div>
                <div className="col d-flex justify-content-end">
                    <div>
                        <Link to="/dashboard/admin/users/list/history" className="btn btn-sm btn-hover" role="button">
                            LỊCH SỬ
                        </Link>
                    </div>
                    <div>
                        <Link to="/dashboard/register" className="btn btn-sm btn-hover" role="button">
                            TẠO MỚI
                            </Link>
                    </div>
                    <CSVLink
                        headers={headers}
                        data={excelData}
                        className="btn btn-sm btn-hover"
                        filename={"Danh sách users.csv"}
                        target="_blank"
                    >
                        EXPORT
                        </CSVLink>
                </div>
            </div>
            <Table id="emp" className="table-container" striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Chi nhánh
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
                                options={branches.map((option) => option.name)}
                                renderInput={(params) => <TextField {...params} variant="standard" />}
                            />
                        </th>
                        <th>Tên nhân viên</th>
                        <th>Tài khoản</th>
                        <th>Email</th>
                        <th>Quyền hạn</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!!userResult && userResult.map((user, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{user.branch.name}</th>
                            <th>{user.name}</th>
                            <th>{user.username}</th>
                            <th>{user.email}</th>
                            <th>{user.roles[0].name}</th>
                            <th>{user.createdAt.substring(0, 10)}</th>
                            <th>{user.updatedAt.substring(0, 10)}</th>
                            <th><Button size="sm" variant="primary">Update</Button></th>
                            <th><Button size="sm" variant="danger" onClick={onClickHide}>Hide</Button></th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}