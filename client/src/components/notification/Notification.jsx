import React, { useContext } from "react";
import { NotificationContext } from "../../context/notification/NotificationContext"
import "./style.css";

export default function Notification() {

    const [notifications, setNotifications] = useContext(NotificationContext);

    return (
        <div>
            <div className="custom container border border-dark bg-dark text-white overflow-auto" style={{ height: "70vh" }}>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>Thông báo</strong> </h4>
                </div>
                <div>
                    {notifications.map(notification => (
                        <div className="comment comment-widgets p-3 my-3 bg-primary text-white border border-dark rounded" key={notification.id}>
                            <div className="d-flex flex-row comment-row m-t-0">
                                <div className="p-2"><img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/83284024_876249549482569_2250287134793531392_n.jpg?_nc_cat=107&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5xGK924ZL4QAX-V6tL8&_nc_ht=scontent.fsgn2-1.fna&oh=10cd6de390438c82d5a6d896cd181942&oe=5FDECF01" alt="user" width="50" className="rounded-circle" /></div>
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