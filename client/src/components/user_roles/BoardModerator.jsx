import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Sidebar from "../sidebar/Sidebar"
import Notification from "../notification/Notification"
import { NotificationProvider } from "../../context/notification/NotificationContext"


const BoardModerator = () => {
    const [content, setContent] = useState("");

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
        <NotificationProvider>
                <div><Notification /></div>
        </NotificationProvider>
    );
};

export default BoardModerator;
