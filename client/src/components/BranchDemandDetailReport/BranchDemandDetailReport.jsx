import React, { useEffect, useState } from 'react'
import "./style.css"
import DemandService from "../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import SearchIcon from '@material-ui/icons/Search';

export default function DemandDetailReport() {

    const [fromdate, setFromDate] = useState('2015-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    const [yearResult3, setYearResult3] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const currentUser = AuthService.getCurrentUser();
    const [flag, setFlag] = useState(0);
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(0);

    const getDate = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_date(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getUpdatedAt = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_updateAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getCreatedAt = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_createAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getGoAt = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_goAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const Submit = () => {
        if (datetype === "Ngày tạo form") {
            getCreatedAt()
        }
        else if (datetype === "Ngày cập nhật gần nhất") {
            getUpdatedAt()
        }
        else if (datetype === "Ngày đi thực tế") {
            getGoAt()
        }
        else {
            getDate()
        }
    }

    const onChangeDateType = (e) => {
        const datetype = e.target.value;
        setDateType(datetype);
    };

    const onChangeFromDate = (e) => {
        const fromdate = e.target.value;
        setFromDate(fromdate);
    };

    const onChangeToDate = (e) => {
        const todate = e.target.value;
        setToDate(todate);
    };

    const FetchDemand = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_demands(employee).then((response) => {
            setYearResult(response.data)
            setTotal(response.data.length)
        })
    }

    const FetchDemandQuantity = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_all_quantity(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult3(response.data)
        })
    }

    const OnClickSearchTool = () => {
        if (flag == 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    }

    useEffect(() => {
        FetchDemand()
        FetchDemandQuantity()

    }, [])

    useEffect(() => {
        UserService.getModeratorBoard().then(
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
        <>
        {loader}
        <div className="custom">
            {content == "Moderator" ?
               <div>
               <div className="card-deck">
                   <div className="card">
                       <h5>BÁO CÁO KINH DOANH CHI TIẾT</h5>
                       <div className="row">
                           <div className="col-sm">
                               <h6> Số records: {total} </h6>
                           </div>
                           <div className="col-sm">
                               <h6>
                                   <ReactHTMLTableToExcel
                                       className="btn btn-info"
                                       table="emp"
                                       filename="Báo cáo kinh doanh"
                                       sheet="Sheet"
                                       buttonText="Export excel"
                                   />
                               </h6>
                           </div>
                           <div className="col-sm">
                               <h6>
                                   <button type="button" className="btn btn-success" onClick={OnClickSearchTool}>
                                       Tìm kiếm nâng cao
                                       </button>
                               </h6>
                           </div>
                       </div>
                       {flag == 1 ?
                           <div>
                               <div className="row">
                                   <div className="col-sm">
                                       <label htmlFor="exampleFormControlSelect1">Loại ngày</label>
                                       <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                           <option defaultValue="">Click để chọn</option>
                                           <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                           <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                           <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                           <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                       </select>
                                   </div>
                                   <div className="col-sm">
                                       <div className="form-group">
                                           <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                           <input type="date" className="form-control"
                                               id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                       </div>
                                   </div>
                                   <div className="col-sm">
                                       <div className="form-group">
                                           <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                           <input type="date" className="form-control"
                                               id="exampleFormControlInput1" onChange={onChangeToDate} />
                                       </div>
                                   </div>
                               </div>
                               <h6>
                                   <button type="button" className="btn btn-primary" onClick={Submit}>
                                       <SearchIcon />
                                   </button>
                               </h6>
                           </div>
                           :
                           <div></div>
                       }
                       <div className="table-container">
                           <table id="emp" className="table-lg" >
                               <thead>
                                   <tr id="titles" key="a">
                                       <th rowSpan="1">STT</th>
                                       <th colSpan="1">Chi nhánh</th>
                                       <th colSpan="1">Thông tin người nhập</th>
                                       <th colSpan="7">Thông tin khách hàng</th>
                                       <th colSpan="4">Thông tin xe</th>
                                       <th colSpan="4">Thông tin thêm</th>
                                       <th colSpan="1">Chức năng</th>
                                   </tr>
                                   <tr>
                                       <th>#</th>
                                       <th>
                                          
                                       </th>
                                       <th>Người đi thực tế</th>
                                       <th>Tên khách hàng</th>
                                       <th>Số điện thoại khách hàng</th>
                                       <th>Loại khách hàng</th>
                                       <th>Khách hàng thuộc khu vực</th>
                                       <th>Ý kiến khách hàng</th>
                                       <th>Phương thức liên lạc</th>
                                       <th>Giai đoạn</th>
                                       <th>Model xe</th>
                                       <th>Loại xe</th>
                                       <th>Số lượng</th>
                                       <th>Màu xe</th>
                                       <th>Ngày đi thực tế</th>
                                       <th>Ngày tạo form</th>
                                       <th>Ngày cập nhật gần nhất</th>
                                       <th>Ghi chú</th>
                                       <th>Cập nhật</th>
                                   </tr>
                               </thead>
                               <tbody >
                                   {!!yearResult && yearResult.map((form, index) => (
                                       <tr className="content" key={form.id}>
                                           <td>{index + 1}</td>
                                           <td>{form.employee.split('.')[0]}</td>
                                           <td>{form.employee_field}</td>
                                           <td>{form.customer}</td>
                                           <td>{form.customer_number}</td>
                                           <td>{form.customer_type}</td>
                                           <td>{form.customer_area}</td>
                                           <td>{form.customer_opinion}</td>
                                           <td>{form.customer_communication}</td>
                                           <td>{form.status}</td>
                                           <td>{form.model}</td>
                                           <td>{form.type}</td>
                                           <td>{form.quantity}</td>
                                           <td>{form.color}</td>
                                           <td>{form.date}</td>
                                           <td>{form.createdAt.substring(0, 10)}</td>
                                           <td>{form.updatedAt.substring(0, 10)}</td>
                                           <td>{form.note}</td>
                                           <td>
                                               <a className="btn btn-warning btn-sm" href={`/demands/update/${form.id}`} role="button">Cập nhật</a>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
           </div>
           :
           <div>{content}</div>
            }
        </div>
    </>
    )
}