import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Sidebar from "../sidebar/Sidebar"
import Notification from "../notification/Notification"
import { NotificationProvider } from "../../context/notification/NotificationContext"

const BoardAdmin = () => {
    const [content, setContent] = useState("");

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
        <NotificationProvider>
            <div className="row">
                <div className="col-md-auto"><Sidebar /></div>
                <div className="col-md"><Notification /></div>
            </div>
        </NotificationProvider>
    );
};

export default BoardAdmin;