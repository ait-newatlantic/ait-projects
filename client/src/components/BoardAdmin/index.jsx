import React, { useState, useEffect } from "react";
import ProjectService from "../../services/project.service";
import UserService from "../../services/user.service";

const BoardAdmin = () => {
    const [content, setContent] = useState("");
    const [projects, setProjects] = useState("")

    const fetchProjects = () => {
        ProjectService.get_projects().then((response) => {
            setProjects(response.data);
        });
    }

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

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className="container mx-auto text-center">
            <h3 className="mb-4 uppercase font-bold">{content} Board</h3>
            <div className="flex justify-center item center space-x-4 w-full">
                <table className="table-auto border-separate border border-slate-500 w-1/2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600">STT</th>
                            <th className="border border-slate-600">Dự án</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-slate-700">{index + 1}</td>
                                    <td className="border border-slate-700"><a href={`/project/${item.id}`}>{item.name}</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <table className="table-auto border-separate border border-slate-500 w-1/2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600">
                                STT
                            </th>
                            <th className="border border-slate-600">
                                Danh mục
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-slate-700">1</td>
                            <td className="border border-slate-700"><a href="/machineries">Danh sách thiết bị & máy móc</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default BoardAdmin;