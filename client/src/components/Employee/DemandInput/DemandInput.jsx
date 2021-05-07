import React, { useState, useEffect, useRef, useCallback } from 'react'
import DemandService from "../../../services/demand.service"
import CustomerService from "../../../services/customer.service"
import CustomerTypeService from "../../../services/customer_type.service"
import ContactTypeService from "../../../services/contact_type.service"
import AuthService from "../../../services/auth.service"
import CarModelService from "../../../services/car_model.service"
import CarTypeService from "../../../services/car_type.service"
import ColorService from "../../../services/color.services"
import DemandStatusService from "../../../services/demand_status.service"
import * as MaterialUIIcons from '@material-ui/icons/'

import CheckButton from "react-validation/build/button"
import { Alert, Button } from "react-bootstrap"
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Select from "react-validation/build/select"
import { FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

import UserService from "../../../services/user.service"

export default function EmployeeDemandInput(props) {
    const [demand_date, setDemandDate] = useState("")

    const [demand_employee, setDemandEmployee] = useState("")

    const [demand_quantity, setDemandQuantity] = useState(1)

    const [demand_opinion, setDemand_Opinion] = useState(null)
    const [demand_meeting, setDemandMeeting] = useState(null)
    const [demand_note, setDemandNote] = useState(null)

    const [message, setMessage] = useState("")

    const [demand_status_name, setDemandStatusName] = useState("")
    const [demand_statuses, setDemandStatuses] = useState("")
    const [demand_statusId, setDemandStatusId] = useState(0)

    const [customer_type_name, setCustomerTypeName] = useState("")
    const [customer_types, setCustomerTypes] = useState("")
    const [customer_typeId, setCustomerTypeId] = useState(0)

    const [contact_type_name, setContactTypeName] = useState("")
    const [contact_types, setContactTypes] = useState("")
    const [contact_typeId, setContactTypeId] = useState(0)

    const [car_model_name, setCarModelName] = useState("")
    const [car_models, setCarModels] = useState("")
    const [car_modelId, setCarModelId] = useState(0)

    const [car_type_name, setCarTypeName] = useState("")
    const [car_types, setCarTypes] = useState("")
    const [car_typeId, setCarTypeId] = useState(0)

    const [color_name, setColorName] = useState("")
    const [colorId, setColorId] = useState(0)
    const [colors, setColors] = useState("")

    const [customer_name, setCustomerName] = useState("")
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState(0)
    const [customerResult, setCustomerResult] = useState()

    const [branch_name, setBranchName] = useState("")

    const [business_types, setBusinessTypes] = useState([])
    const [business_type_name, setBusinessTypeName] = useState("")

    const [provinces, setProvinces] = useState([])
    const [province_name, setProvinceName] = useState("")

    const [arr, setArr] = useState([])
    const [arr2, setArr2] = useState([])

    const currentUser = AuthService.getCurrentUser()
    const userId = parseInt(currentUser.id)
    const user_name = currentUser.name
    const [successful, setSuccessful] = useState(false)

    const form = useRef()
    const checkBtn = useRef()

    const addToList = () => {
        arr.push({ demand_quantity, demand_date, demand_note, demand_employee, userId, customerId, customer_typeId, car_modelId, car_typeId, colorId, demand_statusId, contact_typeId, demand_meeting, demand_opinion })
        arr2.push({ demand_quantity, demand_date, demand_note, demand_employee, user_name, customer_name, customer_type_name, car_model_name, car_type_name, color_name, demand_status_name, contact_type_name, demand_meeting, demand_opinion })
        setArr((prevArr) => ([...prevArr]))
        setArr2((prevArr) => ([...prevArr]))
    }

    const removeFromList = () => {
        arr.pop()
        setArr((prevArr) => ([...prevArr]))
        arr2.pop()
        setArr2((prevArr) => ([...prevArr]))
    }

    const onChangeQuantity = (e) => {
        const demand_quantity = e.target.value
        setDemandQuantity(demand_quantity)
    }

    const onChangeDemandEmployee = (e) => {
        const demand_employee = e.target.value
        setDemandEmployee(demand_employee)
    }

    const onChangeColor = (e) => {
        const colorId = e.target.value
        setColorId(colorId)
        const color_name = e.target.options[e.target.selectedIndex].text
        setColorName(color_name)
    }

    const onChangeDate = (e) => {
        const demand_date = e.target.value
        setDemandDate(demand_date)
    }

    const onChangeNote = (e) => {
        const demand_note = e.target.value
        setDemandNote(demand_note)
    }

    const onChangeDemandStatusId = (e) => {
        const demand_statusId = e.target.value
        setDemandStatusId(demand_statusId)
        const demand_status_name = e.target.options[e.target.selectedIndex].text
        setDemandStatusName(demand_status_name)
    }

    const onChangeCustomerType = (e) => {
        const customer_typeId = e.target.value
        setCustomerTypeId(customer_typeId)
        const customer_type_name = e.target.options[e.target.selectedIndex].text
        setCustomerTypeName(customer_type_name)
    }

    const onChangeCarType = (e) => {
        const car_typeId = e.target.value
        setCarTypeId(car_typeId)
        const car_type_name = e.target.options[e.target.selectedIndex].text
        setCarTypeName(car_type_name)
    }

    const onChangeContactType = (e) => {
        const contact_typeId = e.target.value
        setContactTypeId(contact_typeId)
        const contact_type_name = e.target.options[e.target.selectedIndex].text
        setContactTypeName(contact_type_name)
    }

    const onChangeCarModel = (e) => {
        const car_modelId = e.target.value
        setCarModelId(car_modelId)
        const car_model_name = e.target.options[e.target.selectedIndex].text
        setCarModelName(car_model_name)
    }

    const onChangeDemand_Opinion = (e) => {
        const demand_opinion = e.target.value
        setDemand_Opinion(demand_opinion)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage("")
        setSuccessful(false)
        form.current.validateAll()
        if (checkBtn.current.context._errors.length === 0) {
            DemandService.create_demand(
                arr,
            ).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()

                    setMessage(resMessage)
                    setSuccessful(false)
                }
            )
        }
    }

    const FetchCustomerTypes = () => {
        CustomerTypeService.get_customer_types().then((response) => {
            setCustomerTypes(response.data)
            setCustomerTypeId(response.data[0].customer_type_id)
            setCustomerTypeName(response.data[0].customer_type_name)
        })
    }

    const FetchContactTypes = () => {
        ContactTypeService.get_contact_types().then((response) => {
            setContactTypes(response.data)
            setContactTypeId(response.data[0].contact_type_id)
            setContactTypeName(response.data[0].contact_type_name)
        })
    }

    const FetchCarModels = () => {
        CarModelService.get_car_models().then((response) => {
            setCarModels(response.data)
            setCarModelId(response.data[0].car_model_id)
            setCarModelName(response.data[0].car_model_name)
        })
    }

    const FetchCarTypes = () => {
        CarTypeService.get_car_types().then((response) => {
            setCarTypes(response.data)
            setCarTypeId(response.data[0].car_type_id)
            setCarTypeName(response.data[0].car_type_name)
        })
    }

    const FetchColors = () => {
        ColorService.get_colors().then((response) => {
            setColors(response.data)
            setColorId(response.data[0].color_id)
            setColorName(response.data[0].color_name)
        })
    }

    const FetchDemandStatuses = () => {
        DemandStatusService.get_demand_statuses().then((response) => {
            setDemandStatuses(response.data)
            setDemandStatusId(response.data[0].demand_status_id)
            setDemandStatusName(response.data[0].demand_status_name)
        })
    }

    const FetchBranches = () => {
        const userid = currentUser.id
        UserService.get_specific_user(
            userid
        ).then((response) => {
            setBranchName(response.data[0].branch_name)
        })
    }

    const FetchCustomers = () => {
        const username = currentUser.username
        CustomerService.get_customer_by_branch(
            username, branch_name, customer_name, province_name, business_type_name
        ).then((response) => {
            setCustomers(response.data)
        })
    }

    const Autofill = useCallback(() => {
        CustomerService.get_customer_by_name(
            customer_name
        ).then((response) => {
            setCustomerResult(response.data)
            response.data.forEach(value => {
                setCustomerId(value.id)
            })
        })
    }, [customer_name])

    useEffect(() => {
        FetchBranches()
        FetchCarModels()
        FetchCarTypes()
        FetchColors()
        FetchDemandStatuses()
        FetchCustomerTypes()
        FetchContactTypes()
    }, [])

    useEffect(() => {
        FetchCustomers()
        Autofill()
    }, [branch_name, customer_name, province_name, business_type_name, Autofill])


    return (
        <div>
            <div className="text-left">
                <h4 className="font-weight-bold text-secondary">TẠO NHU CẦU MỚI</h4>
            </div>
            <Form onSubmit={handleSubmit} ref={form}>
                {!successful && (
                    <div>
                        <div className="text-left">
                            <div>
                                <h6><strong>Thông tin khách hàng </strong></h6>
                                <div className="row ">
                                    <div className="col-sm">
                                        Tên khách hàng :
                                        <Autocomplete
                                            style={{ background: "white" }}
                                            size="small"
                                            disableClearable
                                            value={customer_name}
                                            onChange={(event, newValue) => {
                                                setCustomerName(newValue)
                                            }}
                                            options={customers.map((option) => option.customer_name)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                        <FormHelperText className="text-danger">Vui lòng không để trống tên khách hàng, ô có chức năng tự động điền khi nhập tên</FormHelperText>
                                    </div>
                                    <div className="col-sm">
                                        Giai đoạn :
                                        <Select className="form-control" id="exampleFormControlSelect4" onChange={onChangeDemandStatusId}>
                                            {!!demand_statuses && demand_statuses.map(demand_status => (
                                                <option key={demand_status.demand_status_id} value={demand_status.demand_status_id} >{demand_status.demand_status_name}</option>
                                            ))}
                                        </Select>
                                        <FormHelperText className="text-danger">Vui lòng chú ý khi chọn giai đoạn của nhu cầu</FormHelperText>
                                    </div>
                                    <div className="col-sm">
                                        Loại khách hàng :
                                        <Select className="form-control" id="exampleFormControlSelect2" onChange={onChangeCustomerType}>
                                            {!!customer_types && customer_types.map(customer_type => (
                                                <option key={customer_type.customer_type_id} value={customer_type.customer_type_id} >{customer_type.customer_type_name}</option>
                                            ))}
                                        </Select>
                                        <FormHelperText className="text-danger">Khách hàng DỰ KIẾN là khách hàng hiện tại chưa có nhu cầu nhưng có khả năng trong tương lại</FormHelperText>
                                    </div>
                                    <div className="col-sm">
                                        Phương thức liên lạc :
                                        <Select className="form-control" id="exampleFormControlSelect3" onChange={onChangeContactType}>
                                            {!!contact_types && contact_types.map(contact_type => (
                                                <option key={contact_type.contact_type_id} value={contact_type.contact_type_id} >{contact_type.contact_type_name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="row ">
                                    {customer_typeId == 3 ?
                                        <div className="col-sm">
                                            Ý kiến khách hàng
                                            <textarea type="demand_opinion"
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                onChange={onChangeDemand_Opinion}></textarea>
                                            <FormHelperText className="text-danger">Vui lòng nhập ý kiến khách hàng nếu khách đã sử dụng sản phẩm Kamaz</FormHelperText>
                                        </div>
                                        : <div></div>
                                    }
                                    {contact_typeId == 3 ?
                                        <div className="col-sm">
                                            Địa điểm giao dịch
                                            <textarea type="demand_meeting" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDemandMeeting(e.target.value)}></textarea>
                                            <FormHelperText className="text-danger">Vui lòng nhập địa điểm gặp gỡ khách hàng nếu gặp trực tiếp</FormHelperText>
                                        </div> :
                                        <div></div>
                                    }
                                    <div className="col-sm">
                                        Ghi chú:
                                        <textarea type="demand_note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChangeNote}></textarea>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div>
                                <h6><strong>Thông tin người nhập & ngày tháng</strong></h6>
                                <div className="row ">
                                    <div className="col-sm">
                                        Người nhập:
                                        <div className="form-control" style={{ background: "#e7e7e7" }}>{currentUser.username} - {currentUser.name}</div>
                                    </div>
                                    <div className="col-sm">
                                        Người gặp khách hàng:
                                        <Input
                                            type="demand_employee"
                                            className="form-control"
                                            name="demand_employee"
                                            value={demand_employee}
                                            onChange={onChangeDemandEmployee}
                                        />
                                        <FormHelperText className="text-danger">Vui lòng nhập đầy đủ họ tên người gặp khách hàng</FormHelperText>
                                    </div>
                                    <div className="col-sm">
                                        Ngày - {demand_status_name}:
                                        <Input
                                            type="date"
                                            className="form-control"
                                            name="demand_date"
                                            value={demand_date}
                                            onChange={onChangeDate}
                                        />
                                        <FormHelperText className="text-danger">Vui lòng chọn ngày đạt được giai đoạn {demand_status_name}</FormHelperText>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div>
                                <h6><strong>Thông tin xe</strong></h6>
                                <div className="row ">
                                    <div className="col-sm">
                                        Model xe:
                                        <Select className="form-control" id="exampleFormControlSelect5" onChange={onChangeCarModel}>
                                            {!!car_models && car_models.map(car_model => (
                                                <option key={car_model.car_model_id} value={car_model.car_model_id} >{car_model.car_model_name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-sm">
                                        Loại xe:
                                        <Select className="form-control" id="exampleFormControlSelect6" onChange={onChangeCarType}>
                                            {!!car_types && car_types.map(car_type => (
                                                <option key={car_type.car_type_id} value={car_type.car_type_id} >{car_type.car_type_name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-sm">
                                        Số lượng:
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="demand_quantity"
                                            value={demand_quantity}
                                            onChange={onChangeQuantity}
                                        />
                                        <FormHelperText className="text-danger">Vui lòng không để số âm hoặc bằng 0</FormHelperText>
                                    </div>
                                    <div className="col-sm">
                                        Màu xe:
                                        <Select className="form-control" id="exampleFormControlSelect1" onChange={onChangeColor}>
                                            {!!colors && colors.map(color => (
                                                <option key={color.color_id} value={color.color_id} >{color.color_name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="justify-content-start">
                                <button type="button" className="btn btn-sm btn-primary" onClick={addToList}>
                                    <MaterialUIIcons.Add />THÊM NHU CẦU VÀO DANH SÁCH
                                    </button>
                                <button type="button" className="btn btn-sm btn-danger" onClick={removeFromList}>
                                    <MaterialUIIcons.Remove /> BỚT NHU CẦU CUỐI DANH SÁCH
                                    </button>
                            </div>
                            <FormHelperText className="text-danger">Vui lòng chọn THÊM NHU CẦU VÀO DANH SÁCH sau khi điền xong thông tin, danh sách nhu cầu thực tế cần ít nhất 1 hàng để gửi</FormHelperText>
                            <br />
                            <div>
                                <h6><strong>Danh sách nhu cầu thực tế</strong></h6>
                                <div className="table-bordered">
                                    <TableContainer className="table-container" >
                                        <Table id="emp" stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Tên khách hàng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Giai đoạn
                                    </strong>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Loại khách hàng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Phương thức liên lạc
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Ý kiến khách hàng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Địa điểm giao dịch
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Ghi chú
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Người nhập
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Người gặp khách hàng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Ngày gặp khách hàng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Model xe
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Loại xe
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Số lượng
                                    </strong>
                                                    </TableCell>
                                                    <TableCell

                                                        align="center"
                                                        style={{ minWidth: "'auto'" }}
                                                    >
                                                        <strong className="text-primary">
                                                            Màu xe
                                    </strong>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {arr2.map((result, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.customer_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_status_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.customer_type_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.contact_type_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_opinion}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_meeting}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_note}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.user_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_employee}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_date}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.car_model_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.car_type_name}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.demand_quantity}
                                                            </strong>
                                                        </TableCell>
                                                        <TableCell

                                                            align="center"
                                                            style={{ minWidth: "'auto'" }}
                                                        >
                                                            <strong className="text-dark">
                                                                {result.color_name}
                                                            </strong>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <br />
                            <div>
                                <Button className="btn-sm" variant="warning" type="submit" onClick={handleSubmit}>
                                    GỬI FORM
                            </Button>
                            </div>
                        </div>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div
                            className={successful ? "alert alert-success" : "alert alert-danger"}
                            role="alert"
                        >
                            <Alert key={message.message}>
                                <Alert.Heading>{message.heading}</Alert.Heading>
                                <p>
                                    {message.message}
                                </p>
                            </Alert>
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div >
    )
}