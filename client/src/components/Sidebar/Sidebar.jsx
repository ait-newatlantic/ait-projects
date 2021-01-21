
import React from 'react';
import DemandOverallReport from '../BranchDemandOverallReport/BranchDemandOverallReport';
import Home from '../Home/Home';

export default function Sidebar() {
    return (
        <div className="wrapper d-flex align-items-stretch">
            <nav className="text-white" style={{backgroundColor:" #24305E"}} id="sidebar">
                <div className="p-4 pt-5">
                    <a href="#" className="img logo rounded-circle mb-5" style={{ backgroundImage: "url(images/logo.jpg)" }}></a>
                    <ul className="list-unstyled components mb-5">
                        <li className="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <a href="/home">Home</a>
                                </li>
                                <li>
                                    <a href="#">Home 2</a>
                                </li>
                                <li>
                                    <a href="#">Home 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <a href="#">Page 1</a>
                                </li>
                                <li>
                                    <a href="#">Page 2</a>
                                </li>
                                <li>
                                    <a href="#">Page 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Portfolio</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="content" className="p-4 p-md-5">
                <DemandOverallReport />
            </div>
        </div>
    );
}