import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import UserService from "../../services/user.service";
import Sidebar from "../sidebar/Sidebar"
import Home from "../home/Home"

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
        <Container fluid="ms">
            <Row>
                <Col sm><Sidebar data={content} /></Col>
                <Col sm={9}><Home /></Col>
            </Row>
        </Container>
    );
};

export default BoardAdmin;