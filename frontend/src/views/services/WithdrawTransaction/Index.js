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
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import get from "../../../helpers/get";
import Pagination from "../Pagination/Pagination";
import Loader from "../Search/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import ButtonForFunction from "../Components/ButtonForFunction";

import { useToasts } from "react-toast-notifications";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import { userTypes } from "../../../constants/userTypeConstant";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";

const Index = () => {
  const [listData, setListData] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "33px",
      height: "33px",
      boxShadow: state.isFocused ? null : null,
    }),

    // menu: () => ({

    //   overflowY: 'auto'

    // }),
  };
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { consultantId } = useParams();

  const [label1, setLabel1] = useState("Select Consultant");
  const [label2, setLabel2] = useState("Select Consultant");
  const [consultant, setCounsultant] = useState([]);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [transactionCode, setTransactionCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const [modal2Open, setModal2Open] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [tLabel, setTLabel] = useState("Select Transaction Type");
  const [tValue, setTValue] = useState(0);
  const [reference, setReference] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const userType = localStorage.getItem("userType");
  const [sr, setSr] = useState(1);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkTransCode, setCheckTransCode] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkAmount, setCheckAmount] = useState(true);
  const [checkRef, setCheckRef] = useState(true);
  const [checkTransDate, setCheckTransDate] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

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
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const [note, setNote] = useState("");
  const [cError, setCError] = useState("");
  const [tError, setTError] = useState("");

  // useEffect(() => {
  //  consultantId?
  //  get(
  //   `WithdrawTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${consultantId}&code=${transactionCode}`
  // ).then((res) => {

  //   setListData(res?.models);
  //   setEntity(res?.totalEntity);
  //   setLoading(false);
  //   setSr(res?.firstSerialNumber);
  // })
  // :
  // get(
  //   `WithdrawTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${value1}&code=${transactionCode}`
  // ).then((res) => {

  //   setListData(res?.models);
  //   setEntity(res?.totalEntity);
  //   setLoading(false);
  //   setSr(res?.firstSerialNumber);
  // });

  //  consultantId ?
  //  get(`ConsultantDD/index`).then((res) => {
  //   setCounsultant(res);
  //   const result = res?.find(data => data?.id == consultantId);
  //   setLabel1(result?.name);
  //   setValue1(result?.id);
  // }):
  // get(`ConsultantDD/index`).then((res) => {
  //   setCounsultant(res);

  // });

  //   get(`TransactionTypeDD/Index`).then((res) => {
  //     setTransaction(res);
  //   });

  //   if(userType == userTypes?.Consultant){
  //     get(`Balance/ConsultantBalance/${localStorage.getItem('referenceId')}`).then((res) => {
  //       setAmount(res);
  //     });
  //   }

  // }, [value1, success, transactionCode, currentPage, dataPerPage, value1, transactionCode]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    remove(`WithdrawTransaction/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDelData({});
      setDeleteModal(false);
    });
  };

  const backToDashboard = () => {
    history.pushState("/");
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const transactionOptions = transaction?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant1 = (label, value) => {
    setLabel1(label);
    setValue1(value);
  };
  const selectTransaction = (label, value) => {
    setTError("");
    setTLabel(label);
    setTValue(value);
  };

  const selectConsultant2 = (label, value) => {
    setCError("");
    setLabel2(label);
    setValue2(value);
    get(`Balance/ConsultantBalance/${value}`).then((res) => {
      setAmount(res);
    });
  };

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const handleAmount = (e) => {
    setAmountInput(e.target.value);
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

  const handleReset = () => {
    setLabel1("Select Consultant");
    setValue1(0);
    setTransactionCode("");
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
      ws = XLSX.utils.json_to_sheet(listData);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleClear = () => {
    setLabel1("Select Consultant");
    setValue1(0);

    setTransactionCode("");
  };

  const closeModal2 = () => {
    setModal2Open(false);
    setLabel2("Select Consultant");
    setValue2(0);
    setTLabel("Select Transaction Type");
    setTValue(0);
    setAmount(0);
    setAmountInput("");
    setNote("");
    setReference("");
  };

  const submitWithdrawRequest = (event) => {
    event.preventDefault();

    const subData = {
      consultantId:
        userType == userTypes?.Consultant
          ? localStorage.getItem("referenceId")
          : value2,
      amount: amountInput,
      transactionNote: note,
      paymentTypeId: tValue,
      reference: reference,
    };

    if (!userType == userTypes?.Consultant) {
      if (value2 == 0) {
        setCError("Consultant is required");
      } else if (tValue == 0) {
        setTError("Transaction type is required");
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`WithdrawTransaction/Create`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModal2Open(false);
            setLabel2("Select Consultant");
            setValue2(0);
            setTLabel("Select Transaction Type");
            setTValue(0);
            setAmount(0);
            setAmountInput(0);
            setSuccess(!success);
            setModal2Open(false);
            setReference("");
            setNote("");
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else {
      if (tValue == 0) {
        setTError("Transaction type is required");
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`WithdrawTransaction/Create`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModal2Open(false);
            setLabel2("Select Consultant");
            setValue2(0);
            setTLabel("Select Transaction Type");
            setTValue(0);
            setAmount(0);
            setAmountInput(0);
            setSuccess(!success);
            setModal2Open(false);
            setReference("");
            setNote("");
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedTransDate = (e) => {
    setCheckTransDate(e.target.checked);
  };
  const handleCheckedTransCode = (e) => {
    setCheckTransCode(e.target.checked);
  };
  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedAmount = (e) => {
    setCheckAmount(e.target.checked);
  };
  const handleCheckedRef = (e) => {
    setCheckRef(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Withdraw Transaction</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Amount Available To Pay</span>
                  </Col>
                  <Col md="8">
                    <Input value={50} disabled={true} />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      required
                      name="amount"
                      id="amount"
                    />
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    className="mr-1 mt-3"
                    disabled={buttonStatus}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          {/* create new withdraw transaction */}
          <Modal
            isOpen={modal2Open}
            toggle={closeModal2}
            className="uapp-modal2"
          >
            <ModalHeader>Create Withdraw Request</ModalHeader>
            <ModalBody>
              <Form onSubmit={submitWithdrawRequest}>
                {userType == userTypes?.Consultant ? null : (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Select Consultant <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Select
                        styles={customStyles}
                        options={consultantOptions}
                        value={{ label: label2, value: value2 }}
                        onChange={(opt) =>
                          selectConsultant2(opt.label, opt.value)
                        }
                        name="consultantId"
                        id="consultantId"
                      />
                    </Col>
                  </FormGroup>
                )}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available to Pay{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input type="text" value={amount} disabled required />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount<span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="number"
                      onChange={handleAmount}
                      value={amountInput}
                      placeholder="Enter Amount"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Select Payment Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      styles={customStyles}
                      options={transactionOptions}
                      value={{ label: tLabel, value: tValue }}
                      onChange={(opt) =>
                        selectTransaction(opt.label, opt.value)
                      }
                    />
                    <span className="text-danger">{tError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Ref/Invoice</span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Enter Ref/Invoice"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Note</span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="textarea"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                      rows={2}
                      placeholder="Enter Note"
                    />
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-end">
                  <FormGroup className="has-icon-left position-relative">
                    <Button
                      color="primary"
                      className="mr-1 mt-3"
                      disabled={
                        amountInput < 50 ||
                        amountInput > amount ||
                        amountInput == isNaN(amountInput) ||
                        buttonStatus
                          ? true
                          : false
                      }
                    >
                      {progress ? <ButtonLoader /> : "Submit"}
                    </Button>
                  </FormGroup>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Withdraw Transaction List</h3>
              <div className="page-header-back-to-home">
                <span onClick={backToDashboard} className="text-white">
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
                  <div className="col-md-6 mb-2">
                    <Select
                      styles={customStyles}
                      options={consultantOptions}
                      value={{ label: label1, value: value1 }}
                      onChange={(opt) =>
                        selectConsultant1(opt.label, opt.value)
                      }
                      isDisabled={consultantId ? true : false}
                    />
                  </div>
                ) : null}

                <div className="col-md-6">
                  <Input
                    styles={{ height: "40px" }}
                    type="text"
                    placeholder="Enter Transaction Code"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value)}
                  />
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
              <div className=" row mb-3">
                <div
                  className="col-lg-5 col-md-5 col-sm-12 col-xs-12"
                  style={{ marginBottom: "10px" }}
                >
                  {userType == userTypes?.Consultant ? null : (
                    <>
                      {permissions?.includes(
                        permissionList.Add_New_withdraw_transaction
                      ) ? (
                        <ButtonForFunction
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          func={() => setModal2Open(true)}
                          name={" Add Withdraw Transaction"}
                        ></ButtonForFunction>
                      ) : null}
                    </>
                  )}
                </div>

                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
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

                    <div className="mr-md-2 mb-2">
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
                              <p className="">Transaction Date</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedTransDate(e);
                                  }}
                                  defaultChecked={checkTransDate}
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
                              <p className="">Reference/Invoice No.</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedRef(e);
                                  }}
                                  defaultChecked={checkRef}
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
                                    handleCheckedType(e);
                                  }}
                                  defaultChecked={checkType}
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
                </div>
              </div>

              <div className="table-responsive">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      {checkSlNo ? <th>SL/NO</th> : null}
                      {checkTransDate ? <th>Transaction Date</th> : null}
                      {checkCons ? <th>Consultant Name</th> : null}
                      {checkTransCode ? <th>Transaction Code</th> : null}
                      {checkAmount ? <th>Amount</th> : null}
                      {checkRef ? <th>Reference/Invoice No.</th> : null}
                      {checkType ? <th>Payment Type</th> : null}
                      {/* {checkAction ? <th>Action</th> : null} */}
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.map((ls, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        {checkSlNo ? <td>{i + sr}</td> : null}
                        {checkTransDate ? <td>{ls?.transactionDate}</td> : null}
                        {checkCons ? <td>{ls?.consultantName}</td> : null}
                        {checkTransCode ? <td>{ls?.transactionCode}</td> : null}
                        {checkAmount ? <td>{ls?.amount}</td> : null}
                        {checkRef ? <td>{ls?.reference}</td> : null}
                        {checkType ? <td>{ls?.paymentType}</td> : null}

                        {/* {checkAction ? (
                        <td className="text-center">
                          <ButtonGroup variant="text">
                           {
                            permissions?.includes(permissionList.Delete_withdraw_transaction) ?
                            <> {ls?.canDelete && (
                              <Button
                                className="ml-1"
                                color="danger"
                                onClick={() => toggleDanger(ls)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                            )}
                            </>
                            :
                            null
                           }
                            <Modal
                              isOpen={deleteModal}
                              toggle={() => setDeleteModal(!deleteModal)}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={handleDeleteData}
                                  buttonStatus
                                >
                                  YES
                                </Button>
                                <Button onClick={() => setDeleteModal(false)}>
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </ButtonGroup>
                        </td>
                      ) : null} */}
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
        </div>
      )}
    </div>
  );
};

export default Index;
