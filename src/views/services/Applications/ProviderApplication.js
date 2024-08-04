import React, { useEffect, useState, useRef } from "react";
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
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Pagination from "../../services/Pagination/Pagination.jsx";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove.js";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkButton from "../Components/LinkButton.js";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import LinkSpanButton from "../Components/LinkSpanButton.js";
import CommonFilter from "./CommonFilter.js";
import ConsultantFilter from "./ConsultantFilter.js";
import StudentFilter from "./StudentFilter.js";
import AdmissionManagerFilter from "./AdmissionManagerFilter.js";
import ProviderAdminFilter from "./ProviderAdminFilter.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import Loader from "../Search/Loader/Loader.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";

const ProviderApplication = ({ currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [orderLabel, setOrderLabel] = useState("Select Order By");
  const [orderValue, setOrderValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [applicationDD, setApplicationDD] = useState([]);
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // for provider admin
  const [providerUappIdDD, setProviderUappIdDD] = useState([]);
  const [providerUappIdLabel, setProviderUappIdLabel] = useState("UAPP ID");
  const [providerUappIdValue, setProviderUappIdValue] = useState(0);

  const [providerStdDD, setProviderStdDD] = useState([]);
  const [providerStdLabel, setProviderStdLabel] = useState("Name");
  const [providerStdvalue, setProviderStdValue] = useState(0);

  const [providerConsDD, setProviderConsDD] = useState([]);
  const [providerConsLabel, setProviderConsLabel] = useState("Consultant");
  const [providerConsValue, setProviderConsValue] = useState(0);

  const [providerUniDD, setProviderUniDD] = useState([]);
  const [providerUniLabel, setProviderUniLabel] = useState("University Name");
  const [providerUniValue, setProviderUniValue] = useState(0);

  const [providerPhoneDD, setProviderPhoneDD] = useState([]);
  const [providerPhoneLabel, setproviderPhoneLabel] = useState("Phone No.");
  const [providerPhoneValue, setproviderPhoneValue] = useState(0);

  // for all
  const [applicationLabel, setApplicationLabel] = useState("Status");
  const [applicationValue, setApplicationValue] = useState(0);
  const [offerLabel, setOfferLabel] = useState("Offer");
  const [offerValue, setOfferValue] = useState(0);
  const [enrollLabel, setEnrollLabel] = useState("Enrolment Status");
  const [enrollValue, setEnrollValue] = useState(0);
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [interviewLabel, setInterviewLabel] = useState("Interview");
  const [interviewValue, setInterviewValue] = useState(0);
  const [elptLabel, setElptLabel] = useState("ELPT");
  const [elptValue, setElptValue] = useState(0);
  const [financeLabel, setFinanceLabel] = useState("SLCs");
  const [financeValue, setFinanceValue] = useState(0);

  // application list
  const [applicationList, setApplicationList] = useState([]);
  const [serialNumber, setSerialNumber] = useState(0);

  const [cId, setConsId] = useState(undefined);
  const [uId, setUniId] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  // for hide/unhide column
  const [checkId, setCheckId] = useState(true);
  const [checkAppId, setCheckAppId] = useState(true);
  const [checkApplic, setCheckApplic] = useState(true);
  const [checkContact, setCheckContact] = useState(false);
  const [checkUni, setCheckUni] = useState(true);
  const [checkCamp, setCheckCamp] = useState(true);
  const [checkCourse, setCheckCourse] = useState(true);
  const [checkIntake, setCheckIntake] = useState(true);
  const [checkDate, setCheckDate] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkOfr, setCheckOfr] = useState(true);
  const [checkIntrv, setCheckIntrv] = useState(false);
  const [checkElpt, setCheckElpt] = useState(false);
  const [checkEnSts, setCheckEnSts] = useState(true);
  const [checkSlcs, setCheckEnSlcs] = useState(true);
  const [checkCons, setCheckCons] = useState(false);
  const [checkAction, setCheckAction] = useState(false);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const { consultantId, universityId, status, selector } = useParams();

  // for all dropdown
  const applicationMenu = applicationDD.map((application) => ({
    label: application?.name,
    value: application?.id,
  }));
  const offerMenu = offerDD.map((offer) => ({
    label: offer?.name,
    value: offer?.id,
  }));
  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));
  const intakeMenu = intakeDD.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));
  const interviewMenu = interviewDD.map((interview) => ({
    label: interview?.name,
    value: interview?.id,
  }));
  const elptMenu = elptDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));
  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));

  // for provide admin dropdown
  const providerUappIdMenu = providerUappIdDD.map((uappId) => ({
    label: uappId?.name,
    value: uappId?.id,
  }));
  const providerStdMenu = providerStdDD.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));
  const providerConsMenu = providerConsDD.map((consultant) => ({
    label: consultant?.name,
    value: consultant?.id,
  }));
  const providerUniMenu = providerUniDD.map((university) => ({
    label: university?.name,
    value: university?.id,
  }));
  const providerPhoneMenu = providerPhoneDD.map((phone) => ({
    label: phone?.name,
    value: phone?.id,
  }));

  const selectAppliDD = (label, value) => {
    setApplicationLabel(label);
    setApplicationValue(value);
    // handleSearch();
  };
  const selectOfferDD = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
    // handleSearch();
  };
  const selectEnrollDD = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
    // handleSearch();
  };
  const selectIntakeDD = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };
  const selectInterviewDD = (label, value) => {
    setInterviewLabel(label);
    setInterviewValue(value);
    // handleSearch();
  };
  const selectElptDD = (label, value) => {
    setElptLabel(label);
    setElptValue(value);
    // handleSearch();
  };
  const selectFinanceDD = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
    // handleSearch();
  };

  const selectUappId = (label, value) => {
    setProviderUappIdLabel(label);
    setProviderUappIdValue(value);
    // handleSearch();
  };

  const selectProviderStd = (label, value) => {
    setProviderStdLabel(label);
    setProviderStdValue(value);
    // handleSearch();
  };

  const selectConsultant = (label, value) => {
    setProviderConsLabel(label);
    setProviderConsValue(value);
    // handleSearch();
  };

  const selectProviderUni = (label, value) => {
    setProviderUniLabel(label);
    setProviderUniValue(value);
    // handleSearch();
  };

  const selectProviderPhone = (label, value) => {
    setproviderPhoneLabel(label);
    setproviderPhoneValue(value);
    // handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setApplicationLabel("Status");
    setApplicationValue(0);
    setOfferLabel("Offer");
    setOfferValue(0);
    setEnrollLabel("Enrolment Status");
    setEnrollValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setProviderUappIdLabel("UAPP ID");
    setProviderUappIdValue(0);
    setProviderStdLabel("Name");
    setProviderStdValue(0);
    setProviderConsLabel("Consultant");
    setProviderConsValue(0);
    setProviderUniLabel("University Name");
    setProviderUniValue(0);
    setproviderPhoneLabel("Phone No.");
    setproviderPhoneValue(0);
  };

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
  ];

  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    // setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    // setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // useEffect(() => {
  //   get("ApplicationStatusDD/Index").then((res) => {
  //     setApplicationDD(res);
  //     if(selector == 1){
  //       const ans = res?.find(a => a?.id == status);

  //       setApplicationLabel(ans?.name);
  //       setApplicationValue(ans?.id);
  //     }

  //   });

  //   get("OfferStatusDD/Index").then((res) => {
  //     setOfferDD(res);
  //     if(selector == 2){
  //       const ans = res?.find(a => a?.id == status);

  //       setOfferLabel(ans?.name);
  //       setOfferValue(ans?.id);
  //     }

  //   });

  //   get("EnrollmentStatusDD/Index").then((res) => {
  //     setEnrollDD(res);
  //     if(selector == 3){
  //       const ans = res?.find(a => a?.id == status);

  //       setEnrollLabel(ans?.name);
  //       setEnrollValue(ans?.id);
  //     }

  //   });

  //   get("IntakeDD/Index").then((res) => {
  //     setIntakeDD(res);
  //   });

  //   get("InterviewStatusDD/Index").then((res) => {
  //     setInterviewDD(res);
  //   });

  //   get("ElptStatusDD/Index").then((res) => {
  //     setElptDD(res);
  //   });
  //   get("StudentFinanceStatusDD/Index").then((res) => {
  //     setFinanceDD(res);
  //   });

  //   // for provider admin

  //     get(`CommonApplicationFilterDD/UappId`).then(
  //       (res) => {
  //         setProviderUappIdDD(res);
  //       }
  //     );
  //     get(`CommonApplicationFilterDD/Student`).then(
  //       (res) => {
  //         setProviderStdDD(res);
  //       }
  //     );
  //     get(`CommonApplicationFilterDD/Consultant`).then(
  //       (res) => {
  //         setProviderConsDD(res);
  //         if(consultantId){
  //           const result = res?.find(ans => ans?.id == consultantId);
  //           setProviderConsLabel(result?.name);
  //           setProviderConsValue(res?.id);
  //         }
  //       }
  //     );
  //     get(`CommonApplicationFilterDD/University`).then(
  //       (res) => {
  //         setProviderUniDD(res);
  //         if(universityId){
  //           const result = res?.find(ans => ans?.id == universityId);
  //           setProviderUniLabel(result?.name);
  //           setProviderUniValue(res?.id);
  //         }
  //       }
  //     );
  //     get(`CommonApplicationFilterDD/PhoneNumber`).then(
  //       (res) => {
  //         setProviderPhoneDD(res);
  //       }
  //     );

  //   if (currentUser != undefined) {
  //     if (consultantId !== undefined) {
  //       get(
  //         `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${providerUappIdValue}&studentId=${providerStdvalue}&consultantId=${consultantId}universityId=${providerUniValue}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}`
  //       ).then((res) => {
  //         setLoading(false);
  //         setApplicationList(res?.models);

  //         setProviderConsLabel(res.models[0]?.consultantName);
  //         setProviderConsValue(consultantId);
  //         setEntity(res?.totalEntity);
  //         setSerialNumber(res?.firstSerialNumber);
  //       });
  //     } else if (universityId !== undefined) {
  //       get(
  //         `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${providerUappIdValue}&studentId=${providerStdvalue}&consultantId=${providerConsValue}&universityId=${universityId}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}`
  //       ).then((res) => {
  //         setLoading(false);
  //         setApplicationList(res?.models);

  //         setProviderUniLabel(res.models[0]?.universityName);
  //         setProviderUniValue(universityId);
  //         setEntity(res?.totalEntity);
  //         setSerialNumber(res?.firstSerialNumber);
  //       });
  //     }

  //     else {
  //       get(
  //         `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${providerUappIdValue}&studentId=${providerStdvalue}&consultantId=${providerConsValue}&universityId=${providerUniValue}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}`
  //       ).then((res) => {
  //         setLoading(false);
  //         setApplicationList(res?.models);
  //         setEntity(res?.totalEntity);
  //         setSerialNumber(res?.firstSerialNumber);
  //       });
  //     }
  //   }
  // }, [
  //   currentPage,
  //   dataPerPage,
  //   applicationValue,
  //   offerValue,
  //   enrollValue,
  //   intakeValue,
  //   interviewValue,
  //   elptValue,
  //   financeValue,
  //   orderValue,
  //   // entity,
  //   success,
  //   providerUappIdValue,
  //   providerStdvalue,
  //   providerConsValue,
  //   providerUniValue,
  //   providerPhoneValue,
  //   consultantId,
  //   universityId,
  //   selector,
  //   status

  // ]);

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleExportXLSX = () => {
    // var wb = XLSX.utils.book_new(),
    // ws = XLSX.utils.json_to_sheet(universityList);
    // XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    // XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const componentRef = useRef();

  // redirect to dashboard
  const backToDashboard = () => {
    if (location.universityIdFromUniList != undefined) {
      history.push("/universityList");
    } else if (location.consultantIdFromConsultantList != undefined) {
      history.push("/consultantList");
    } else {
      history.push("/");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleDeleteData = () => {
    setProgress(true);
    remove(`Application/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
      setDelData({});
    });
  };

  // for hide/unhide column

  const handleCheckedId = (e) => {
    setCheckId(e.target.checked);
  };
  const handleCheckedAppId = (e) => {
    setCheckAppId(e.target.checked);
  };
  const handleCheckedApplic = (e) => {
    setCheckApplic(e.target.checked);
  };
  const handleCheckedContact = (e) => {
    setCheckContact(e.target.checked);
  };
  const handleCheckedUni = (e) => {
    setCheckUni(e.target.checked);
  };
  const handleCheckedCamp = (e) => {
    setCheckCamp(e.target.checked);
  };
  const handleCheckedCourse = (e) => {
    setCheckCourse(e.target.checked);
  };
  const handleCheckedIntake = (e) => {
    setCheckIntake(e.target.checked);
  };
  const handleCheckedDate = (e) => {
    setCheckDate(e.target.checked);
  };
  const handleCheckedSts = (e) => {
    setCheckSts(e.target.checked);
  };
  const handleCheckedOfr = (e) => {
    setCheckOfr(e.target.checked);
  };
  const handleCheckedIntrv = (e) => {
    setCheckIntrv(e.target.checked);
  };
  const handleCheckedElpt = (e) => {
    setCheckElpt(e.target.checked);
  };
  const handleCheckedEnSts = (e) => {
    setCheckEnSts(e.target.checked);
  };
  const handleCheckedSlcs = (e) => {
    setCheckEnSlcs(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Applications</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.universityIdFromUniList != undefined
                ? "Back to University List"
                : location.consultantIdFromConsultantList != undefined
                ? "Back to Consultant List"
                : "Back to Dashboard"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerUappIdMenu}
                value={{
                  label: providerUappIdLabel,
                  value: providerUappIdValue,
                }}
                onChange={(opt) => selectUappId(opt.label, opt.value)}
                placeholder="UAPP ID"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerStdMenu}
                value={{ label: providerStdLabel, value: providerStdvalue }}
                onChange={(opt) => selectProviderStd(opt.label, opt.value)}
                placeholder="Name"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerConsMenu}
                value={{ label: providerConsLabel, value: providerConsValue }}
                onChange={(opt) => selectConsultant(opt.label, opt.value)}
                placeholder="Consultant"
                name="name"
                id="id"
                // isDisabled={
                //   location.consultantIdFromConsultantList ? true : false
                // }
                isDisabled={consultantId !== undefined ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={applicationMenu}
                value={{ label: applicationLabel, value: applicationValue }}
                onChange={(opt) => selectAppliDD(opt.label, opt.value)}
                placeholder="Status"
                name="name"
                id="id"
                isDisabled={selector == 1 ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={offerMenu}
                value={{ label: offerLabel, value: offerValue }}
                onChange={(opt) => selectOfferDD(opt.label, opt.value)}
                placeholder="Offer"
                name="name"
                id="id"
                isDisabled={selector == 2 ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={enrollMenu}
                value={{ label: enrollLabel, value: enrollValue }}
                onChange={(opt) => selectEnrollDD(opt.label, opt.value)}
                placeholder="Enrolment st..."
                name="name"
                id="id"
                isDisabled={selector == 3 ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={intakeMenu}
                value={{ label: intakeLabel, value: intakeValue }}
                onChange={(opt) => selectIntakeDD(opt.label, opt.value)}
                placeholder="Intake"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={interviewMenu}
                value={{ label: interviewLabel, value: interviewValue }}
                onChange={(opt) => selectInterviewDD(opt.label, opt.value)}
                placeholder="Interview"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={elptMenu}
                value={{ label: elptLabel, value: elptValue }}
                onChange={(opt) => selectElptDD(opt.label, opt.value)}
                placeholder="ELPT"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={financeMenu}
                value={{ label: financeLabel, value: financeValue }}
                onChange={(opt) => selectFinanceDD(opt.label, opt.value)}
                placeholder="SLCs"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerUniMenu}
                value={{ label: providerUniLabel, value: providerUniValue }}
                onChange={(opt) => selectProviderUni(opt.label, opt.value)}
                placeholder="University N..."
                name="name"
                id="id"
                // isDisabled={location.universityIdFromUniList ? true : false}
                isDisabled={universityId !== undefined ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerPhoneMenu}
                value={{ label: providerPhoneLabel, value: providerPhoneValue }}
                onChange={(opt) => selectProviderPhone(opt.label, opt.value)}
                placeholder="Phone No."
                name="name"
                id="id"
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
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              {/* <ButtonForFunction
                func={handleAddUniversity}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Add New"}
                permission={6}
              /> */}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
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
                <div className="mr-3 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div>
                      <Select
                        options={orderName}
                        value={{ label: orderLabel, value: orderValue }}
                        onChange={(opt) => selectOrder(opt.label, opt.value)}
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
                          <p className="">APP ID</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id=""
                              name="isAcceptHome"
                              onChange={(e) => {
                                handleCheckedAppId(e);
                              }}
                              defaultChecked={checkAppId}
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
                              id=""
                              name="isAcceptHome"
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
                          <p className="">Applicant</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedApplic(e);
                              }}
                              defaultChecked={checkApplic}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Contact</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedContact(e);
                              }}
                              defaultChecked={checkContact}
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
                                handleCheckedUni(e);
                              }}
                              defaultChecked={checkUni}
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
                                handleCheckedCamp(e);
                              }}
                              defaultChecked={checkCamp}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Course</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCourse(e);
                              }}
                              defaultChecked={checkCourse}
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
                                handleCheckedIntake(e);
                              }}
                              defaultChecked={checkIntake}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Application Date</p>
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
                          <p className="">Offer</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedOfr(e);
                              }}
                              defaultChecked={checkOfr}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Interview</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedIntrv(e);
                              }}
                              defaultChecked={checkIntrv}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">ELPT</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedElpt(e);
                              }}
                              defaultChecked={checkElpt}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Enrolment Status</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedEnSts(e);
                              }}
                              defaultChecked={checkEnSts}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SLCs</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedSlcs(e);
                              }}
                              defaultChecked={checkSlcs}
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
                                handleCheckedCons(e);
                              }}
                              defaultChecked={checkCons}
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
            <div className="d-flex justify-content-center mb-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive mb-3" ref={componentRef}>
              <Table
                id="table-to-xls"
                style={{ verticalAlign: "middle" }}
                className="table-sm table-bordered"
              >
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkAppId ? (
                      <th style={{ verticalAlign: "middle" }}>APP ID</th>
                    ) : null}
                    {checkId ? (
                      <th style={{ verticalAlign: "middle" }}>UAPP ID</th>
                    ) : null}
                    {checkApplic ? (
                      <th style={{ verticalAlign: "middle" }}>Applicant</th>
                    ) : null}
                    {checkContact ? (
                      <th style={{ verticalAlign: "middle" }}>Contact</th>
                    ) : null}
                    {checkUni ? (
                      <th style={{ verticalAlign: "middle" }}>University</th>
                    ) : null}
                    {checkCamp ? (
                      <th style={{ verticalAlign: "middle" }}>Campus</th>
                    ) : null}
                    {checkCourse ? (
                      <th style={{ verticalAlign: "middle" }}>Course</th>
                    ) : null}
                    {checkIntake ? (
                      <th style={{ verticalAlign: "middle" }}>Intake</th>
                    ) : null}
                    {checkDate ? (
                      <th style={{ verticalAlign: "middle" }}>
                        Application Date
                      </th>
                    ) : null}
                    {checkSts ? (
                      <th style={{ verticalAlign: "middle" }}>Status</th>
                    ) : null}
                    {checkOfr ? (
                      <th style={{ verticalAlign: "middle" }}>Offer</th>
                    ) : null}
                    {checkIntrv ? (
                      <th style={{ verticalAlign: "middle" }}>Interview</th>
                    ) : null}
                    {checkElpt ? (
                      <th style={{ verticalAlign: "middle" }}>ELPT</th>
                    ) : null}
                    {checkEnSts ? (
                      <th style={{ verticalAlign: "middle" }}>
                        Enrolment Status
                      </th>
                    ) : null}
                    {checkSlcs ? (
                      <th style={{ verticalAlign: "middle" }}>SLCs</th>
                    ) : null}
                    {checkCons ? (
                      <th style={{ verticalAlign: "middle" }}>Consultant</th>
                    ) : null}
                    {checkAction ? (
                      <th
                        style={{ verticalAlign: "middle" }}
                        className="text-center"
                      >
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {applicationList?.map((app, i) => (
                    <tr key={i}>
                      {checkAppId ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.applicationViewId}
                        </td>
                      ) : null}

                      {checkId ? (
                        <td
                          style={{ verticalAlign: "middle" }}
                          className="cursor-pointer hyperlink-hover"
                        >
                          <span
                            onClick={() => {
                              history.push(`/studentProfile/${app?.studentId}`);
                            }}
                          >
                            {app?.uappId}
                          </span>
                        </td>
                      ) : null}

                      {checkApplic ? (
                        <td
                          style={{ verticalAlign: "middle" }}
                          className="cursor-pointer hyperlink-hover"
                        >
                          <span
                            onClick={() => {
                              history.push(
                                `/applicationDetails/${app?.id}/${app?.studentId}`
                              );
                            }}
                          >
                            {app?.studentName}
                          </span>
                        </td>
                      ) : null}

                      {checkContact ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.studentPhone} <br />
                          {app?.studentEmail}
                        </td>
                      ) : null}

                      {checkUni ? (
                        <td style={{ verticalAlign: "middle" }}>
                          <span>{app?.universityName}</span>
                        </td>
                      ) : null}

                      {checkCamp ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.campusName}
                        </td>
                      ) : null}

                      {checkCourse ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.subjectName}
                        </td>
                      ) : null}

                      {checkIntake ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.intakeName}
                        </td>
                      ) : null}

                      {checkDate ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.applicationDate ? (
                            <>{handleDate(app?.applicationDate)}</>
                          ) : null}
                        </td>
                      ) : null}

                      {checkSts ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.applicationStatusName}
                        </td>
                      ) : null}

                      {checkOfr ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.offerStatusName}
                        </td>
                      ) : null}

                      {checkIntrv ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.interviewStatusName}
                        </td>
                      ) : null}

                      {checkElpt ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.elptStatusName}
                        </td>
                      ) : null}

                      {checkEnSts ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.enrollmentStatusName}
                        </td>
                      ) : null}

                      {checkSlcs ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.studentFinanceName}
                        </td>
                      ) : null}

                      {checkCons ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.consultantName}
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          {/* <ButtonGroup variant="text"> */}

                          <div className="d-flex">
                            {permissions?.includes(
                              permissionList.View_Application
                            ) ? (
                              <LinkButton
                                url={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                color="primary"
                                className={"mx-1 btn-sm mt-2"}
                                icon={<i className="fas fa-eye"></i>}
                              />
                            ) : null}

                            {/* <Button onClick={() => toggleDanger(student?.name, student?.id)} color="danger" className="mx-1 btn-sm">
                              <i className="fas fa-trash-alt"></i>
                            </Button> */}

                            {permissions?.includes(
                              permissionList.Delete_Application
                            ) ? (
                              <ButtonForFunction
                                icon={
                                  <i
                                    className="fas fa-trash-alt"
                                    style={{
                                      paddingLeft: "1.8px",
                                      paddingRight: "1.8px",
                                    }}
                                  ></i>
                                }
                                color={"danger"}
                                className={"mx-1 btn-sm mt-2"}
                                func={() => toggleDanger(app)}
                              />
                            ) : null}
                          </div>

                          {/* </ButtonGroup> */}

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
                              <Button color="danger" onClick={handleDeleteData}>
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
    </div>
  );
};

export default ProviderApplication;
