import React, { useContext } from "react";
import { NotificationContext } from "../../context/notification/NotificationContext"
import background from "../../../src/static/imgs/background.jpg"
import "./style.css";

export default function Notification() {

    const [notifications, setNotifications] = useContext(NotificationContext);

    return (
        <div>
            <div class="row">
                <div className="col">
                    <div>
                        <img src={background} alt="slogan" />
                    </div>
                    <div>
                        <p>Phần mềm AIT version 1.0.0 </p>
                    </div>
                </div>
                <div class="col" >
                    <div class="custom container border border-dark bg-dark text-white overflow-auto" style={{ height: "70vh" }}>
                        <div class="card-body text-center">
                            <h4 class="card-title"><strong>Thông báo</strong> </h4>
                        </div>
                        <div>
                            {notifications.map(notification => (
                                <div class="comment comment-widgets p-3 my-3 bg-primary text-white border border-dark rounded">
                                    <div class="d-flex flex-row comment-row m-t-0">
                                        <div class="p-2"><img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/83284024_876249549482569_2250287134793531392_n.jpg?_nc_cat=107&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5xGK924ZL4QAX-V6tL8&_nc_ht=scontent.fsgn2-1.fna&oh=10cd6de390438c82d5a6d896cd181942&oe=5FDECF01" alt="user" width="50" class="rounded-circle" /></div>
                                        <div class="comment-text w-100">
                                            <h6 class="font-medium">Admin</h6> <span class="m-b-15 d-block">{notification.content}</span>
                                            <div class="comment-footer"> <span class="text-white float-right">{notification.date}</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}