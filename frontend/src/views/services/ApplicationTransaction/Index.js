import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  UncontrolledTooltip,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import Pagination from "../Pagination/Pagination";
import ButtonForFunction from "../Components/ButtonForFunction";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import { userTypes } from "../../../constants/userTypeConstant";
import Loader from "../Search/Loader/Loader";
import { permissionList } from "../../../constants/AuthorizationConstant";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  const { consultantId } = useParams();

  const [uapp, setUapp] = useState([]);
  const [uappLabel, setUappLabel] = useState("UAPP ID");
  const [uappValue, setUappValue] = useState(0);

  const [student, setStudent] = useState([]);
  const [studentLabel, setStudentLabel] = useState("Select Student");
  const [studentValue, setStudentValue] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [intake, setIntake] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);

  const [data, setData] = useState([]);

  const [serials, setSerials] = useState(true);
  const [ids, setIds] = useState(true);
  const [intakes, setIntakes] = useState(true);
  const [consultants, setConsultants] = useState(true);
  const [students, setStudents] = useState(true);
  const [universities, setUniversities] = useState(true);
  const [subjects, setSubjects] = useState(true);
  const [ranges, setRanges] = useState(true);
  const [amounts, setAmounts] = useState(true);
  const [statuses, setStatuses] = useState(true);
  const [dates, setDates] = useState(true);
  const [statuses2, setStatuses2] = useState(true);
  const [actions, setActions] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);

  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkId, setCheckId] = useState(true);
  const [checkIntake, setCheckIntake] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [checkUni, setCheckUni] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkSub, setCheckSub] = useState(true);
  const [checkIntakeRange, setCheckIntakeRange] = useState(true);
  const [checkAmount, setCheckAmount] = useState(true);
  const [checkStd, setCheckStd] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkTransDate, setCheckTransDate] = useState(true);
  const [checkStatus, setCheckStatus] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  // useEffect(() => {
  //   get(`ConsultantDD/index`).then((res) => {
  //     setConsultant(res);
  //     if(consultantId){
  //       const result = res?.find(ans => ans?.id == consultantId);
  //       setConsultantLabel(result?.name);
  //       setConsultantValue(result?.id);
  //     }
  //   });

  //   get(`StudentDD/Index`).then((res) => {
  //     setStudent(res);
  //   });

  //   get(`AccountIntake/index`).then((res) => {
  //     setIntake(res);
  //   });

  //   get(`UappIdDD/Index`).then((res) => {
  //     setUapp(res);
  //   });

  //   if(consultantId !== undefined){

  //     get(
  //       `ApplicationTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&uappid=${uappValue}&studentid=${studentValue}&consultantid=${consultantId}&intakeid=${intakeValue}`
  //     ).then((res) => {

  //       setData(res?.models);

  //       setEntity(res?.totalEntity);
  //       setLoading(false);
  //     });
  //   }
  //   else{
  //     get(
  //       `ApplicationTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&uappid=${uappValue}&studentid=${studentValue}&consultantid=${consultantValue}&intakeid=${intakeValue}`
  //     ).then((res) => {

  //       setData(res?.models);
  //       setEntity(res?.totalEntity);
  //       setLoading(false);
  //     });
  //   }
  // }, [
  //   currentPage,
  //   dataPerPage,
  //   callApi,
  //   uappValue,
  //   intakeValue,
  //   studentValue,
  //   consultantValue,
  // ]);

  const handleSerials = (e) => {
    setSerials(e.target.checked);
  };

  const handleIds = (e) => {
    setIds(e.target.checked);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const handleIntakes = (e) => {
    setIntakes(e.target.checked);
  };

  const handleConsultants = (e) => {
    setConsultants(e.target.checked);
  };

  const handleStudents = (e) => {
    setStudents(e.target.checked);
  };

  const handleUniversities = (e) => {
    setUniversities(e.target.checked);
  };

  const handleSubjects = (e) => {
    setSubjects(e.target.checked);
  };

  const handleRanges = (e) => {
    setRanges(e.target.checked);
  };

  const handleAmounts = (e) => {
    setAmounts(e.target.checked);
  };

  const handleStatuses = (e) => {
    setStatuses(e.target.checked);
  };

  const handleDates = (e) => {
    setDates(e.target.checked);
  };

  const handleStatuses2 = (e) => {
    setStatuses2(e.target.checked);
  };

  const handleActions = (e) => {
    setActions(e.target.checked);
  };

  const studentOptions = student?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudent = (label, value) => {
    setStudentLabel(label);
    setStudentValue(value);
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const intakeOptions = intake?.map((int) => ({
    label: int?.intakeName,
    value: int?.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const uappOptions = uapp?.map((int) => ({
    label: int?.name,
    value: int?.id,
  }));

  const selectUapp = (label, value) => {
    setUappLabel(label);
    setUappValue(value);
  };

  const handleReset = () => {
    setUappLabel("UAPP ID");
    setUappValue(0);
    setStudentLabel("Select Student");
    setStudentValue(0);
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
  };

  const viewDetails = (data) => {
    history.push(`/applicationTransactionDetails/${data?.id}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Application Transaction List</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToDashboard}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 mb-2">
                      <Select
                        options={uappOptions}
                        // styles={customStyles2}
                        value={{ label: uappLabel, value: uappValue }}
                        onChange={(opt) => selectUapp(opt.label, opt.value)}
                      />
                    </div>

                    <div className="col-md-3 mb-2">
                      <Select
                        // styles={customStyles2}
                        options={studentOptions}
                        value={{ label: studentLabel, value: studentValue }}
                        onChange={(opt) => selectStudent(opt.label, opt.value)}
                      />
                    </div>
                    {parseInt(userType) !== userTypes?.Consultant ? (
                      <div className="col-md-3 mb-2">
                        <Select
                          // styles={customStyles2}
                          options={consultantOptions}
                          value={{
                            label: consultantLabel,
                            value: consultantValue,
                          }}
                          onChange={(opt) =>
                            selectConsultant(opt.label, opt.value)
                          }
                          isDisabled={consultantId !== undefined ? true : false}
                        />
                      </div>
                    ) : null}

                    <div className="col-md-3">
                      <Select
                        // styles={customStyles2}
                        options={intakeOptions}
                        value={{ label: intakeLabel, value: intakeValue }}
                        onChange={(opt) => selectIntake(opt.label, opt.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <div
                    className="mt-1 mx-1 d-flex btn-clear"
                    onClick={handleReset}
                  >
                    <span className="text-danger">
                      <i className="fa fa-times"></i> Clear
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12"></Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
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
                                    handleSerials(e);
                                  }}
                                  checked={serials}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Id</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleIds(e);
                                  }}
                                  checked={ids}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Intake</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleIntakes(e);
                                  }}
                                  checked={intakes}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Consultant</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleConsultants(e);
                                  }}
                                  checked={consultants}
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
                                    handleStudents(e);
                                  }}
                                  checked={students}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">University</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleUniversities(e);
                                  }}
                                  checked={universities}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Subject</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleSubjects(e);
                                  }}
                                  checked={subjects}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Intake Range</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleRanges(e);
                                  }}
                                  checked={ranges}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Amount</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleAmounts(e);
                                  }}
                                  checked={amounts}
                                  disabled={buttonStatus}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Registation Status</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleStatuses(e);
                                  }}
                                  checked={statuses}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Transaction Date</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleDates(e);
                                  }}
                                  checked={dates}
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
                                    handleStatuses2(e);
                                  }}
                                  checked={statuses2}
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
                                    handleActions(e);
                                  }}
                                  checked={actions}
                                />
                              </FormGroup>
                            </Col>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      {serials ? <th>SL/NO</th> : null}
                      {ids ? <th>Id</th> : null}
                      {intakes ? <th>Intake</th> : null}
                      {consultants ? <th>Consultant</th> : null}
                      {students ? <th>Student</th> : null}
                      {universities ? <th>University</th> : null}
                      {subjects ? <th>Subject</th> : null}
                      {ranges ? <th>Intake Range</th> : null}
                      {amounts ? <th>Amount</th> : null}
                      {statuses ? <th>Reg. Status</th> : null}

                      {dates ? <th>Transaction Date</th> : null}
                      {statuses2 ? <th>Status</th> : null}
                      {actions ? <th>Action</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ls, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        {serials ? <td>{i + 1}</td> : null}
                        {ids ? <td>{ls?.id}</td> : null}
                        {intakes ? <td>{ls?.intake}</td> : null}
                        {consultants ? <td>{ls?.consultant}</td> : null}
                        {students ? <td>{ls?.student}</td> : null}
                        {universities ? <td>{ls?.unviersity}</td> : null}
                        {subjects ? <td>{ls?.subject}</td> : null}
                        {ranges ? <td>{ls?.accountIntake}</td> : null}
                        {amounts ? <td>{ls?.amount}</td> : null}
                        {statuses ? <td> {ls?.registrationStatus}</td> : null}

                        {dates ? <td>{ls?.transactionDate}</td> : null}
                        {statuses2 ? <td>{ls?.transactionStatus}</td> : null}

                        {actions ? (
                          <>
                            {permissions?.includes(
                              permissionList?.View_Application_transaction_info
                            ) ? (
                              <>
                                {" "}
                                {checkAction ? (
                                  <td className="text-center">
                                    <ButtonGroup variant="text">
                                      <Button
                                        className="me-1 btn-sm"
                                        color="primary"
                                        onClick={() => viewDetails(ls)}
                                      >
                                        <i className="fas fa-eye"></i>
                                      </Button>
                                    </ButtonGroup>
                                  </td>
                                ) : null}
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

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

export default Index;
