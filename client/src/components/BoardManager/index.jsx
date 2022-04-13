import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Dashboard from "../Dashboard";

const BoardManager = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        UserService.getManagerBoard().then(
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
        <div className="container mx-auto text-center">
            <h3 className="mb-4 uppercase font-bold">{content} Board</h3>
            <Dashboard/>
        </div>
    );
};
export default BoardManager;