import { FormHelperText, TextField } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import DateFunc from "../../functions/datetime"
import DemandService from "../../services/demand.service"
import UserService from "../../services/user.service"

export default function KPI() {
 const [KPI, setKPI] = useState([])
 const usersId = [...new Set(KPI.map((item) => item.userId))]
 const [branch_name, setBranchName] = useState('');
 const [Customer_Type, setCustomerType] = useState("");
 const [quantity, setQuantity] = useState("");
 const [opinion, setOpinion] = useState("");
 const [username, setUserName] = useState("");
 const [user_name, setUser_Name] = useState("");
 const [employee, setEmployee] = useState("");
 const [Province, setProvice] = useState("");
 const [customer_number, setCustomerNumber] = useState("");
 const [Customer, setCustomer] = useState("");
 const [Demand_Status, setDemandStatus] = useState("");
 const [Car_Model, setCarModel] = useState("");
 const [Car_Type, setCarType] = useState("");
 const [Color, setColor] = useState("");
 const [Contact_Type, setContactType] = useState("");
 const [datetype, setDateType] = useState("updatedAt");
 const [order, setOrderType] = useState("DESC");
 const [limit, setLimit] = useState(200);
 const [from_date, setFromDate] = useState(`${DateFunc.year}-01-01`);
 const [to_date, setToDate] = useState(
  `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
 );


 const handleFetch = useCallback(() => {
  const hide = 0;
  DemandService.get_demands_filtered(
   branch_name,
   user_name,
   employee,
   username,
   Province,
   Customer,
   customer_number,
   Customer_Type,
   Color,
   opinion,
   quantity,
   Contact_Type,
   Demand_Status,
   Car_Model,
   Car_Type,
   datetype,
   from_date,
   to_date,
   hide,
   order,
   limit
  ).then((response) => {
   setKPI(response.data)
  })
 }, [Car_Model, Car_Type, Color, Contact_Type, Customer, Customer_Type, Demand_Status, Province, branch_name, customer_number, datetype, employee, from_date, limit, opinion, order, quantity, to_date, user_name, username])

 const Render = (props) => {
  const [user, setUser] = useState('')
  const [branch, setBranch] = useState('')
  UserService.get_user(props.item).then((response) => {
   setUser(response.data.name)
   setBranch(response.data.Branch.name)
  })
  const data = KPI.filter(item => item.demand_statusId === 9 && item.userId === props.item)
  const userKPI = data.map(item => item.quantity).reduce((partial_sum, a) => partial_sum + a, 0)
  const data2 = KPI.filter(item => item.userId === props.item)
  const userKPITotal = data2.map(item => item.quantity).reduce((partial_sum, a) => partial_sum + a, 0)
  return (
   <>
    <th>
     {user}
    </th>
    <th>
     {branch}
    </th>
    <th>
     {userKPI}/{userKPITotal}
    </th>
   </>
  )
 }

 useEffect(() => {
  handleFetch()
 }, [handleFetch])

 return (
  <>
   <div className="d-flex justify-content-start">
    <div>
     <FormHelperText className="text-dark">
      Từ ngày
     </FormHelperText>
     <TextField
      size="small"
      id="from_date"
      type="date"
      value={from_date}
      onChange={(e) => setFromDate(e.target.value)}
     />
    </div>
    <div>
     <FormHelperText className="text-dark">
      Đến ngày
     </FormHelperText>
     <TextField
      size="small"
      id="to_date"
      type="date"
      value={to_date}
      onChange={(e) => setToDate(e.target.value)}
     />
    </div>
   </div>
   <Table id="emp" className="text-left" striped bordered hover size="sm">
    <thead className="text-info">
     <tr>
      <th>
       STT
      </th>
      <th>
       Tên nhân viên
      </th>
      <th>
       Chi nhánh
      </th>
      <th>
       KPI (đã bán / tổng)
      </th>
     </tr>
    </thead>
    <tbody>
     {usersId.map((item, index) =>
      <tr key={index}>
       <th>
        {index + 1}
       </th>
       <Render key={item} item={item} index={index} />
      </tr>
     )}
    </tbody>
   </Table>
  </>
 )
}