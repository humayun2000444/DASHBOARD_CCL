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
import { Link, useHistory } from "react-router-dom";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";
import Pagination from "../Pagination/Pagination";
import { userTypes } from "../../../constants/userTypeConstant";
import post from "../../../helpers/post";
import { AddPhotoAlternateSharp } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";
import Assets from "../../../assets/img/Asset 12Icon.svg";
import Loader from "../Search/Loader/Loader";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import * as Icon from "react-feather";

const List = () => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  const history = useHistory();
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] = useState(
    "Select Transaction Status"
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [transactionValue, setTransactionValue] = useState(0);
  const [payment, setPayment] = useState([]);
  const [paymentLabel, setPaymentLabel] = useState("Select Payment Status");
  const [paymentValue, setPaymentValue] = useState(0);
  const [transactionCode, setTransactionCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currData, setCurrData] = useState({});
  const [currData2, setCurrData2] = useState({});
  const [modalTLabel, setModalTLabel] = useState("Select Transaction Status");
  const [modalTValue, setModalTValue] = useState(0);
  const [mTError, setMTerror] = useState("");
  const [mPError, setMPerror] = useState("");
  const { addToast } = useToasts();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalPLabel, setModalPLabel] = useState("Select Payment Status");
  const [modalPValue, setModalPValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkReqDate, setCheckReqDate] = useState(true);
  const [checkPayType, setCheckPayType] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkPayDate, setCheckPayDate] = useState(true);
  const [checkPaySts, setCheckPaySts] = useState(true);
  const [checkAmount, setCheckAmount] = useState(true);
  const [checkTransCode, setCheckTransCode] = useState(true);
  const [checkInvoice, setCheckInvoice] = useState(true);
  const [checkStatus, setCheckStatus] = useState(true);

  // useEffect(() => {
  //   get(`ConsultantDD/index`).then((res) => {
  //     setConsultant(res);
  //   });

  //   get(`TransactionStatusDD/Index`).then((res) => {
  //     setTransaction(res);
  //   });

  //   get(`PaymentStatusDD/Index`).then((res) => {
  //     setPayment(res);
  //   });

  //   get(
  //     `WithdrawRequest/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${consultantValue}&transactionStatus=${transactionValue}&paymentStatuas=${paymentValue}&code=${transactionCode}`
  //   ).then((res) => {

  //     setData(res?.models);
  //     setEntity(res?.totalEntity);
  //     setLoading(false);
  //   });
  // }, [
  //   consultantValue,
  //   transactionValue,
  //   paymentValue,
  //   success,
  //   transactionCode,
  // ]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const handleAddWithdrawRequest = () => {
    history.push("/createWithdrawRequest");
  };

  const closeModal = () => {
    setModalTLabel("Select Transaction Status");
    setModalTValue(0);
    setModalOpen(false);
  };

  const closeModal2 = () => {
    setModalPLabel("Select Payment Status");
    setModalPValue(0);
    setModalOpen2(false);
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const transactionOptions = transaction?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectTransaction = (label, value) => {
    setTransactionLabel(label);
    setTransactionValue(value);
  };

  const selectTransaction2 = (label, value) => {
    setMTerror("");
    setModalTLabel(label);
    setModalTValue(value);
  };

  const handleUpdate = (data) => {
    setCurrData(data);
    setModalTLabel(data?.transactionStatus);
    setModalTValue(data?.transactionStatusId);
    setModalOpen(true);
  };

  const handleUpdate2 = (data) => {
    setCurrData2(data);
    setModalPLabel(data?.paymentStatus);
    setModalPValue(data?.paymentStatusId);
    setModalOpen2(true);
  };

  const paymentOptions = payment?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectPayment = (label, value) => {
    setPaymentLabel(label);
    setPaymentValue(value);
  };

  const selectPayment2 = (label, value) => {
    setModalPLabel(label);
    setModalPValue(value);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
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

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();
  const componentRef2 = useRef();

  const handleClear = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setTransactionLabel("Select Transaction Status");
    setTransactionValue(0);
    setPaymentLabel("Select Payment Status");
    setPaymentValue(0);
    setTransactionCode("");
  };

  const handleTransactionStatusChange = (event) => {
    event.preventDefault();

    if (modalTValue == 0) {
      setMTerror("Transaction status is required");
    } else {
      setButtonStatus(true);
      setProgress(true);
      get(
        `WithdrawRequest/TransactionStatus/${currData?.id}/${modalTValue}`
      ).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res == true) {
          addToast("Status changed successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          closeModal();
          setCurrData({});
          setSuccess(!success);
        } else {
          addToast("Something went wrong", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handlePaymentStatusChange = (event) => {
    event.preventDefault();

    if (modalPValue == 0) {
      setMPerror("Transaction status is required");
    } else {
      setButtonStatus(true);
      setProgress1(true);
      get(`WithdrawRequest/PaymentStatus/${currData2?.id}/${modalPValue}`).then(
        (res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res == true) {
            addToast("Status changed successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            closeModal2();
            setCurrData2({});
            setSuccess(!success);
          } else {
            addToast("Something went wrong", {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      );
    }
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedReqDate = (e) => {
    setCheckReqDate(e.target.checked);
  };
  const handleCheckedPayType = (e) => {
    setCheckPayType(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedPayDate = (e) => {
    setCheckPayDate(e.target.checked);
  };
  const handleCheckedPaySts = (e) => {
    setCheckPaySts(e.target.checked);
  };
  const handleCheckedAmount = (e) => {
    setCheckAmount(e.target.checked);
  };
  const handleCheckedTransCode = (e) => {
    setCheckTransCode(e.target.checked);
  };
  const handleCheckedInvoice = (e) => {
    setCheckInvoice(e.target.checked);
  };
  const handleCheckedStatus = (e) => {
    setCheckStatus(e.target.checked);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Update withdraw request status modal selected Transaction Status  */}

          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Update Withdraw Request Status</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleTransactionStatusChange}>
                <input type="hidden" value={currData?.id} />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available To Pay{" "}
                      <span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={transactionOptions}
                      value={{ label: modalTLabel, value: modalTValue }}
                      onChange={(opt) =>
                        selectTransaction2(opt.label, opt.value)
                      }
                    />
                  </Col>
                </FormGroup>

                <span className="text-danger">
                  <b>Note:</b>
                </span>
                <span className="ml-1">
                  By authorizing transaction, account officer will be able to
                  make payment
                </span>

                <div className="d-flex justify-content-between mt-3">
                  <Button color="danger" onClick={closeModal}>
                    Cancel
                  </Button>

                  <Button color="primary">
                    {progress ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          {/* 2md modal to update */}

          <Modal
            isOpen={modalOpen2}
            toggle={closeModal2}
            className="uapp-modal2"
          >
            <ModalHeader>Update Payment Status</ModalHeader>
            <ModalBody>
              <Form onSubmit={handlePaymentStatusChange}>
                <input type="hidden" value={currData2?.id} />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available To Pay{" "}
                      <span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={paymentOptions}
                      value={{ label: modalPLabel, value: modalPValue }}
                      onChange={(opt) => selectPayment2(opt.label, opt.value)}
                    />
                  </Col>
                </FormGroup>

                <span className="text-danger">
                  <b>Note:</b>
                </span>
                <span className="ml-1">
                  Make sure that the withdraw request is paid or rejected
                </span>

                <div className="d-flex justify-content-between mt-3">
                  <Button color="danger" onClick={closeModal2}>
                    Cancel
                  </Button>

                  <Button color="primary" type="submit">
                    {progress1 ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Withdraw Request List</h3>
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
                {parseInt(localStorage.getItem("userType")) !==
                userTypes?.Consultant ? (
                  <div className="col-md-3 mb-2">
                    <Select
                      options={consultantOptions}
                      value={{ label: consultantLabel, value: consultantValue }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                    />
                  </div>
                ) : null}

                <div className="col-md-3 mb-2">
                  <Select
                    options={transactionOptions}
                    value={{ label: transactionLabel, value: transactionValue }}
                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
                  />
                </div>

                <div className="col-md-3 mb-2">
                  <Select
                    options={paymentOptions}
                    value={{ label: paymentLabel, value: paymentValue }}
                    onChange={(opt) => selectPayment(opt.label, opt.value)}
                  />
                </div>

                <div className="col-md-3">
                  <Input
                    style={{ height: "38px" }}
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Transaction Code"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-end btn-clear">
                    <span className="text-danger" onClick={handleClear}>
                      <i className="fa fa-times"></i> Clear
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              <div className=" row mb-3">
                <div
                  className="col-lg-5 col-md-5 col-sm-4 col-xs-4"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(
                    permissionList.Add_New_withdraw_request
                  ) ? (
                    <Button color="primary" onClick={handleAddWithdrawRequest}>
                      <i className="fas fa-plus"></i>
                      <span> Add Withdraw Request</span>
                    </Button>
                  ) : null}
                </div>

                <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8">
                  <div className="d-flex justify-content-end flex-wrap">
                    <div className="me-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div>
                          <Select
                            className="mr-2"
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
                              <p className="">Request Date</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedReqDate(e);
                                  }}
                                  defaultChecked={checkReqDate}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Consultant Name</p>
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
                              <p className="">Transaction Code</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedTransCode(e);
                                  }}
                                  defaultChecked={checkTransCode}
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
                                    handleCheckedAmount(e);
                                  }}
                                  defaultChecked={checkAmount}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Payment Type</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPayType(e);
                                  }}
                                  defaultChecked={checkPayType}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Payment Date</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPayDate(e);
                                  }}
                                  defaultChecked={checkPayDate}
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
                                    handleCheckedStatus(e);
                                  }}
                                  defaultChecked={checkStatus}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Payment Status</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPaySts(e);
                                  }}
                                  defaultChecked={checkPaySts}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Invoice</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedInvoice(e);
                                  }}
                                  defaultChecked={checkInvoice}
                                />
                              </FormGroup>
                            </Col>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}
                  </div>
                </div>
              </div>

              <div className="table-responsive" ref={componentRef}>
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      {checkSlNo ? <th>SL/NO</th> : null}
                      {checkReqDate ? <th>Request Date</th> : null}
                      {checkCons ? <th>Consultant Name</th> : null}
                      {checkTransCode ? <th>Transaction Code</th> : null}
                      {checkAmount ? <th>Amount</th> : null}
                      {checkPayType ? <th>Payment Type</th> : null}
                      {checkPayDate ? <th>Payment Date</th> : null}
                      {permissions?.includes(
                        permissionList.Update_WithdrawRequest_TransactionStatus_info
                      ) ? (
                        <>{checkStatus ? <th>Status</th> : null}</>
                      ) : null}
                      {permissions?.includes(
                        permissionList.Update_WithdrawRequest_PaymentStatus_info
                      ) ? (
                        <> {checkPaySts ? <th>Payment Status</th> : null}</>
                      ) : null}
                      {checkInvoice ? <th>Invoice</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ls, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        {checkSlNo ? <td>{i + 1}</td> : null}
                        {checkReqDate ? <td>{ls?.transactionDate}</td> : null}
                        {checkCons ? <td>{ls?.consultantName}</td> : null}
                        {checkTransCode ? <td>{ls?.transactionCode}</td> : null}
                        {checkAmount ? <td>{ls?.amount}</td> : null}
                        {checkPayType ? <td>{ls?.paymentType}</td> : null}
                        {checkPayDate ? <td>{ls?.transactionDate}</td> : null}
                        {permissions?.includes(
                          permissionList.Update_WithdrawRequest_TransactionStatus_info
                        ) ? (
                          <>
                            {checkStatus ? (
                              <td>
                                {ls?.transactionStatus}
                                {!(ls?.paymentStatusId == 2) &&
                                  current_user?.userTypeId ==
                                    userTypes?.SystemAdmin && (
                                    <Button
                                      color="warning"
                                      className="ml-2 btn-sm"
                                      onClick={() => handleUpdate(ls)}
                                      disabled={buttonStatus}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </Button>
                                  )}
                              </td>
                            ) : null}
                          </>
                        ) : null}
                        {permissions?.includes(
                          permissionList.Update_WithdrawRequest_PaymentStatus_info
                        ) ? (
                          <>
                            {" "}
                            {checkPaySts ? (
                              <td>
                                {ls?.paymentStatus}
                                {ls?.transactionStatusId == 2 &&
                                  !(ls?.paymentStatusId == 2) &&
                                  current_user?.userTypeId ==
                                    userTypes?.SystemAdmin && (
                                    <Button
                                      color="warning"
                                      className="ml-2 btn-sm"
                                      onClick={() => handleUpdate2(ls)}
                                      disabled={buttonStatus}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </Button>
                                  )}
                              </td>
                            ) : null}
                          </>
                        ) : null}

                        {checkInvoice ? (
                          <td className="text-center">
                            {/* {
                          ls?.paymentStatusId == 2 && */}
                            <ButtonGroup variant="text">
                              <ReactToPrint
                                trigger={() => (
                                  <Button
                                    className="me-1 btn-sm"
                                    color="primary"
                                  >
                                    Download
                                  </Button>
                                )}
                                content={() => componentRef2.current}
                              />
                            </ButtonGroup>
                            {/* } */}
                          </td>
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

          {/* invoice pdf start */}

          <div style={{ display: "none" }}>
            <div ref={componentRef2} style={{ marginTop: "100px" }}>
              <div className="invoice-winthdraw-request-style">
                <img height={70} src={Assets} />
                <h1>Remittance Advice</h1>
              </div>

              <div style={{ marginTop: "100px" }}>
                <hr />
              </div>

              <div style={{ marginTop: "100px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <div>
                      <span
                        className="inv-span-styles"
                        style={{ color: "#164677", fontWeight: "500" }}
                      >
                        TC ID 332
                      </span>
                    </div>
                    <br />
                    <br />
                    <div>
                      <span>
                        <Icon.PhoneCall color="#164677" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        +442072658478
                      </span>
                    </div>
                    <div>
                      <span>
                        <Icon.Search color="#164677" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        finance@uapp.uk
                      </span>
                    </div>
                    <div>
                      <span>
                        <Icon.Map color="#164677" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        80-82 Nelson Street London E1 2DY
                      </span>
                    </div>
                    <div>
                      <span className="inv-span-styles">
                        TC Date 24/11/2022
                      </span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>
                        <span
                          className="inv-span-styles"
                          style={{ color: "#164677", fontWeight: "500" }}
                        >
                          Date : 24/11/2022
                        </span>
                      </div>
                      <br />
                      <br />
                      <div>
                        <span className="inv-span-styles">
                          Consultant Name : Mirela-Gabriela
                        </span>
                      </div>
                      <div>
                        <span className="inv-span-styles">Porcisteanu</span>
                      </div>
                      <div>
                        <span className="inv-span-styles">
                          Consultant ID : AG009
                        </span>
                      </div>
                      <div>
                        <span className="inv-span-styles">Reference No :</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "100px",
                  width: "80%",
                  marginLeft: "100px",
                }}
              >
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Quantity</span>
                      </th>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Description</span>
                      </th>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Line Total</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">1</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">TC-W317</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">200.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          borderLeft: "1px solid black",
                        }}
                      >
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">SubTotal</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">200.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          borderLeft: "1px solid black",
                        }}
                      >
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">Deductions</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">0</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          borderLeft: "1px solid black",
                        }}
                      >
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">Total</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">£ 200.00</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "100px", marginLeft: "100px" }}>
                <div>
                  <span
                    style={{ color: "#164677" }}
                    className="inv-span-styles"
                  >
                    Bank Details
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">
                    Account Name : M G PORCISTEANU
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">
                    Account Number : 31882007
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">Short code : 402310</span>
                </div>
                <div>
                  <span className="inv-span-styles">Bank Name : HSBC</span>
                </div>
              </div>

              <div style={{ marginTop: "100px", textAlign: "center" }}>
                <span className="inv-span-styles">
                  Thank you for your business.
                </span>
              </div>
            </div>
          </div>

          {/* invoice pdf end */}
        </>
      )}
    </div>
  );
};

export default List;
