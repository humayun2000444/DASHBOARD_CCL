import React, { useEffect, useRef } from "react";
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
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import Pagination from "../../services/Pagination/Pagination.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { useState } from "react";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import remove from "../../../helpers/remove.js";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import Loader from "../Search/Loader/Loader.js";
import { userTypes } from "../../../constants/userTypeConstant.js";

const ConsultantByConsultant = () => {
  const { id } = useParams();

  const [consultantList, setConsultantList] = useState([]);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [delData, setDelData] = useState({});

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [checkBranch, setCheckBranch] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkConsType, setCheckConsType] = useState(true);
  const [checkDate, setCheckDate] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkStd, setCheckStd] = useState(true);
  const [checkAppli, setCheckAppli] = useState(true);
  const [checkAsso, setCheckAsso] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);

  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");

  // useEffect(() => {
  //   if (id == undefined) {
  //     get(
  //       `Consultant/GetAssociate?page=${currentPage}&pageSize=${dataPerPage}&id=${referenceId}`
  //     ).then((res) => {

  //       setConsultantList(res?.models);
  //       setEntity(res?.totalEntity);
  //       setSerialNum(res?.firstSerialNumber);

  //       setLoading(false);
  //       setPageLoad(false);
  //     });
  //   } else {
  //     get(
  //       `Consultant/GetAssociate?page=${currentPage}&pageSize=${dataPerPage}&id=${id}`
  //     ).then((res) => {

  //       setConsultantList(res?.models);
  //       setEntity(res?.totalEntity);
  //       setSerialNum(res?.firstSerialNumber);

  //       setLoading(false);
  //       setPageLoad(false);
  //     });
  //   }
  // }, [currentPage, dataPerPage, callApi, loading, success]);

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (p) => {
    setDelData(p);

    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setProgress(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      //
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  // redirect to dashboard
  const backToDashboard = () => {
    if (id == undefined) {
      history.push("/");
    } else {
      history.push("/consultantList");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(consultantList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleEdit = (data) => {
    history.push(`/associateInformation/${data?.id}`);
  };

  const componentRef = useRef();

  const handleView = (consultantId) => {
    history.push(`/associateProfile/${consultantId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
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
  const handleCheckedPass = (e) => {
    setCheckPass(e.target.checked);
  };
  const handleCheckedBranch = (e) => {
    setCheckBranch(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedConsType = (e) => {
    setCheckConsType(e.target.checked);
  };
  const handleCheckedDate = (e) => {
    setCheckDate(e.target.checked);
  };
  const handleCheckedSts = (e) => {
    setCheckSts(e.target.checked);
  };
  const handleCheckedStd = (e) => {
    setCheckStd(e.target.checked);
  };
  const handleCheckedAppli = (e) => {
    setCheckAppli(e.target.checked);
  };
  const handleCheckedAsso = (e) => {
    setCheckAsso(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  const handleAddAssociate = () => {
    history.push("/addAssociate");
  };

  return (
    <div>
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Associates</h3>
              <div className="page-header-back-to-home">
                {id == undefined ? (
                  <span onClick={backToDashboard} className="text-white">
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to
                    Dashboard
                  </span>
                ) : (
                  <span onClick={backToDashboard} className="text-white">
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to
                    Consultant List
                  </span>
                )}
              </div>
            </CardHeader>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  {userTypeId == userTypes.Consultant ? (
                    <>
                      {permissions?.includes(
                        permissionList?.Add_New_Associate
                      ) ? (
                        <ButtonForFunction
                          func={handleAddAssociate}
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Add Associate"}
                          permission={6}
                        />
                      ) : null}
                    </>
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

                    <div className="mr-2">
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

                    <div className="mr-2">
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

                              {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

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
                              <p className="">Name</p>
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
                              <p className="">Phone</p>
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

                          {/* <div className="d-flex justify-content-between">
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
                      </div> */}

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Branch</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedBranch(e);
                                  }}
                                  defaultChecked={checkBranch}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Parent</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedCons(e);
                                  }}
                                  defaultChecked={checkCons}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Type</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedConsType(e);
                                  }}
                                  defaultChecked={checkConsType}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Started</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedDate(e);
                                  }}
                                  defaultChecked={checkDate}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Status</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedSts(e);
                                  }}
                                  defaultChecked={checkSts}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Student</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedStd(e);
                                  }}
                                  defaultChecked={checkStd}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Applications</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedAppli(e);
                                  }}
                                  defaultChecked={checkAppli}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Associates</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedAsso(e);
                                  }}
                                  defaultChecked={checkAsso}
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

                    {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
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
                </div> */}
                  </div>
                </Col>
              </Row>

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive mb-2" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {/* <th>SL/NO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Password</th>
                    <th>Branch</th>
                    <th>Parent</th>
                    <th>Type</th>
                    <th>Started</th>
                    <th>Status</th>
                    <th>Student</th>
                    <th>Application</th>
                    <th>Associates</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th> */}

                        {checkSlNo ? <th>SL/NO</th> : null}
                        {checkName ? <th>Name</th> : null}
                        {checkEmail ? <th>Email</th> : null}
                        {checkPhn ? <th>Phone</th> : null}
                        {/* {
                    permissions?.includes(permissionList.ChangePassword) ?
                    <>
                     {checkPass ? <th>Password</th> : null}
                    </>
                    : null
                   } */}
                        {checkBranch ? <th>Branch</th> : null}
                        {checkCons ? <th>Parent</th> : null}
                        {checkConsType ? <th>Type</th> : null}
                        {checkDate ? <th>Started</th> : null}
                        {permissions?.includes(
                          permissionList.Change_Status_Student
                        ) ? (
                          <>{checkSts ? <th>Status</th> : null}</>
                        ) : null}
                        {permissions?.includes(
                          permissionList.View_Student_consultant_List
                        ) ? (
                          <>{checkStd ? <th>Student</th> : null}</>
                        ) : null}
                        {checkAppli ? <th>Applications</th> : null}
                        {id == undefined ? null : (
                          <>{checkAsso ? <th>Associates</th> : null}</>
                        )}
                        {checkAction ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {consultantList?.map((consultant, i) => (
                        <tr
                          key={consultant?.id}
                          style={{ textAlign: "center" }}
                        >
                          {checkSlNo ? (
                            <th scope="row">{serialNum + i}</th>
                          ) : null}
                          {checkName ? (
                            <td style={{ width: "10px" }}>
                              {consultant?.firstName} {consultant?.lastName}
                            </td>
                          ) : null}
                          {checkEmail ? <td>{consultant?.email}</td> : null}
                          {checkPhn ? <td>{consultant?.phoneNumber}</td> : null}
                          {/* {
                        permissions?.includes(permissionList.ChangePassword) ? 
                        <>
                        {checkPass ? (
                        <td>
                          <Link to={`/associates/${id}`}>Change</Link>
                        </td>
                      ) : null}
                        </>
                        :
                        null
                      } */}
                          {checkBranch ? (
                            <td>{consultant?.branch?.name}</td>
                          ) : null}
                          {checkCons ? (
                            <td>{consultant?.parentConsultantName}</td>
                          ) : null}
                          {checkConsType ? (
                            <td>{consultant?.consultantType?.name}</td>
                          ) : null}
                          {checkDate ? (
                            <td>{handleDate(consultant?.createdOn)}</td>
                          ) : null}
                          {permissions?.includes(
                            permissionList.Change_Status_Student
                          ) ? (
                            <>
                              {checkSts ? (
                                <td>{consultant?.accountStatus?.statusName}</td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Student_consultant_List
                          ) ? (
                            <>
                              {checkStd ? (
                                <td>
                                  <span
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={`/studentByConsultant/${consultant?.id}`}
                                    >
                                      {consultant?.studentCount}
                                    </Link>
                                  </span>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Application_List
                          ) ? (
                            <>
                              {checkAppli ? (
                                <td>
                                  {consultant?.applicationCount > 0 ? (
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/applicationsFromConsultant/${consultant?.id}`
                                        );
                                      }}
                                      className="badge badge-primary"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {consultant?.applicationCount}
                                    </span>
                                  ) : (
                                    <span className="badge badge-primary">
                                      {consultant?.applicationCount}
                                    </span>
                                  )}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Associate_List
                          ) ? (
                            <>
                              {id == undefined ? null : (
                                <>
                                  {checkAsso ? (
                                    <td>
                                      {" "}
                                      <span
                                        className="badge badge-warning"
                                        style={{
                                          cursor: "pointer",
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Link
                                          style={{ textDecoration: "none" }}
                                          to={`/associates/${consultant?.id}`}
                                        >
                                          {consultant?.childConsultantCount}
                                        </Link>
                                      </span>{" "}
                                    </td>
                                  ) : null}
                                </>
                              )}
                            </>
                          ) : null}

                          {checkAction ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {/* <LinkButton
                          url={`/consultantProfile/${consultant?.id}`}
                          color={"primary"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-eye"></i>}
                          permission={6}
                        /> */}
                                {permissions?.includes(
                                  permissionList?.View_Associate_info
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleView(consultant?.id)}
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {/* {permissions?.includes(
                                  permissionList.Update_Associate_info
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleEdit(consultant)}
                                    color={"warning"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-edit"></i>}
                                    permission={6}
                                  />
                                ) : null} */}

                                {/* {permissions?.includes(
                                  permissionList.Delete_Associate
                                ) ? (
                                  <>
                                    {consultant?.id !== 1 ? (
                                      <ButtonForFunction
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        func={() => toggleDanger(consultant)}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                                    null}
                                  </>
                                ) : null} */}
                              </ButtonGroup>
                              <Modal
                                isOpen={deleteModal}
                                toggle={() => setDeleteModal(!deleteModal)}
                                className="uapp-modal"
                              >
                                <ModalBody>
                                  <p>
                                    Are You Sure to Delete this ? Once Deleted
                                    it can't be Undone!
                                  </p>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={handleDeleteData}
                                  >
                                    {progress ? <ButtonLoader /> : "YES"}
                                  </Button>
                                  <Button onClick={() => setDeleteModal(false)}>
                                    NO
                                  </Button>
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
        </>
      )}
    </div>
  );
};

export default ConsultantByConsultant;
