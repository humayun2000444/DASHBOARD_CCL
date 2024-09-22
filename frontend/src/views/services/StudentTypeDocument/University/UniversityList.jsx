import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../../services/Pagination/Pagination.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import uapploader from "../../../assets/img/Uapp_fav.png";
import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { StoreUniversityStateData } from "../../../redux/actions/SMS/UniversityAction/UniversityStateAction.js";
import { Link } from "react-router-dom";
import remove from "../../../helpers/remove.js";
import { StoreUniversityListData } from "../../../redux/actions/SMS/UniversityAction/UniversityListAction";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import LinkSpanButton from "../Components/LinkSpanButton.js";
import SpanButton from "../Components/SpanButton.js";
import LinkButton from "../Components/LinkButton.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { Axios } from "axios";
import Loader from "../Search/Loader/Loader.js";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import ToggleSwitch from "../Components/ToggleSwitch.js";
import put from "../../../helpers/put.js";

const UniversityList = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [universityList, setUniversityList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateList, setstateList] = useState([0]);
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversityTypes] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ulist, setUList] = useState([]);

  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const univerSList = props.univerSityDropDownList[0];

  const [stateByCountry, setStateByCountry] = useState(0);

  const [uniTypeLabel, setUniTypeLabel] = useState("Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryLabel, setUniCountryLabel] = useState("Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState("State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [checkLogo, setCheckLogo] = useState(true);
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [adManager, setAdmanager] = useState(true);
  const [adOfficer, setAdOfficer] = useState(true);
  const [checkCampus, setCheckCampus] = useState(true);
  const [checkAppli, setCheckAppli] = useState(true);
  const [checkProg, setCheckProg] = useState(true);
  const [checkStatus, setCheckStatus] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [delData, setDelData] = useState({});
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const providerData = useSelector(
    (state) => state?.universityProviderDataReducer?.universityProviders
  );
  const providerDataResult = providerData?.models;
  //
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const { counId, univerTypeId, provideId } = useParams();

  // useEffect(() => {
  //   // get("University/GetAll").then((res) => {
  //   //   // setUList(res);
  //   //   dispatch(StoreUniversityListData(res));
  //   // });
  // provideId ?
  // get(`ProviderDD/Index`).then((res) => {
  //   setProviderList(res);

  //     const result = res?.find(ans => ans?.id == provideId);
  //     setProviderLabel(result?.name);

  // })
  // :
  // get(`ProviderDD/Index`).then((res) => {
  //   setProviderList(res);

  // });

  //  counId ?
  //  get(`UniversityCountryDD/Index`).then((res) => {
  //   setUniverSityCountries(res);

  //     const result = res?.find(ans => ans?.id == counId);
  //     setUniCountryLabel(result?.name);

  //     get(`UniversityStateDD/Index/${counId}`).then((res) => {

  //       setUniversityStates(res);
  //     });

  // })
  // :
  // get(`UniversityCountryDD/Index`).then((res) => {
  //   setUniverSityCountries(res);

  // });

  //  univerTypeId ?
  //  get(`UniversityTypeDD/Index`).then((res) => {
  //   setUniversityTypes(res);

  //     const result = res?.find(ans => ans?.id == univerTypeId);

  // })
  // :
  // get(`UniversityTypeDD/Index`).then((res) => {
  //   setUniversityTypes(res);

  // });

  //   // get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{

  //   //   if(res !== 0){
  //   //     setProviderValue(res);
  //   //   }
  //   // })
  // }, [providerValue, uniCountryValue, uniTypeValue]);

  // useEffect(() => {

  //   if(counId !== undefined){
  //     get(
  //       `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${
  //         providerValue
  //       }&universityCountryId=${
  //         counId
  //       }&universityStateId=${
  //         unistateValue
  //       }&universityTypeId=${
  //         uniTypeValue
  //       }&search=${searchStr}&orderId=${orderValue}`
  //     ).then((action) => {
  //       setUniversityList(action?.models);

  //       setLoading(false);
  //       setEntity(action?.totalEntity);
  //       setSerialNum(action?.firstSerialNumber);
  //       setLoading(false);

  //     });
  //   }
  //   else if(univerTypeId !== undefined){
  //     get(
  //       `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${
  //         providerValue
  //       }&universityCountryId=${
  //         uniCountryValue
  //       }&universityStateId=${
  //         unistateValue
  //       }&universityTypeId=${
  //         univerTypeId
  //       }&search=${searchStr}&orderId=${orderValue}`
  //     ).then((action) => {
  //       setUniversityList(action?.models);

  //       setLoading(false);
  //       setEntity(action?.totalEntity);
  //       setSerialNum(action?.firstSerialNumber);
  //       setLoading(false);

  //     });
  //   }
  //   else if(provideId !== undefined){
  //     get(
  //       `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${
  //         provideId
  //       }&universityCountryId=${
  //         uniCountryValue
  //       }&universityStateId=${
  //         unistateValue
  //       }&universityTypeId=${
  //         uniTypeValue
  //       }&search=${searchStr}&orderId=${orderValue}`
  //     ).then((action) => {
  //       setUniversityList(action?.models);
  //       setLoading(false);
  //       setEntity(action?.totalEntity);
  //       setSerialNum(action?.firstSerialNumber);
  //       setLoading(false);

  //     });
  //   }
  //   else{
  //     get(
  //       `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${
  //         providerValue
  //       }&universityCountryId=${
  //         uniCountryValue
  //       }&universityStateId=${
  //         unistateValue
  //       }&universityTypeId=${
  //         uniTypeValue
  //       }&search=${searchStr}&orderId=${orderValue}`
  //     ).then((action) => {
  //       setUniversityList(action?.models);
  //       console.log("uniList", action?.models);
  //       setLoading(false);
  //       setEntity(action?.totalEntity);
  //       setSerialNum(action?.firstSerialNumber);
  //       setLoading(false);
  //     });
  //   }

  // }, [
  //   currentPage,
  //   dataPerPage,
  //   searchStr,
  //   uniCountryValue,
  //   uniTypeValue,
  //   unistateValue,
  //   orderValue,
  //   providerValue,
  //   success
  // ]);

  const searchStateByCountry = (countryValue) => {
    get(`UniversityStateDD/Index/${countryValue}`).then((res) => {
      // dispatch(StoreUniversityStateData(res));
      setUniversityStates(res);
    });
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  // user select order
  const orderArr = [
    {
      label: "Newest",
      value: 1,
    },
    {
      label: "Oldest",
      value: 2,
    },
    {
      label: "A-Z",
      value: 3,
    },
    {
      label: "Z-A",
      value: 4,
    },
  ];
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const selectOrder = (label, value) => {
    //
    setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add university handler
  const handleAddUniversity = () => {
    // localStorage.removeItem('editUniId');
    // localStorage.removeItem('editMethod');
    // localStorage.removeItem("id");
    history.push("/createUniversity");
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    if (counId != undefined) {
      history.push("/UniversityCountry");
    } else if (univerTypeId != undefined) {
      history.push("/UniversityTypes");
    } else if (provideId != undefined) {
      history.push("/providerList");
    } else {
      history.push("/");
    }
  };

  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));
  const universityTypeName = universityTypes?.map((uniType) => ({
    label: uniType.name,
    value: uniType.id,
  }));
  // select University Type

  const providerlist = providerList?.map((prov) => ({
    label: prov.name,
    value: prov.id,
  }));
  //

  const selectUniType = (label, value) => {
    setUniTypeLabel(label);
    setUniTypeValue(value);
    handleSearch();
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("State");
    setUniStateValue(0);
    searchStateByCountry(value);

    handleSearch();

    // Axios.get(`${rootUrl}/UniversityState/GetByCountry/${value}`)
    //   .then(res => {
    //     if (res.data.result[0]) {
    //       setUniStateLabel(res.data.result[0].name)
    //       setUniStateValue(res.data.result[0].id)

    //     } else {
    //       setUniStateLabel('No State Found')
    //       setUniStateValue(0)
    //     }

    //   })
  };

  //

  // select University State
  const selectUniState = (label, value) => {
    setUniStateLabel(label);
    setUniStateValue(value);
    handleSearch();
  };

  const redirectToAdManagerList = (data) => {
    history.push(`/universityAdmissionManagers/${data}`);
  };

  const redirectToAdOfficerList = (data) => {
    history.push(`/universityAdmissionOfficers/${data}`);
  };

  const selectProviderState = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setUniStateLabel("State");
    setUniStateValue(0);
    setUniversityStates([]);
    setUniTypeLabel("Type");
    setUniTypeValue(0);
    setUniCountryLabel("Country");
    setUniCountryValue(0);
    setSearchStr("");
    setProviderLabel("Provider");
    setProviderValue(0);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // redirect to campus list
  const redirectToCampusList = (id) => {
    localStorage.setItem("universityId", id);
    history.push({
      pathname: `/campusList/${id}`,
      id,
    });
  };

  // deleteing university

  const handleDeleteUniversity = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`University/Delete/${delData?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setSuccess(!success);
        setDeleteModal(false);
        setProgress(false);
      } else {
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setDeleteModal(false);
        setSuccess(!success);
        setProgress(false);
      }
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // deleting university end

  const handleEdit = (data) => {
    // localStorage.removeItem("id");
    // localStorage.setItem("id", data?.id);
    // localStorage.setItem('editMethod','put');

    history.push(`/addUniversity/${data?.id}`);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(universityList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleRedirectToSubList = (id) => {
    localStorage.setItem("uniIdForSubList", id);
    history.push("/subjectList");
  };

  const redirectToApplications = (universityId, universityName) => {
    history.push({
      pathname: `/applicationsFromUniversity/${universityId}`,
      universityIdFromUniList: universityId,
      universityName: universityName,
    });
  };

  const redirectToUniprofile = (uniId) => {
    history.push(`/universityDetails/${uniId}`);
  };

  const handleUpdateStatus = (data) => {
    put(`University/UpdateStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  // for hide/unhide column

  const handleCheckedLogo = (e) => {
    setCheckLogo(e.target.checked);
  };
  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };

  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };

  const handleCheckedCountry = (e) => {
    setCheckCountry(e.target.checked);
  };

  const handleAdManager = (e) => {
    setAdmanager(e.target.checked);
  };
  const handleAdOfficer = (e) => {
    setAdOfficer(e.target.checked);
  };

  const handleCheckedCampus = (e) => {
    setCheckCampus(e.target.checked);
  };

  const handleCheckedAppli = (e) => {
    setCheckAppli(e.target.checked);
  };
  const handleCheckedProg = (e) => {
    setCheckProg(e.target.checked);
  };
  const handleCheckedStatus = (e) => {
    setCheckStatus(e.target.checked);
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
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">University List</h3>
              <div className="page-header-back-to-home">
                <span onClick={backToDashboard} className="text-white">
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i>{" "}
                  {counId !== undefined
                    ? "Back to University Countries"
                    : univerTypeId !== undefined
                    ? "Back to University Types"
                    : provideId !== undefined
                    ? "Back to Provider List"
                    : "Back to Dashboard"}
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <div className="test-score-div-1-style mt-1 mb-4">
                {/* <span className="test-score-span-1-style">
              <b>Assign or Revoke Menu for User Types.</b>
            </span>

            <br /> */}
                <div>
                  This page contains the list of all universities, you can view
                  and edit any information of each university from here.
                </div>
              </div>

              <Row>
                <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                  <Select
                    options={universityTypeName}
                    value={{ label: uniTypeLabel, value: uniTypeValue }}
                    onChange={(opt) => selectUniType(opt.label, opt.value)}
                    name="UniversityTypeId"
                    id="UniversityTypeId"
                    isDisabled={univerTypeId !== undefined ? true : false}
                  />
                </Col>

                <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                  <Select
                    options={universityCountryName}
                    value={{ label: uniCountryLabel, value: uniCountryValue }}
                    onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                    name="UniversityCountryId"
                    id="UniversityCountryId"
                    isDisabled={counId !== undefined ? true : false}
                  />
                </Col>

                <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                  <Select
                    options={universityStateName}
                    value={{ label: uniStateLabel, value: unistateValue }}
                    onChange={(opt) => selectUniState(opt.label, opt.value)}
                    name="UniversityStateId"
                    id="UniversityStateId"
                  />
                </Col>
                {!(
                  userType == userTypes?.Provider ||
                  userType == userTypes?.ProviderAdmin ||
                  userType == userTypes?.AdmissionManager
                ) ? (
                  <Col lg="2" md="3" sm="6" xs="6">
                    <Select
                      options={providerlist}
                      value={{ label: providerLabel, value: providerValue }}
                      onChange={(opt) =>
                        selectProviderState(opt.label, opt.value)
                      }
                      name="providerId"
                      id="providerId"
                      isDisabled={provideId !== undefined ? true : false}
                    />
                  </Col>
                ) : null}

                <Col lg="4" md="4" sm="6" xs="6">
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
                </Col>

                {/* <Col lg="3" md="3" sm="6" xs="6">
              <div className="uapp-Search-div">
                <span>Reset</span>
            
              </div>
            </Col> */}
              </Row>

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

          {/* this portion is saved in text-file in desktop */}
          <Card className="uapp-employee-search">
            <CardBody>
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  {permissions?.includes(permissionList.Add_New_University) ? (
                    <ButtonForFunction
                      func={handleAddUniversity}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add University"}
                      permission={6}
                    />
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex flex-wrap justify-content-end">
                    {/* <Row className="justify-content-end ml-1 mr-1"> */}
                    {/* <Col lg="2">
                    
                    <div className='ml-2'>
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
                    <div className="me-3 mb-2">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Order By :</div>
                        <div>
                          <Select
                            className="mr-md-2 mr-sm-0"
                            options={orderName}
                            value={{ label: orderLabel, value: orderValue }}
                            onChange={(opt) =>
                              selectOrder(opt.label, opt.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

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
                              <p className="">Logo</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedLogo(e);
                                  }}
                                  defaultChecked={checkLogo}
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
                              <p className="">Type</p>
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
                              <p className="">Country</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedCountry(e);
                                  }}
                                  defaultChecked={checkCountry}
                                />
                              </FormGroup>
                            </Col>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Admission Manager</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleAdManager(e);
                                  }}
                                  defaultChecked={adManager}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Admission Officer</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleAdOfficer(e);
                                  }}
                                  defaultChecked={adOfficer}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Campus</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedCampus(e);
                                  }}
                                  defaultChecked={checkCampus}
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

                        {checkLogo ? <th>Logo</th> : null}

                        {checkName ? <th>Name</th> : null}

                        {checkType ? <th>Type</th> : null}

                        {checkCountry ? <th>Country</th> : null}

                        {permissions?.includes(
                          permissionList?.View_Admission_manager_university_List
                        ) ? (
                          <>{adManager ? <th>ADM</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList?.View_Admission_Officer_university_List
                        ) ? (
                          <>{adOfficer ? <th>ADO</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_UniversityCampus_List
                        ) ? (
                          <> {checkCampus ? <th>Campus</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_Applicationinfo_List
                        ) ? (
                          <>{checkAppli ? <th>Applications</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_subject_List
                        ) ? (
                          <> {checkProg ? <th>Programs</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList?.Change_Status_University
                        ) ? (
                          <>{checkStatus ? <th>Status</th> : null}</>
                        ) : null}

                        {checkAction ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {universityList?.map((university, i) => (
                        <tr
                          key={university?.id}
                          style={{ textAlign: "center" }}
                        >
                          {checkSlNo ? (
                            <th scope="row">{serialNum + i}</th>
                          ) : null}

                          {checkLogo ? (
                            <td>
                              {university?.universityLogo == null ? (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image bg-white"
                                    src={uapploader}
                                    alt="university_logo"
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image"
                                    src={
                                      rootUrl +
                                      university?.universityLogo?.thumbnailUrl
                                    }
                                    alt="university_logo"
                                  />{" "}
                                </>
                              )}
                            </td>
                          ) : null}

                          {checkName ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  history.push(
                                    `/universityDetails/${university?.id}`
                                  );
                                }}
                              >
                                {university?.name} ({university?.shortName})
                              </span>
                            </td>
                          ) : null}

                          {checkType ? (
                            <td>{university?.universityType?.name}</td>
                          ) : null}

                          {checkCountry ? (
                            <td>
                              {university?.universityCountry?.name} (
                              {university?.universityState?.name})
                            </td>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.View_Admission_manager_university_List
                          ) ? (
                            <>
                              {adManager ? (
                                <td>
                                  <span
                                    className="badge badge-secondary"
                                    onClick={() =>
                                      redirectToAdManagerList(university?.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    View
                                  </span>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.View_Admission_Officer_university_List
                          ) ? (
                            <>
                              {adOfficer ? (
                                <td>
                                  <span
                                    className="badge badge-secondary"
                                    onClick={() =>
                                      redirectToAdOfficerList(university?.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    View
                                  </span>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_UniversityCampus_List
                          ) ? (
                            <>
                              {" "}
                              {checkCampus ? (
                                <td>
                                  {/* <span onClick={()=>redirectToCampusList(university?.id)}
                          className="badge badge-secondary"
                          style={{ cursor: "pointer" }}
                        >
                          {university?.totalCampus}
                        </span> */}

                                  <SpanButton
                                    func={() =>
                                      redirectToCampusList(university?.id)
                                    }
                                    className={"badge badge-secondary"}
                                    style={{ cursor: "pointer" }}
                                    data={university?.totalCampus}
                                    permission={6}
                                  />
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Applicationinfo_List
                          ) ? (
                            <>
                              {checkAppli ? (
                                <td>
                                  {/* <span
                            className="badge badge-primary"
                            style={{ cursor: "pointer" }}
                          >
                            {university?.totalApplication}
                          </span> */}

                                  {university?.totalApplication > 0 ? (
                                    <SpanButton
                                      func={() =>
                                        redirectToApplications(
                                          university?.id,
                                          university?.name
                                        )
                                      }
                                      className={"badge badge-primary"}
                                      style={{ cursor: "pointer" }}
                                      data={university?.totalApplication}
                                      permission={6}
                                    />
                                  ) : (
                                    <SpanButton
                                      className={"badge badge-primary"}
                                      data={university?.totalApplication}
                                      permission={6}
                                    />
                                  )}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {/* <td onClick={()=>handleRedirectToSubList(university?.id)}> */}

                          {permissions?.includes(
                            permissionList.View_subject_List
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
                                    {/* <Link className="text-decoration-none" to ={{
                           pathname: '/subjectList',
                           universityId: university?.id,
                           universityName: university?.name,
                         }}> 
                        <span> {university?.totalSubject} </span>
                        </Link> */}

                                    <LinkSpanButton
                                      className={"text-decoration-none"}
                                      url={{
                                        pathname: `/universitySubjectList/${university?.id}`,
                                        universityId: university?.id,
                                        universityName: university?.name,
                                      }}
                                      data={university?.totalSubject}
                                      permission={6}
                                    />
                                  </span>{" "}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.Change_Status_University
                          ) ? (
                            <>
                              {checkStatus ? (
                                <td>
                                  <ToggleSwitch
                                    defaultChecked={university?.isActive}
                                    onChange={() =>
                                      handleUpdateStatus(university)
                                    }
                                  />
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {checkAction ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {/* <LinkButton
                            url={`/universityDetails/${university?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}

                                {permissions?.includes(
                                  permissionList.View_University_info
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      redirectToUniprofile(university?.id)
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {/* <Link to= {`/updateUniversityInformation/${university?.id}`}> */}

                                {permissions?.includes(
                                  permissionList.Update_University_info
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleEdit(university)}
                                    color={"warning"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-edit"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {/* </Link> */}

                                {permissions?.includes(
                                  permissionList.Delete_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() => toggleDanger(university)}
                                    color={"danger"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                ) : null}
                              </ButtonGroup>

                              {/* modal for delete */}
                              <Modal
                                isOpen={deleteModal}
                                toggle={closeDeleteModal}
                                className="uapp-modal"
                              >
                                <ModalBody>
                                  <p>
                                    Are You Sure to Delete this{" "}
                                    {localStorage.getItem("depName")} ? Once
                                    Deleted it can't be Undone!
                                  </p>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={handleDeleteUniversity}
                                    disabled={buttonStatus}
                                  >
                                    {progress ? <ButtonLoader /> : "YES"}
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
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
  univerSityDropDownList: state.universityListReducer.universityList,
});
export default connect(mapStateToProps)(UniversityList);
