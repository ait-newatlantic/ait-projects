import React, { useState, useEffect, useCallback } from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeAttendance from "./components/EmployeeAttendance";
import MaterialList from "./components/MaterialList";
import EmployeeAttendanceReport from "./components/EmployeeAttendanceReport";
import WorkDiary from "./components/WorkDiary";
import WorkDiaryReport from "./components/WorkDiaryReport";
import WorkDiaryStatus from "./components/WorkDiaryStatus";
import MaterialListTotal from "./components/MaterialListTotal";
import logo from "./assets/images/ait_logo.jpg";
import WorkDiaryReportTotal from "./components/WorkDiaryReportTotal";
import Report from "./components/Report";
import BoardManager from "./components/BoardManager";
import UserService from "./services/user.service";
import { Gasoline } from "./components/Gasoline";
import { OilOutputReport } from "./components/OilOutputReport";
import { OilInputReport } from "./components/OilInputReport";
import { OilInputForm } from "./components/OilInputForm";
import { OilOutputForm } from "./components/OilOutputForm";

const App = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userProject, setUserProject] = useState(0);

  const fetchUserProject = useCallback((id) => {
    UserService.get_user(id).then(
      (response) => {
        setUserProject(response.data.Projects[0].id);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowManagerBoard(user.roles.includes("ROLE_MANAGER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      fetchUserProject(user.id);
    }
  }, [fetchUserProject]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-10" alt="AIT Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Phần mềm dự án
            </span>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Home
                </Link>
              </li>
              {showManagerBoard && (
                <li>
                  <Link
                    to={`/manager/project/${userProject}`}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Manager Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li>
                  <Link
                    to={"/admin"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser ? (
                <>
                  <li>
                    <Link
                      to={"/profile"}
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      {currentUser.username}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/login"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={logOut}
                    >
                      LogOut
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/user" element={<BoardUser />} />
        <Route exact path="/admin" element={<BoardAdmin />} />
        <Route exact path="/manager/project/:id" element={<BoardManager />} />
        <Route exact path="/project/:id" element={<Dashboard />} />
        <Route exact path="/machineries" element={<MaterialListTotal />} />
        <Route exact path="/employee/list/:id" element={<EmployeeList />} />
        <Route
          exact
          path="/employee/attendance/:id"
          element={<EmployeeAttendance />}
        />
        <Route
          exact
          path="/employee/attendance/report/:id"
          element={<EmployeeAttendanceReport />}
        />
        <Route exact path="/material/list/:id" element={<MaterialList />} />
        <Route exact path="/work/diary/:id" element={<WorkDiary />} />
        <Route
          exact
          path="/work/diary/report/:projectId/:id"
          element={<WorkDiaryReport />}
        />
        <Route
          exact
          path="/work/diary/report/:id"
          element={<WorkDiaryReportTotal />}
        />
        <Route exact path="/work/status/:id" element={<WorkDiaryStatus />} />
        <Route exact path="/report/:id" element={<Report />} />
        <Route exact path="/gasoline/:id" element={<Gasoline />} />
        <Route exact path="/gasoline/input" element={<OilInputForm />} />
        <Route exact path="/gasoline/output" element={<OilOutputForm />} />
        <Route
          exact
          path="/gasoline/report/output/:id"
          element={<OilOutputReport />}
        />
        <Route
          exact
          path="/gasoline/report/input/:id"
          element={<OilInputReport />}
        />
      </Routes>
    </div>
  );
};
export default App;
