import { Route, Router, Routes } from "react-router-dom"
import Home from "../Home";
import Register from "../Register";
import Profile from "../Profile";
import BoardUser from "../BoardUser";
import BoardAdmin from "../BoardAdmin";
import Dashboard from "../Dashboard";
import EmployeeList from "../EmployeeList";
import EmployeeAttendance from "../EmployeeAttendance";
import MaterialList from "../MaterialList";
import EmployeeAttendanceReport from "../EmployeeAttendanceReport";
import WorkDiary from "../WorkDiary";
import WorkDiaryReport from "../WorkDiaryReport";
import WorkDiaryStatus from "../WorkDiaryStatus";
import MaterialListTotal from "../MaterialListTotal";
import WorkDiaryReportTotal from "../WorkDiaryReportTotal";
import Report from "../Report";
import BoardManager from "../BoardManager";
import { Gasoline } from "../Gasoline";
import { OilOutputReport } from "../OilOutputReport";
import { OilInputReport } from "../OilInputReport";

export const Layout = () => {
    return (
        <>
            <Routes>
                <Route exact path="/home" element={<Home />} />
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
        </>
    )
}