import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import get from "../../../helpers/get";
import Select from "react-select";
import { connect } from "react-redux";
import Pagination from "../../services/Pagination/Pagination.jsx";
import Axios from "axios";
import { rootUrl } from "../../../constants/constants";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import LinkButton from "../Components/LinkButton";
import LinkSpanButton from "../Components/LinkSpanButton";
import remove from "../../../helpers/remove";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";

const CampusList = (props) => {
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  // const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [stateError, setStateError] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [universityId, setuniversityId] = useState(0);
  const [submitData, setSubmitData] = useState(false);
  const [campObj, setCampObj] = useState({});
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uniNameFromObj, setUniNameFromObj] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [camppName, setCamppName] = useState("");
  const [camppId, setCamppId] = useState(0);

  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkCity, setCheckCity] = useState(true);
  const [checkStd, setCheckStd] = useState(true);
  const [checkProg, setCheckProg] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const { addToast } = useToasts();
  const { uniId } = useParams();

  const history = useHistory();
  const location = useLocation();
  localStorage.setItem("uIdForCamp", location?.id);

  const [uniCampus, setUniCampus] = useState([]);
  const [uniCampusLabel, setUniCampusLabel] = useState("Select City");
  const [uniCampusValue, setUniCampusValue] = useState(0);
  const [uniCampusError, setUniCampusError] = useState("");

  // useEffect(() => {
  //   // const page = 0;
  //   // const pageSize = 0;

  //   const search = "";

  //   get(
  //     `UniversityCampus/index?universityId=${uniId}&search=${searchStr}`
  //   ).then((res) => {

  //     console.log(res);
  //     setCampusList(res);

  //     setLoading(false);
  //   });

  //   get("UniversityCountryDD/Index").then((res) => {
  //     setCountryList(res);
  //   });

  //   get(`University/Get/${uniId}`).then((res) => {

  //     setUniNameFromObj(res?.name);
  //   });
  // }, [
  //   callApi,
  //   currentPage,
  //   dataPerPage,
  //   searchStr,
  //   // entity,
  //   loading,
  //   serialNum,
  //   success,
  //   uniId,
  // ]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

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

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const backToDashboard = () => {
    history.push("/universityList");
  };

  const handleClearSearch = () => {
    setSearchStr("");
    setCallApi((prev) => !prev);
  };

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on Close Modal
  const closeModal = () => {
    setCampObj({});
    setUniCampusLabel("Select City");
    setUniCampusValue(0);
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    setUniCampusLabel("Select City");
    setUniCampusValue(0);
    setSelectedId(0);
    setModalOpen(false);
  };

  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  const cityOptions = uniCampus?.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const handleUpdate = (id) => {
    setModalOpen(true);

    get(`UniversityCampus/Get/${id}`).then((res) => {
      setCampObj(res);
      setUniCampusLabel(res?.universityCity?.name);
      setUniCampusValue(res?.universityCountry?.id);
      setUniCountryLabel(res?.universityCountry?.name);
      setUniCountryValue(res?.campusCountryId);
      setUniStateLabel(res?.universityState?.name);
      setUniStateValue(res?.campusStateId);
      setSelectedId(res?.id);
    });
    setCampObj("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (selectedId === 0) {
      if (uniCountryValue === 0) {
        setCountryError(true);
      } else if (unistateValue === 0) {
        setStateError(true);
      } else if (uniCampusValue == 0) {
        setUniCampusError("City is required");
      } else {
        setButtonStatus(true);
        setProgress1(true);
        post(`UniversityCampus/Create`, subdata).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          setSuccess(!success);
          setModalOpen(false);

          setuniversityId(res?.data?.result?.universityId);
          if (res.status === 200 && res.data.isSuccess === true) {
            setSubmitData(false);
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setUniCountryLabel("Select Country");
            setUniCountryValue(0);
            setUniStateLabel("Select State");
            setUniStateValue(0);
            setUniCampusLabel("Select City");
            setUniCampusValue(0);
          }
        });
      }
    } else {
      setButtonStatus(true);
      setProgress1(true);
      put(`UniversityCampus/Update`, subdata).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          setSubmitData(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSelectedId(0);
          setSuccess(!success);
          setCampObj({});
          setUniCountryLabel("Select Country");
          setUniCountryValue(0);
          setUniStateLabel("Select State");
          setUniStateValue(0);
          setModalOpen(false);
          setUniCampusLabel("Select City");
          setUniCampusValue(0);
        }
      });
    }
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    get(`UniversityStateDD/Index/${value}`).then((res) => {
      // setUniStateLabel(res.name)
      // setUniStateValue(res.id)
      setUniversityStates(res);
    });

    get(`UniversityCityDD/Index/${value}`).then((res) => {
      setUniCampus(res);
    });
    setUniCampusLabel("Select City");
    setUniCampusValue(0);
  };

  const selectUniCity = (label, value) => {
    setUniCampusError("");
    setUniCampusLabel(label);
    setUniCampusValue(value);
  };

  // select University State
  const selectUniState = (label, value) => {
    setStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  // const handleAddUniversityCampus = () =>{
  //   history.push("/addUniversityCampus");
  // }

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(campusList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const toggleDanger = (p) => {
    // localStorage.setItem("camppId", p?.id);
    // localStorage.setItem("camppName", p?.name);
    setCamppId(p?.id);
    setCamppName(p?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    const returnValue = remove(`UniversityCampus/Delete/${id}`).then(
      (action) => {
        setButtonStatus1(false);
        setProgress(false);
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setCamppId(0);
        setCamppName("");
      }
    );
  };

  const handlRedirectToCampusDetails = (campusId) => {
    history.push(`/campusDetails/${campusId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedCity = (e) => {
    setCheckCity(e.target.checked);
  };
  const handleCheckedStd = (e) => {
    setCheckStd(e.target.checked);
  };
  const handleCheckedProg = (e) => {
    setCheckProg(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Campus List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University
              List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Input
              style={{ height: "2.7rem" }}
              type="text"
              name="search"
              value={searchStr}
              id="search"
              placeholder="Name ,Short Name"
              onChange={searchValue}
              onKeyDown={handleKeyDown}
            />
          </div>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>

                {/* <div className="mt-2 mx-1">
                <span className="btn btn-primary">Export</span>
              </div> */}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {uniNameFromObj ? (
            <div className="test-score-div-1-style mt-1 mb-4">
              <span className="test-score-span-1-style">
                Showing campus list of <b>{uniNameFromObj}</b>
              </span>
            </div>
          ) : null}

          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {permissions?.includes(
                permissionList.Add_New_UniversityCampus
              ) ? (
                <ButtonForFunction
                  func={() => setModalOpen(true)}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Campus"}
                  permission={6}
                />
              ) : null}
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
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
                          <p className="">Campus City</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCity(e);
                              }}
                              defaultChecked={checkCity}
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
                          <p className="">Programs</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedProg(e);
                              }}
                              defaultChecked={checkProg}
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

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">University Campus</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    <Input
                      type="hidden"
                      Campus
                      Name
                      id="universityId"
                      name="universityId"
                      value={uniId}
                    />
                    <Input type="hidden" id="Id" name="Id" value={selectedId} />
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Campus Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="Name"
                        id="Name"
                        defaultValue={campObj?.name}
                        placeholder="Enter Campus Name"
                        required
                      />
                      {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Campus Country <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={countryDD}
                        value={{
                          label: uniCountryLabel,
                          value: uniCountryValue,
                        }}
                        onChange={(opt) =>
                          selectUniCountry(opt.label, opt.value)
                        }
                        name="CampusCountryId"
                        id="CampusCountryId"
                      />

                      {countryError ? (
                        <span className="text-danger">Country is required</span>
                      ) : null}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Campus State <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={universityStateName}
                        value={{ label: uniStateLabel, value: unistateValue }}
                        onChange={(opt) => selectUniState(opt.label, opt.value)}
                        name="campusStateId"
                        id="campusStateId"
                      />

                      {stateError ? (
                        <span className="text-danger">State is required</span>
                      ) : null}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Campus City <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={cityOptions}
                        value={{
                          label: uniCampusLabel,
                          value: uniCampusValue,
                        }}
                        onChange={(opt) => selectUniCity(opt.label, opt.value)}
                        name="campusCityId"
                        id="campusCityId"
                      />
                      {<span className="text-danger">{uniCampusError}</span>}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Address Line<span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="AddressLine"
                        id="AddressLine"
                        defaultValue={campObj?.addressLine}
                        placeholder="Enter Address Line"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Total Student <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="TotalStudent"
                        id="TotalStudent"
                        defaultValue={campObj?.totalStudent}
                        placeholder="Enter Total Student"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        International Student{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="InternationalStudent"
                        id="InternationalStudent"
                        defaultValue={campObj?.internationalStudent}
                        placeholder="Enter International Student"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Average Tution Fee{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="AvarageTutionFee"
                        id="AvarageTutionFee"
                        defaultValue={campObj?.avarageTutionFee}
                        placeholder="Avarage Tution Fee"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Average Living Cost{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="AvarageLivingCost"
                        id="AvarageLivingCost"
                        defaultValue={campObj?.avarageLivingCost}
                        placeholder="Avarage Living Cost"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Average Application Fee{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="AvarageApplicationFee"
                        id="AvarageApplicationFee"
                        defaultValue={campObj?.avarageApplicationFee}
                        placeholder="Avarage Application Fee"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">
                        Estimated Total Cost{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="EstimatedTotalCost"
                        id="EstimatedTotalCost"
                        defaultValue={campObj?.estimatedTotalCost}
                        placeholder="Estimated Total Cost"
                        required
                      />
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span className="ml-5">Campus on Map </span>
                    </Col>
                    <Col md="6">
                      <Input
                        // type="textarea"
                        type="url"
                        rows="3"
                        name="EmbededMap"
                        id="EmbededMap"
                        defaultValue={campObj?.embededMap}
                        // placeholder="Location on Google Map"
                        placeholder="https://example.com"
                      />
                      <span className="text-danger">
                        Note: Please type the "src" link only from the embed map
                      </span>
                      {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                    </Col>
                  </FormGroup>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    {/* localStorage.getItem("updateUni") ? */}
                    {/* <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}

                    {/* <Button.Ripple
                        color="warning"
                        type="submit"
                        className="mr-1 mt-3"
                       
                      >
                        Submit
                      </Button.Ripple> */}

                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"ml-1 mt-3"}
                      name={progress1 ? <ButtonLoader /> : "Submit"}
                      permission={6}
                      isDisabled={buttonStatus}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <div></div>
          </div>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>Name</th> : null}
                    {checkCity ? <th>Campus City</th> : null}
                    {checkStd ? <th>Student</th> : null}
                    {/* <th>Cost</th> */}
                    {permissions?.includes(
                      permissionList.View_university_campus_subject_List
                    ) ? (
                      <> {checkProg ? <th>Programs</th> : null}</>
                    ) : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {campusList?.map((campus, i) => (
                    <tr key={campus?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}

                      {checkName ? <td>{campus?.name}</td> : null}
                      {checkCity ? (
                        <td>{campus?.universityCity?.name}</td>
                      ) : null}
                      {checkStd ? (
                        <td>
                          Total Student - {campus?.totalStudent} {<br />}
                          International Student - {campus?.internationalStudent}
                        </td>
                      ) : null}
                      {/* <td>{campus?.internationalStudent}</td> */}

                      {/* <td>
                              Avg. Tution Fee - {campus?.avarageTutionFee} {<br />}
                              Avg. Living Cost - {campus?.avarageLivingCost} {<br />}
                              Avg. Application Fee - {campus?.avarageApplicationFee} {<br />}
                              Est. Total Cost - {campus?.estimatedTotalCost}
                            </td> */}
                      {permissions?.includes(
                        permissionList.View_university_campus_subject_List
                      ) ? (
                        <>
                          {" "}
                          {checkProg ? (
                            <td>
                              {" "}
                              <span
                                className="badge badge-secondary"
                                style={{ cursor: "pointer" }}
                              >
                                {/* <Link className="text-decoration-none" to = {`campusSubjectList/${campus?.id}`}> 
                               <span> View </span>
                               </Link> */}

                                <LinkSpanButton
                                  url={`/campusSubjectList/${campus?.id}`}
                                  className={"text-decoration-none"}
                                  data={"View"}
                                  permission={6}
                                />
                              </span>{" "}
                            </td>
                          ) : null}
                        </>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <Link to= {`/campusDetails/${campus?.id}`}>
                                <Button color="primary" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-eye"></i>{" "}
                                </Button>
                                </Link> */}

                            {/* <LinkButton
                                  url={`/campusDetails/${campus?.id}`}
                                  color={"primary"}
                                  className={"mx-1 btn-sm"}
                                  icon={<i className="fas fa-eye"></i>}
                                  permission={6}
                                /> */}

                            {permissions?.includes(
                              permissionList.View_UniversityCampus_info
                            ) ? (
                              <ButtonForFunction
                                func={() =>
                                  handlRedirectToCampusDetails(campus?.id)
                                }
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-eye"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Button onClick={()=> handleUpdate(campus?.id)} color="dark" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-edit"></i>{" "}
                                </Button> */}

                            {permissions?.includes(
                              permissionList.Update_UniversityCampus_info
                            ) ? (
                              <ButtonForFunction
                                func={() => handleUpdate(campus?.id)}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Button color="danger" className="mx-1 btn-sm">
                                  <i className="fas fa-trash-alt"></i>
                                </Button> */}

                            {permissions?.includes(
                              permissionList.Delete_UniversityCampus
                            ) ? (
                              <ButtonForFunction
                                color={"danger"}
                                func={() => toggleDanger(campus)}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}

                            <Modal
                              isOpen={deleteModal}
                              toggle={() => {
                                setDeleteModal(!deleteModal);
                                setCamppId(0);
                                setCamppName("");
                              }}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this <b>{camppName}</b>{" "}
                                  ? Once Deleted it can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  disabled={buttonStatus1}
                                  color="danger"
                                  onClick={() =>
                                    handleDeletePermission(camppId)
                                  }
                                >
                                  {progress ? <ButtonLoader /> : "YES"}
                                </Button>
                                <Button
                                  onClick={() => {
                                    setDeleteModal(false);
                                    setCamppId(0);
                                    setCamppName("");
                                  }}
                                >
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </ButtonGroup>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <h5>Total Results Found: {campusList.length}</h5>
          </div>

          {/* <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
        </CardBody>
      </Card>
    </div>
  );
};

// export default CampusList;

const mapStateToProps = (state) => ({
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(CampusList);
