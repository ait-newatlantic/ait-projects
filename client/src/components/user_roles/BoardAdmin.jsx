import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import UserService from "../../services/user.service";
import Sidebar from "../sidebar/Sidebar"
import Home from "../home/Home"
import "./style.css"

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
        <div className="row">
            <div className="col-sm"><Sidebar /></div>
            <div className="col-sm">
                <img src="https://wallpaperaccess.com/full/2927307.jpg" width="100%" alt="slogan" />
            </div>
            <div className="col-sm">
                <img src="https://cdn.hipwallpaper.com/i/33/49/MY0nlG.jpg" width="100%" alt="slogan" />
            </div>
        </div>
    );
};

export default BoardAdmin;