import React, { useEffect, useState } from 'react'
import UserService from "../../services/user.service"
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../services/loader.service"

export default function DemandOverallReport(props) {

    const [userResult, setUserResult] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const currentUser = AuthService.getCurrentUser();
    const [id, setId] = useState("");

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
        if (currentUser.username.split('.')[0] === "AIT") {
            FetchUsers()
        } else {
            FetchUsersSpecific()
        }
    }, [])

    return (
        <>
            {loader}
            <div className="custom">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>
                            DANH SÁCH USERS
                    </div>
                        <div className="table-container">
                            <table className="table">
                                <tbody>
                                    <tr id="titles" key="a">
                                        <th>ID</th>
                                        <th>USERNAME</th>
                                        <th>EMAIL</th>
                                        <th>CẬP NHẬT</th>
                                    </tr>
                                    {!!userResult && userResult.map(form => (
                                        <tr className="content" key={form._id}>
                                            <td>{form.id}</td>
                                            <td>{form.username}</td>
                                            <td>{form.email}</td>
                                            <td>
                                                <a className="btn btn-warning btn-sm" href={`/userlist/update/${form.id}`} role="button">Cập nhật</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}