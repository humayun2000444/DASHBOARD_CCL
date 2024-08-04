import React, { useEffect, useState, Component, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import loader from "../../../assets/img/load.gif";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";

// import { permissionList } from '../../../../constants/AuthorizationConstant';
import { permissionList } from "../../../constants/AuthorizationConstant";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as XLSX from "xlsx/xlsx.mjs";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print";

import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";
import Pagination from "../../services/Pagination/Pagination.jsx";

import ButtonForFunction from "../Components/ButtonForFunction";
import LinkButton from "../Components/LinkButton";
import { userTypes } from "../../../constants/userTypeConstant";
import put from "../../../helpers/put";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import post from "../../../helpers/post";
import ToggleSwitch from "../Components/ToggleSwitch";
import { rootUrl } from "../../../constants/constants";
import ButtonLoader from "../Components/ButtonLoader";

const AdmissionOfficerList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [managerDD, setManagerDD] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);

  const [universityStates, setUniversityStates] = useState([]);

  const [officerList, setOfficerList] = useState([]);

  const [officerName, setOfficerName] = useState("");
  const [officerId, setOfficerId] = useState(0);
  const [deleteData, setDeleteData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);

  const [countryError, setCountryError] = useState(false);

  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  const [nameTitleDD, setNameTitleDD] = useState([]);

  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);

  const [nameTitleError, setNameTitleError] = useState(false);

  const [providerDD, setProviderDD] = useState([]);
  const [providerLabel, setProviderLabel] = useState("Select Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [providerError, setProviderError] = useState(false);

  const [managerDDForm, setManagerDDForm] = useState([]);
  const [managerFormLabel, setManagerFormLabel] = useState(
    "Select Admission Manager"
  );
  const [managerFormValue, setManagerFormValue] = useState(0);
  const [managerFormError, setManagerFormError] = useState(false);

  const [emailError, setEmailError] = useState(true);
  const [officerObj, setOfficerObj] = useState({});
  const [selectedId, setSelectedId] = useState(undefined);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkId, setCheckId] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkPro, setCheckPro] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [checkAssign, setCheckAssign] = useState(true);
  const [sub, setSub] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();
  const { providerId, managerId } = useParams();

  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [proLabel, setProLabel] = useState("Select Provider");
  const [proValue, setProValue] = useState(0);
  const [progress, setProgress] = useState(false);

  const [imgError, setImgError] = useState(false);
  const [mId, setMId] = useState(0);

  const [error, setError] = useState(false);

  // useEffect(() => {
  //   get("CountryDD/index").then((res) => {
  //     setCountryList(res);
  //   });

  //   get("NameTittleDD/index").then((res) => {
  //     setNameTitleDD(res);
  //   });

  //   if (providerId) {
  //     get("ProviderDD/Index").then((res) => {
  //       setProviderDD(res);
  //       const result = res?.find((ans) => ans?.id == providerId);
  //       setProLabel(result?.name);

  //     });
  //     get(`AdmissionManagerDD/Index/${providerId}`).then((res) => {
  //       setManagerDDForm(res);
  //       if (managerId) {
  //         const result = res?.find((ans) => ans?.id == managerId);

  //         setManagerLabel(result?.name);

  //       }
  //     });
  //   } else {
  //     get("ProviderDD/Index").then((res) => {
  //       setProviderDD(res);
  //     });
  //   }

  //   // setLoading(true);
  //   // setLoading(false);

  //   if (providerId !== undefined && managerId !== undefined) {
  //     get(
  //       `AdmissionOfficer/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&providerId=${providerId}&admissionmanagerId=${managerId}&search=${searchStr}`
  //     ).then((res) => {
  //       setOfficerList(res?.models);
  //       setEntity(res?.totalEntity);
  //       setSerialNum(res?.firstSerialNumber);

  //       setLoading(false);
  //     });
  //   } else {
  //     get(
  //       `AdmissionOfficer/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&providerId=${proValue}&admissionmanagerId=${managerValue}&search=${searchStr}`
  //     ).then((res) => {
  //       setOfficerList(res?.models);
  //       setEntity(res?.totalEntity);
  //       setSerialNum(res?.firstSerialNumber);
  //       setLoading(false);
  //     });
  //   }
  // }, [
  //   currentPage,
  //   dataPerPage,
  //   managerValue,
  //   searchStr,
  //   success,
  //   // loading,
  //   proValue,
  // ]);

  // useEffect(() => {
  //   if (userType == userTypes?.AdmissionManager) {
  //     get(`AdmissionManager/Profile/${referenceId}`).then((res) => {
  //       setManagerValue(res?.id);
  //       setProValue(res?.providerId);
  //     });
  //   }

  //   if (userType == userTypes?.ProviderAdmin) {
  //     get(`ProviderAdmin/Get/${referenceId}`).then((res) => {
  //       setProValue(res?.providerId);
  //       get(`AdmissionManagerDD/Index/${res?.providerId}`).then((res) => {
  //         setManagerDD(res);
  //       });
  //     });

  //     get(
  //       `Provideradmin/GetProviderId/${localStorage.getItem("referenceId")}`
  //     ).then((res) => {
  //       setMId(res);
  //     });

  //     get(
  //       `AdmissionManagerDD/Index/${localStorage.getItem("referenceId")}`
  //     ).then((res) => {
  //       setManagerDDForm(res);
  //     });
  //   }
  // }, []);

  const managerMenu = managerDD.map((manager) => ({
    label: manager?.name,
    value: manager?.id,
  }));

  const handlePass = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

  const selectManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
  };

  const managerMenuForm = managerDDForm.map((managerForm) => ({
    label: managerForm?.name,
    value: managerForm?.id,
  }));

  const selectManagerForm = (label, value) => {
    setManagerFormError(false);
    setManagerFormLabel(label);
    setManagerFormValue(value);
  };

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // Trial start

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError("");
    }
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setCountryError(false);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    get(`StateDD/Index/${value}`).then((res) => {
      // setUniStateLabel(res.name)
      // setUniStateValue(res.id)
      setUniversityStates(res);
    });
  };

  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const nameTitleMenu = nameTitleDD?.map((nameTitle) => ({
    label: nameTitle?.name,
    value: nameTitle?.id,
  }));

  //   select name title
  const selectNameTitle = (label, value) => {
    setNameTitleError(false);
    setNameTitleLabel(label);
    setNameTitleValue(value);
  };

  const providerMenu = providerDD?.map((provider) => ({
    label: provider?.name,
    value: provider?.id,
  }));

  //   select provider
  const selectProvider = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
    setManagerFormLabel("Select Admission Manager");
    setManagerFormValue(0);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setManagerDDForm(res);
    });
  };

  const selectProviders = (label, value) => {
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setProLabel(label);
    setProValue(value);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setManagerDD(res);
      // setUniStateLabel(res.name)
      // setUniStateValue(res.id)
      // setUniversityStates(res);
    });
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

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

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(officerList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setProLabel("Select Provider");
    setProValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    history.replace({
      universityId: null,
    });
  };

  // redirect to dashboard
  const backToDashboard = () => {
    if (providerId !== undefined && managerId !== undefined) {
      history.push("/admissionManagerList");
    } else {
      history.push("/");
    }
  };

  const redirectToOfficerAssignPage = (officerId) => {
    history.push({
      pathname: `/assignAdmissionOfficer/${officerId}`,
      officerList: "officerList",
    });
  };

  const handleViewAdmissionManager = (managerId, providerId) => {
    history.push({
      pathname: `/providerAdmissionManager/${managerId}/${providerId}`,
      managerList: "managerList",
    });
  };

  // const updateAdmissionManager = (managerId, providerId) => {
  //   history.push({
  //       pathname: `/updateAdmissionManager/${managerId}/${providerId}`,
  //       managerList: "managerList"
  //   });
  // };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setOfficerId(0);
    setOfficerName("");
    setDeleteData({});
  };

  const handleDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`AdmissionOfficer/Delete/${deleteData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setDeleteModal(false);
      setOfficerId(0);
      setOfficerName("");
      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const handleAccountStatus = (e, officerId) => {
    // setChecked(e.target.checked);

    const subData = {
      id: officerId,
    };

    put(`AdmissionOfficer/UpdateAccountStatus/${officerId}`, subData).then(
      (res) => {
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
      }
    );
  };

  const redirectToAssignPage = (providerId, managerId) => {
    history.push({
      pathname: `/assignOfficerUniversity/${providerId}/${managerId}`,
      managerList: "managerList",
    });
  };

  const redirectToSubjectPage = (data) => {
    history.push(`/admissionOfficerAssignedSubjects/${data}`);
  };

  // on Close Modal
  const closeModal = () => {
    setSelectedId(undefined);
    setOfficerObj({});
    setNameTitleLabel("Select Title");
    setNameTitleValue(0);
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    setProviderLabel("Select Provider");
    setProviderValue(0);
    setManagerFormLabel("Select Admission Manager");
    setManagerFormValue(0);
    // setCountryError(false);
    // setUniStateError(false);
    // setNameTitleError(false);
    // setProviderError(false);
    // setManagerFormError(false);
    // setEmailError(true);
    setModalOpen(false);
  };

  const handleAddNew = () => {
    setOfficerObj({});
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append(
      "admissionOfficerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    if (userType == userTypes?.ProviderAdmin) {
      if (selectedId === undefined) {
        if (nameTitleValue === 0) {
          setNameTitleError(true);
        } else if (pass.length < 6) {
          setPassError("Password length can not be less than six digits");
        } else if (emailError == false) {
          setEmailError(emailError);
        } else if (uniCountryValue === 0) {
          setCountryError(true);
        } else if (unistateValue === 0) {
          setUniStateError(true);
        } else if (managerFormValue === 0 && selectedId === undefined) {
          setManagerFormError(true);
        } else {
          setOfficerObj({});
          setButtonStatus(true);
          setProgress(true);
          post(`AdmissionOfficer/Create`, subdata).then((res) => {
            setProgress(false);
            setSuccess(!success);
            setButtonStatus(false);

            //   setuniversityId(res?.data?.result?.universityId)
            if (res?.status === 200 && res?.data?.isSuccess == true) {
              // setSubmitData(false);
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });

              setNameTitleLabel("Select Title");
              setNameTitleValue(0);
              setUniCountryLabel("Select Country");
              setUniCountryValue(0);
              setUniStateLabel("Select State");
              setUniStateValue(0);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setManagerFormLabel("Select Admission Manager");
              setManagerFormValue(0);
              setModalOpen(false);
              setFileList([]);
            } else {
              // setSubmitData(false);
              addToast(res.data.message, {
                appearance: "error",
                autoDismiss: true,
              });
              // closeModal();
            }
          });
        }
      } else {
        if (unistateValue === 0) {
          setUniStateError(true);
        } else {
          setButtonStatus(true);
          setProgress(true);
          put(`AdmissionOfficer/Update`, subdata).then((res) => {
            setProgress(false);
            setButtonStatus(false);
            if (res.status === 200 && res.data.isSuccess === true) {
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setNameTitleLabel("Select Title");
              setNameTitleValue(0);
              setUniCountryLabel("Select Country");
              setUniCountryValue(0);
              setUniStateLabel("Select State");
              setUniStateValue(0);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setManagerFormLabel("Select Admission Manager");
              setManagerFormValue(0);
              setOfficerObj({});
              setSelectedId(undefined);
              setSuccess(!success);
              setModalOpen(false);
              setFileList([]);
            }
          });
        }
      }
    } else {
      if (selectedId === undefined) {
        if (nameTitleValue === 0) {
          setNameTitleError(true);
        } else if (pass.length < 6) {
          setPassError("Password length can not be less than six digits");
        } else if (emailError == false) {
          setEmailError(emailError);
        } else if (uniCountryValue === 0) {
          setCountryError(true);
        } else if (unistateValue === 0) {
          setUniStateError(true);
        } else if (providerValue === 0 && selectedId === undefined) {
          setProviderError(true);
        } else if (managerFormValue === 0 && selectedId === undefined) {
          setManagerFormError(true);
        } else {
          setOfficerObj({});
          setButtonStatus(true);
          setProgress(true);
          post(`AdmissionOfficer/Create`, subdata).then((res) => {
            setProgress(false);
            setSuccess(!success);
            setButtonStatus(false);

            //   setuniversityId(res?.data?.result?.universityId)
            if (res?.status === 200 && res?.data?.isSuccess == true) {
              // setSubmitData(false);
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });

              setNameTitleLabel("Select Title");
              setNameTitleValue(0);
              setUniCountryLabel("Select Country");
              setUniCountryValue(0);
              setUniStateLabel("Select State");
              setUniStateValue(0);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setManagerFormLabel("Select Admission Manager");
              setManagerFormValue(0);
              setModalOpen(false);
              setFileList([]);
            } else {
              // setSubmitData(false);
              addToast(res.data.message, {
                appearance: "error",
                autoDismiss: true,
              });
              // closeModal();
            }
          });
        }
      } else {
        if (unistateValue === 0) {
          setUniStateError(true);
        } else {
          setButtonStatus(true);
          setProgress(true);
          put(`AdmissionOfficer/Update`, subdata).then((res) => {
            setProgress(false);
            setButtonStatus(false);
            if (res.status === 200 && res.data.isSuccess === true) {
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setNameTitleLabel("Select Title");
              setNameTitleValue(0);
              setUniCountryLabel("Select Country");
              setUniCountryValue(0);
              setUniStateLabel("Select State");
              setUniStateValue(0);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setManagerFormLabel("Select Admission Manager");
              setManagerFormValue(0);
              setOfficerObj({});
              setSelectedId(undefined);
              setSuccess(!success);
              setModalOpen(false);
              setFileList([]);
            }
          });
        }
      }
    }
  };

  const handleEmail = (e) => {
    get(`Consultant/OnChangeEmail/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const toggleDanger = (officer) => {
    setOfficerId(officer?.id);
    setOfficerName(officer?.firstName);
    setDeleteData(officer);
    setDeleteModal(true);
  };

  const handleUpdate = (officer) => {
    setOfficerObj(officer);
    setNameTitleLabel(officer?.nameTittle?.name);
    setNameTitleValue(officer?.nameTittleId);
    setUniCountryLabel(officer?.country?.name);
    setUniCountryValue(officer?.countryId);
    setUniStateLabel(officer?.state?.name);
    setUniStateValue(officer?.stateId);
    setProviderLabel(officer?.provider?.name);
    setProviderValue(officer?.providerId);
    setSelectedId(officer?.id);
    setModalOpen(true);
  };

  const handlRedirectToAdmissionofficerDetails = (officerId) => {
    history.push(`/admissionOfficerDetails/${officerId}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedId = (e) => {
    setCheckId(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedPro = (e) => {
    setCheckPro(e.target.checked);
  };
  const handleCheckedEmail = (e) => {
    setCheckEmail(e.target.checked);
  };
  const handleCheckedPhn = (e) => {
    setCheckPhn(e.target.checked);
  };
  const handleCheckedCountry = (e) => {
    setCheckCountry(e.target.checked);
  };
  const handleCheckedAssign = (e) => {
    setCheckAssign(e.target.checked);
  };
  const handleCheckedSub = (e) => {
    setSub(e.target.checked);
  };
  const handleCheckedSts = (e) => {
    setCheckSts(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <img src={loader} alt="" className="img-fluid" />
        </div>
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Admission Officer List</h3>
              <div className="page-header-back-to-home">
                <span onClick={backToDashboard} className="text-white">
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i>{" "}
                  {providerId !== undefined && managerId !== undefined
                    ? "Back to Admission Manager List"
                    : "Back to Dashboard"}
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <Row>
                {userType == userTypes?.AdmissionManager ||
                userType == userTypes?.ProviderAdmin ? null : (
                  <Col lg="6" md="6" sm="12" xs="12" className="mb-2">
                    <Select
                      options={providerMenu}
                      value={{ label: proLabel, value: proValue }}
                      onChange={(opt) => selectProviders(opt.label, opt.value)}
                      name="admissionmanagerId"
                      id="admissionmanagerId"
                      isDisabled={providerId !== undefined ? true : false}
                    />
                  </Col>
                )}

                {userType == userTypes?.AdmissionManager ? null : (
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Select
                      options={managerMenu}
                      value={{ label: managerLabel, value: managerValue }}
                      onChange={(opt) => selectManager(opt.label, opt.value)}
                      name="admissionmanagerId"
                      id="admissionmanagerId"
                      isDisabled={managerId !== undefined ? true : false}
                    />
                  </Col>
                )}
              </Row>

              <Row className="mt-2">
                <Col lg="6" md="6" sm="12" xs="12">
                  <Input
                    style={{ height: "2.7rem" }}
                    type="text"
                    name="search"
                    value={searchStr}
                    id="search"
                    placeholder="Name"
                    onChange={searchValue}
                    onKeyDown={handleKeyDown}
                  />
                </Col>
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
                  {permissions?.includes(
                    permissionList.Add_New_Admissionofficer
                  ) ? (
                    <ButtonForFunction
                      func={handleAddNew}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add Admission Officer"}
                      permission={6}
                    />
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
                  <div className="d-flex justify-content-md-end justify-content-sm-start">
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
                        <div className="mr-2">
                          <Select
                            options={dataSizeName}
                            value={{ label: dataPerPage, value: dataPerPage }}
                            onChange={(opt) => selectDataSize(opt.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
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

                    <div className="ml-3">
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
                              <p className="">UAPP ID</p>
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
                              <p className="">Provider</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPro(e);
                                  }}
                                  defaultChecked={checkPro}
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
                              <p className="">Assigned University</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedAssign(e);
                                  }}
                                  defaultChecked={checkAssign}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Assigned Subject</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedSub(e);
                                  }}
                                  defaultChecked={sub}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Account Status</p>
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

              {/* add / update modal */}

              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal4"
                // style={{ height: "5px" }}
                size="lg"
              >
                <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                  <span className="text-white">Admission Officer</span>
                </ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    {selectedId != undefined ? (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Input
                          type="hidden"
                          id="id"
                          name="id"
                          value={selectedId}
                        />
                      </FormGroup>
                    ) : null}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Title <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={nameTitleMenu}
                          value={{
                            label: nameTitleLabel,
                            value: nameTitleValue,
                          }}
                          onChange={(opt) =>
                            selectNameTitle(opt.label, opt.value)
                          }
                          name="nameTittleId"
                          id="nameTittleId"
                        />

                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                        {nameTitleError ? (
                          <span className="text-danger">Title is required</span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          First Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          defaultValue={officerObj?.firstName}
                          placeholder="Type First Name"
                          required
                        />
                        {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Last Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          defaultValue={officerObj?.lastName}
                          placeholder="Type Last Name"
                          required
                        />
                        {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                      </Col>
                    </FormGroup>

                    {selectedId === undefined ? (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            Email <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            onBlur={handleEmail}
                            defaultValue={officerObj?.email}
                            placeholder="Type Your Email"
                            required
                          />
                          {!emailError ? (
                            <span className="text-danger">
                              Email already exists.
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                    ) : null}

                    {selectedId != undefined ? null : (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            Password <span className="text-danger">*</span>
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Type Your Password"
                            required
                            onChange={handlePass}
                          />
                          <span className="text-danger">{passError}</span>
                        </Col>
                      </FormGroup>
                    )}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Phone Number <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          defaultValue={officerObj?.phoneNumber}
                          placeholder="Type Your Phone Number"
                          required
                        />
                        {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Country <span className="text-danger">*</span>{" "}
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
                          name="countryId"
                          id="countryId"
                        />

                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                        {countryError ? (
                          <span className="text-danger">
                            Country is required
                          </span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          State <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={universityStateName}
                          value={{ label: uniStateLabel, value: unistateValue }}
                          onChange={(opt) =>
                            selectUniState(opt.label, opt.value)
                          }
                          name="stateId"
                          id="stateId"
                        />

                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                        {uniStateError ? (
                          <span className="text-danger">State is required</span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    {userType == userTypes?.ProviderAdmin ? (
                      <input
                        type="hidden"
                        name="providerId"
                        id="providerId"
                        value={mId}
                      />
                    ) : (
                      <>
                        {selectedId != undefined ? null : (
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Provider <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={providerMenu}
                                value={{
                                  label: providerLabel,
                                  value: providerValue,
                                }}
                                onChange={(opt) =>
                                  selectProvider(opt.label, opt.value)
                                }
                                name="providerId"
                                id="providerId"
                              />

                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}

                              {providerError ? (
                                <span className="text-danger">
                                  Provider is required
                                </span>
                              ) : null}
                            </Col>
                          </FormGroup>
                        )}
                      </>
                    )}

                    {selectedId != undefined ? null : (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            Admission Manager{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Select
                            options={managerMenuForm}
                            value={{
                              label: managerFormLabel,
                              value: managerFormValue,
                            }}
                            onChange={(opt) =>
                              selectManagerForm(opt.label, opt.value)
                            }
                            name="admissionmanagerId"
                            id="admissionmanagerId"
                          />

                          {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}

                          {managerFormError ? (
                            <span className="text-danger">
                              Admission manager is required
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                    )}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          City <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          defaultValue={officerObj?.city}
                          placeholder="Type City Name"
                          required
                        />
                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Post Code <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="postCode"
                          id="postCode"
                          defaultValue={officerObj?.postCode}
                          placeholder="Type Post Code"
                          required
                        />
                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>Image</span>
                      </Col>
                      <Col md="6">
                        <div className="row">
                          {officerObj?.id ? (
                            <div className="col-md-3 mr-3">
                              <Image
                                width={104}
                                height={104}
                                src={
                                  rootUrl +
                                  officerObj?.admissionOfficerMedia?.fileUrl
                                }
                              />
                            </div>
                          ) : null}

                          <div className="col-md-3">
                            <>
                              <Upload
                                listType="picture-card"
                                multiple={false}
                                fileList={FileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={(file) => {
                                  return false;
                                }}
                              >
                                {FileList.length < 1 ? (
                                  <div
                                    className="text-danger"
                                    style={{ marginTop: 8 }}
                                  >
                                    <Icon.Upload />
                                    <br />
                                    <span>Upload Image Here</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Upload>
                              <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage}
                                />
                              </Modal>
                              <span className="text-danger d-block">
                                {error}
                              </span>
                            </>
                          </div>
                        </div>
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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
                        className={"mr-1 mt-3"}
                        name={progress ? <ButtonLoader /> : "Submit"}
                        permission={6}
                        isDisabled={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>

              <div className="table-responsive" ref={componentRef}>
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      {checkSlNo ? <th>SL/NO</th> : null}
                      {checkId ? <th>UAPP ID</th> : null}
                      {checkName ? <th>Name</th> : null}
                      {checkPro ? <th>Provider</th> : null}
                      {checkEmail ? <th>Email</th> : null}
                      {checkPhn ? <th>Phone No</th> : null}
                      {checkCountry ? <th>Country</th> : null}
                      {permissions?.includes(
                        permissionList.View_Admission_Officer_university_List
                      ) ? (
                        <>{checkAssign ? <th>Assigned University</th> : null}</>
                      ) : null}
                      {permissions?.includes(
                        permissionList?.View_Admissionofficer_Subject_list
                      ) ? (
                        <>{sub ? <th>Assigned Subject</th> : null}</>
                      ) : null}
                      {permissions?.includes(
                        permissionList.Change_Status_AdmissionOfficer
                      ) ? (
                        <>{checkSts ? <th>Account Status</th> : null}</>
                      ) : null}
                      {/* <th>Assigned Admission Officer</th> */}
                      {checkAction ? (
                        <th style={{ width: "8%" }} className="text-center">
                          Action
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {officerList?.map((officer, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        {checkSlNo ? <th scope="row">{1 + i}</th> : null}
                        {checkId ? (
                          <td className="cursor-pointer hyperlink-hover">
                            <span
                              onClick={() => {
                                history.push(
                                  `/admissionOfficerDetails/${officer?.id}`
                                );
                              }}
                            >
                              {officer?.sequenceId}
                            </span>
                          </td>
                        ) : null}

                        {checkName ? (
                          <td className="cursor-pointer hyperlink-hover">
                            <span
                              onClick={() => {
                                history.push(
                                  `/admissionOfficerDetails/${officer?.id}`
                                );
                              }}
                            >
                              {officer?.nameTittle?.name} {officer?.firstName}{" "}
                              {officer?.lastName}
                            </span>
                          </td>
                        ) : null}

                        {checkPro ? <td>{officer?.provider?.name}</td> : null}

                        {checkEmail ? <td>{officer?.email}</td> : null}

                        {checkPhn ? <td>{officer?.phoneNumber}</td> : null}

                        {checkCountry ? (
                          <td>
                            {officer?.country?.name} ({officer?.state?.name})
                          </td>
                        ) : null}
                        {permissions?.includes(
                          permissionList.View_Admission_Officer_university_List
                        ) ? (
                          <>
                            {checkAssign ? (
                              <td>
                                {" "}
                                <span
                                  className="badge badge-secondary"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span
                                    onClick={() =>
                                      redirectToAssignPage(
                                        officer?.provider?.id,
                                        officer?.id
                                      )
                                    }
                                    className="text-decoration-none"
                                  >
                                    View
                                  </span>
                                </span>{" "}
                              </td>
                            ) : null}
                          </>
                        ) : null}
                        {permissions?.includes(
                          permissionList.View_Admissionofficer_Subject_list
                        ) ? (
                          <>
                            {sub ? (
                              <td>
                                {" "}
                                <span
                                  className="badge badge-secondary"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span
                                    onClick={() =>
                                      redirectToSubjectPage(officer?.id)
                                    }
                                    className="text-decoration-none"
                                  >
                                    View
                                  </span>
                                </span>{" "}
                              </td>
                            ) : null}
                          </>
                        ) : null}

                        {permissions?.includes(
                          permissionList.Change_Status_AdmissionOfficer
                        ) ? (
                          <>
                            {checkSts ? (
                              <td>
                                {
                                  // <label className="switch">
                                  //   <input
                                  //     type="checkbox"
                                  //     defaultChecked={
                                  //       officer?.isActive == false ? false : true
                                  //     }
                                  //     onChange={(e) => {
                                  //       handleAccountStatus(e, officer?.id);
                                  //     }}
                                  //   />
                                  //   <span className="slider round"></span>
                                  // </label>

                                  <ToggleSwitch
                                    defaultChecked={
                                      officer?.isActive == false ? false : true
                                    }
                                    onChange={(e) => {
                                      handleAccountStatus(e, officer?.id);
                                    }}
                                  />
                                }
                              </td>
                            ) : null}
                          </>
                        ) : null}

                        {/* <td>
                      {" "}
                      <span
                        className="badge badge-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        
                        <span onClick={()=>redirectToOfficerAssignPage(officer?.id)} className="text-decoration-none">View</span>
                      </span>{" "}     
                    </td> */}

                        {checkAction ? (
                          <td style={{ width: "8%" }} className="text-center">
                            <ButtonGroup variant="text">
                              {permissions?.includes(
                                permissionList?.View_Admissionofficer_info
                              ) ? (
                                <ButtonForFunction
                                  func={() =>
                                    handlRedirectToAdmissionofficerDetails(
                                      officer?.id
                                    )
                                  }
                                  color={"primary"}
                                  className={"mx-1 btn-sm"}
                                  icon={<i className="fas fa-eye"></i>}
                                  permission={6}
                                />
                              ) : null}

                              {permissions?.includes(
                                permissionList.Update_Admissionofficer_info
                              ) ? (
                                <ButtonForFunction
                                  func={() => handleUpdate(officer)}
                                  color={"warning"}
                                  className={"mx-1 btn-sm"}
                                  icon={<i className="fas fa-edit"></i>}
                                  permission={6}
                                />
                              ) : null}

                              {permissions?.includes(
                                permissionList.Delete_Admissionofficer
                              ) ? (
                                <ButtonForFunction
                                  color={"danger"}
                                  func={() => toggleDanger(officer)}
                                  className={"mx-1 btn-sm"}
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  permission={6}
                                />
                              ) : null}
                            </ButtonGroup>

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{officerName}</b> ? Once Deleted it can't
                                  be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={handleDelete}
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

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />

              {/* <Row className="mb-3">
            <Col lg="6">
              
            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
               <div className='d-flex justify-content-end'>
               <Button
                   onClick={handleNextTab}
                   className="btn btn-uapp-add "
                    >
                    {" "}
                     Next tab
                    {" "}
               </Button>
               </div>
             </Col>
          </Row> */}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdmissionOfficerList;
