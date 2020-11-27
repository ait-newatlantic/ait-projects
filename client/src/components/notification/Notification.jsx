import React, { useContext } from "react";
import { NotificationContext } from "../../context/notification/NotificationContext"
import "./style.css";
import src from "../../../src/static/imgs/profile.jpg"

export default function Notification() {

    const [notifications, setNotifications] = useContext(NotificationContext);

    return (
        <div>
            <div className="custom container border border-dark bg-dark text-white overflow-auto" style={{ height: "70vh" }}>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>Tin tức</strong> </h4>
                </div>
                <div>
                    {notifications.map(notification => (
                        <div className="comment comment-widgets p-3 my-3 bg-primary text-white border border-dark rounded" key={notification.id}>
                            <div className="d-flex flex-row comment-row m-t-0">
                                <div className="p-2"><img src={src} alt="user" width="50" className="rounded-circle" /></div>
                                <div className="comment-text w-100">
                                    <h6 className="font-medium">Admin</h6> <span className="m-b-15 d-block">{notification.content}</span>
                                    <div className="comment-footer"> <span className="text-white float-right">{notification.date}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}