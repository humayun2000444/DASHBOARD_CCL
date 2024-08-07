import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../../Pagination/Pagination.jsx";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";

import get from "../../../../helpers/get.js";
import remove from "../../../../helpers/remove.js";
import { Link } from "react-router-dom";

import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../../Components/ButtonForFunction.js";
import LinkButton from "../../Components/LinkButton.js";
import { permissionList } from "../../../../constants/AuthorizationConstant.js";
import loader from "../../../../assets/img/load.gif";
import { userTypes } from "../../../../constants/userTypeConstant.js";
import put from "../../../../helpers/put.js";
import ButtonLoader from "../../Components/ButtonLoader.js";

const EmployeeList = (props) => {
  const { type } = useParams();
  const history = useHistory();
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeName, setEmployeeName] = useState("Select Staff Type");
  const [employeeId, setEmployeeId] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const userTypeId = localStorage.getItem("userType");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const employeeTypeList = props.employeeTypeList[0];
  const location = useLocation();
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);

  const [success, setSuccess] = useState(false);

  const [empList, setEmpList] = useState([]);
  const [empLabel, setEmpLabel] = useState("Select Staff Type");
  const [empValue, setEmpValue] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkId, setCheckId] = useState(true);
  const [checkSType, setCheckSType] = useState(true);
  const [checkNtn, setCheckNtn] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [checkPass, setCheckPass] = useState(true);
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [cPass, setCPass] = useState("");
  const [pass, setPass] = useState("");
  const [progress, setProgress] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // useEffect(()=>{
  //   if(location.id != undefined){
  //     localStorage.setItem('locationId', location.id);
  //     setEmployeeName(location.name);
  //   }
  // },[])

  // const empId
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const employeeTypeName = employeeTypeList?.map((empt) => ({
    label: empt.name,
    value: empt.id,
  }));

  // useEffect(() => {

  //    type?
  //    get(
  //     `Employee/Index?page=${currentPage}&pagesize=${dataPerPage}&employeetypeid=${type}&searchstring=${searchStr}`
  //   ).then((action) => {
  //     setEmployeeList(action.models);

  //     setLoading(false);
  //     setEntity(action.totalEntity);
  //     setSerialNum(action.firstSerialNumber);
  //     setLoading(false);
  //   })
  //   :
  //   get(
  //     `Employee/Index?page=${currentPage}&pagesize=${dataPerPage}&employeetypeid=${empValue}&searchstring=${searchStr}`
  //   ).then((action) => {
  //     setEmployeeList(action.models);

  //     setLoading(false);
  //     setEntity(action.totalEntity);
  //     setSerialNum(action.firstSerialNumber);
  //     setLoading(false);
  //   });

  //   type ?
  //   get(`EmployeeTypeDD/Index`).then((res) => {
  //     setEmpList(res);
  //     const result = res?.find (ans => ans?.id == type);
  //     setLoading(false);
  //     setEmpLabel(result?.name);

  //   })
  //   :
  //   get(`EmployeeTypeDD/Index`).then((res) => {
  //     setEmpList(res);
  //     setLoading(false);
  //   });

  // }, [
  //   callApi,
  //   currentPage,
  //   dataPerPage,
  //   empValue,
  //   searchStr,
  //   // entity,
  //   success,
  // ]);

  const empOptiopns = empList?.map((emp) => ({
    label: emp?.name,
    value: emp?.id,
  }));

  const selectEmployeeType = (label, value) => {
    setEmpLabel(label);
    setEmpValue(value);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (data) => {
    setData(data);

    setDeleteModal(true);
  };

  const handlePass = (data) => {
    setPassData(data);

    setPassModal(true);
  };

  const handleDeleteStaff = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Employee/Delete/${data?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        // autoDismiss: true,
      });

      setDeleteModal(false);
      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  //  on reset
  const handleReset = () => {
    setEmpLabel("Select Staff Type");
    setEmpValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add staff handler
  const handleAddStaff = () => {
    history.push("/addStaffGeneralInfo");
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // employee click handler
  const handleEmpClick = (id) => {
    history.push({
      pathname: `/staffProfile/${id}`,
    });
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(employeeList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef(employeeList);

  // const handleRedirectProfile = (id) => {
  //   localStorage.setItem('empId', id);
  //   history.push('/employeeProfile');
  // }

  const redirecttoStaffGeneralInfo = (empId) => {
    history.push(`/staffGeneralInfo/${empId}`);
  };

  const redirectToStaffProfile = (empId) => {
    history.push(`/staffProfile/${empId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedId = (e) => {
    setCheckId(e.target.checked);
  };
  const handleCheckedSType = (e) => {
    setCheckSType(e.target.checked);
  };
  const handleCheckedNtn = (e) => {
    setCheckNtn(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedEmail = (e) => {
    setCheckEmail(e.target.checked);
  };
  const handleCheckedPhn = (e) => {
    setCheckPhn(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };
  const handleCheckedPass = (e) => {
    setCheckPass(e.target.checked);
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setButtonStatus(true);
      put(`Password/ChangePasswordForEmployee`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <img className="img-fluid" src={loader} alt="uapp_loader" />
        </div>
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Staff List</h3>
              <div className="page-header-back-to-home">
                <span onClick={backToDashboard} className="text-white">
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              <Row>
                <Col className="uapp-mb" md="6" sm="12">
                  <Select
                    options={empOptiopns}
                    value={{ label: empLabel, value: empValue }}
                    onChange={(opt) => selectEmployeeType(opt.label, opt.value)}
                    name="employeeType"
                    id="employeeType"
                    isDisabled={type ? true : false}
                  />
                </Col>

                <Col
                  className="uapp-mb"
                  md="6"
                  sm="12"
                  style={{ display: "flex" }}
                >
                  <Input
                    style={{ height: "2.7rem" }}
                    type="text"
                    name="search"
                    value={searchStr}
                    id="search"
                    placeholder="Id, Name, Email"
                    onChange={(e) => setSearchStr(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <div
                      className="mt-1 mx-1 d-flex btn-clear"
                      onClick={handleReset}
                    >
                      {/* <Icon.X  className='text-danger' />*/}
                      <span className="text-danger">
                        <i className="fa fa-times"></i> Clear
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col
                  lg="5"
                  md="5"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(permissionList?.Add_New_Staff) ? (
                    <ButtonForFunction
                      func={handleAddStaff}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add Staff"}
                    />
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}

                    <div className="mr-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div>
                          <Select
                            options={dataSizeName}
                            value={{ label: dataPerPage, value: dataPerPage }}
                            onChange={(opt) => selectDataSize(opt.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mr-3">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen}
                        toggle={toggle}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-print fs-7"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-4">
                          <div className="d-flex justify-content-around align-items-center mt-2">
                            <div className="cursor-pointer">
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}
                              <ReactTableConvertToXl
                                id="test-table-xls-button"
                                table="table-to-xls"
                                filename="tablexls"
                                sheet="tablexls"
                                icon={<i className="fas fa-file-excel"></i>}
                              />
                            </div>
                            <div className="cursor-pointer">
                              <ReactToPrint
                                trigger={() => (
                                  <p>
                                    <i className="fas fa-file-pdf"></i>
                                  </p>
                                )}
                                content={() => componentRef.current}
                              />
                            </div>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide starts here */}

                    <div className="">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen1}
                        toggle={toggle1}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-bars"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-1">
                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">SL/NO</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id=""
                                  name="isAcceptHome"
                                  onChange={(e) => {
                                    handleCheckedSLNO(e);
                                  }}
                                  defaultChecked={checkSlNo}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">UAPP Id</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedId(e);
                                  }}
                                  defaultChecked={checkId}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Staff Type</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedSType(e);
                                  }}
                                  defaultChecked={checkSType}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Password</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPass(e);
                                  }}
                                  defaultChecked={checkPass}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Nationality</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedNtn(e);
                                  }}
                                  defaultChecked={checkNtn}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Full Name</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedName(e);
                                  }}
                                  defaultChecked={checkName}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Email</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedEmail(e);
                                  }}
                                  defaultChecked={checkEmail}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Phone No</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPhn(e);
                                  }}
                                  defaultChecked={checkPhn}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Action</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedAction(e);
                                  }}
                                  defaultChecked={checkAction}
                                />
                              </FormGroup>
                            </Col>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}
                  </div>
                </Col>
              </Row>

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {checkSlNo ? <th>SL/NO</th> : null}
                        {checkId ? <th>UAPP Id</th> : null}
                        {checkSType ? <th>Staff Type</th> : null}
                        {permissions?.includes(
                          permissionList.ChangePassword
                        ) ? (
                          <>
                            {" "}
                            {userTypeId == userTypes?.SystemAdmin ||
                            userTypeId == userTypes?.Admin ? (
                              <>{checkPass ? <th>Password</th> : null}</>
                            ) : null}
                          </>
                        ) : null}
                        {checkNtn ? <th>Nationality</th> : null}
                        {checkName ? <th>Full Name</th> : null}
                        {checkEmail ? <th>Email</th> : null}
                        {checkPhn ? <th>Phone No</th> : null}
                        {checkAction ? (
                          <th className="text-center">Action</th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList?.map((emp, i) => (
                        <tr key={emp.id} style={{ textAlign: "center" }}>
                          {checkSlNo ? (
                            <th scope="row">{serialNum + i}</th>
                          ) : null}
                          {checkId ? (
                            <td
                              className="cursor-pointer hyperlink-hover"
                              onClick={() => handleEmpClick(emp.id)}
                            >
                              <span>{emp?.employeeViewId}</span>
                            </td>
                          ) : null}
                          {checkSType ? (
                            <td>{emp?.employeeType?.name}</td>
                          ) : null}
                          {permissions?.includes(
                            permissionList.ChangePassword
                          ) ? (
                            <>
                              {" "}
                              {userTypeId == userTypes?.SystemAdmin ||
                              userTypeId == userTypes?.Admin ? (
                                <>
                                  {checkPass ? (
                                    <td>
                                      <Link
                                        to="/staffList"
                                        onClick={() => handlePass(emp)}
                                      >
                                        Change
                                      </Link>
                                      <Modal
                                        isOpen={passModal}
                                        toggle={() => handleToggle}
                                        className="uapp-modal2"
                                      >
                                        <ModalHeader>
                                          <div className="text-center mt-3">
                                            <span>
                                              Change password for{" "}
                                              {passData?.firstName}{" "}
                                              {passData?.lastName}{" "}
                                            </span>
                                          </div>
                                        </ModalHeader>
                                        <ModalBody>
                                          <form
                                            onSubmit={submitModalForm}
                                            className="mt-3"
                                          >
                                            <FormGroup
                                              row
                                              className="has-icon-left position-relative"
                                            >
                                              <Col md="4">
                                                <span>
                                                  Password{" "}
                                                  <span className="text-danger">
                                                    *
                                                  </span>{" "}
                                                </span>
                                              </Col>
                                              <Col md="8">
                                                <Input
                                                  type="password"
                                                  onBlur={passValidate}
                                                  onChange={() => setError("")}
                                                />
                                                <span className="text-danger">
                                                  {error}
                                                </span>
                                              </Col>
                                            </FormGroup>

                                            <FormGroup
                                              row
                                              className="has-icon-left position-relative"
                                            >
                                              <Col md="4">
                                                <span>
                                                  Confirm Password{" "}
                                                  <span className="text-danger">
                                                    *
                                                  </span>{" "}
                                                </span>
                                              </Col>
                                              <Col md="8">
                                                <Input
                                                  type="password"
                                                  onChange={verifyPass}
                                                  onBlur={confirmPassword}
                                                />

                                                <br />
                                                {
                                                  <span className="text-danger">
                                                    {passError}
                                                  </span>
                                                }
                                              </Col>
                                            </FormGroup>

                                            <FormGroup
                                              row
                                              className="has-icon-left position-relative"
                                            >
                                              <Col md="12">
                                                <div className="d-flex justify-content-between">
                                                  <Button
                                                    color="danger"
                                                    onClick={() =>
                                                      setPassModal(false)
                                                    }
                                                  >
                                                    Cancel
                                                  </Button>
                                                  <Button
                                                    color="primary"
                                                    type="submit"
                                                    disabled={buttonStatus}
                                                  >
                                                    Submit
                                                  </Button>
                                                </div>
                                              </Col>
                                            </FormGroup>
                                          </form>
                                        </ModalBody>
                                      </Modal>
                                    </td>
                                  ) : null}
                                </>
                              ) : null}
                            </>
                          ) : null}
                          {checkNtn ? <td>{emp?.nationality?.name}</td> : null}
                          {checkName ? (
                            <td
                              className="cursor-pointer hyperlink-hover"
                              onClick={() => handleEmpClick(emp.id)}
                            >
                              {" "}
                              <span>
                                {" "}
                                {emp?.firstName == null
                                  ? null
                                  : emp.firstName}{" "}
                                {emp?.lastName == null ? null : emp.lastName}{" "}
                              </span>{" "}
                            </td>
                          ) : null}
                          {checkEmail ? <td>{emp.email}</td> : null}
                          {checkPhn ? <td>{emp.phoneNumber}</td> : null}
                          {checkAction ? (
                            <td className="text-center">
                              <ButtonGroup variant="text">
                                {/* <Link to= {`/universityDetails`}> */}
                                {/* <Button onClick={()=> handleRedirectProfile(emp?.id)} color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button> */}

                                {/* <LinkButton
                            url={`staffProfile/${emp?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                          /> */}

                                {permissions?.includes(
                                  permissionList.View_Staff_info
                                ) ? (
                                  <ButtonForFunction
                                    func={() => redirectToStaffProfile(emp?.id)}
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                  />
                                ) : null}

                                {/* </Link>  */}
                                {/* <Link to={`/employeeGeneralInfo/${emp?.id}`}>
                          <Button  color="dark" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-edit"></i>{" "}
                          </Button>
                          </Link> */}

                                {/* <LinkButton
                            url={`/staffGeneralInfo/${emp?.id}`}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                          /> */}

                                {emp?.email == "accountmanager@uapp.uk" ||
                                emp?.email == "accounts@uapp.uk" ||
                                emp?.email == "compliance@uapp.uk" ||
                                emp?.email == "edit@uapp.uk" ||
                                emp?.email == "finance@uapp.uk" ? null : (
                                  <>
                                    {permissions.includes(
                                      permissionList?.Update_Staff_info
                                    ) ? (
                                      <ButtonForFunction
                                        func={() =>
                                          redirecttoStaffGeneralInfo(emp?.id)
                                        }
                                        color={"warning"}
                                        className={"mx-1 btn-sm"}
                                        icon={<i className="fas fa-edit"></i>}
                                      />
                                    ) : null}

                                    {/* <Button onClick={toggleDanger} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}

                                    {permissions?.includes(
                                      permissionList.Delete_Staff
                                    ) ? (
                                      <ButtonForFunction
                                        func={() => toggleDanger(emp)}
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        disable={buttonStatus}
                                      />
                                    ) : null}
                                  </>
                                )}
                              </ButtonGroup>

                              <Modal
                                isOpen={deleteModal}
                                toggle={closeDeleteModal}
                                className="uapp-modal"
                              >
                                <ModalBody>
                                  <p>
                                    Are You Sure to Delete this? Once Deleted it
                                    can't be Undone!
                                  </p>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={() => handleDeleteStaff(emp?.id)}
                                  >
                                    {progress ? <ButtonLoader /> : "Yes"}
                                  </Button>
                                  <Button onClick={closeDeleteModal}>NO</Button>
                                </ModalFooter>
                              </Modal>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(EmployeeList);
