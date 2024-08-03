import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";

import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";

import { permissionList } from "../../../constants/AuthorizationConstant";
import MessageHistoryCardApplicationDetailsPage from "./MessageHistoryCardApplicationDetailsPage";
import StudentDocument from "./ApplicationDetailsComponents/StudentDocument";
import ApplicationStudentProfile from "./ApplicationDetailsComponents/ApplicationStudentProfile";
import ApplicationInfo from "./ApplicationDetailsComponents/ApplicationInfo";
import Loader from "../Search/Loader/Loader";
import post from "../../../helpers/post";
import Assessment from "./ApplicationDetailsComponents/Assessment";
import ButtonForFunction from "../Components/ButtonForFunction";
import put from "../../../helpers/put";
import { userTypes } from "../../../constants/userTypeConstant";
import ButtonLoader from "../Components/ButtonLoader";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import StarRatings from "../Components/StarRatings";

const ApplicationDetails = () => {
  const [activetab, setActivetab] = useState("1");
  const [applicationInfo, setApplicationInfo] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const [noteString, setNoteString] = useState("");
  const [notes, setNotes] = useState([]);

  // ELPT modal

  const [elptDate, setElptDate] = useState("");
  const [etaDate, setEtaDate] = useState("");
  const [eatDeadLine, setEtaDeadLine] = useState("");

  const [uniId, setUniId] = useState(0);
  const [admissionManagerDD, setAdmissionManagerDD] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [managerError, setManagerError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [managerId, setManagerId] = useState(0);

  const [officerDD, setOfficerDD] = useState([]);
  const [officerLabel, setOfficerLabel] = useState("Select Admission Officer");
  const [officerValue, setOfficerValue] = useState(0);
  const [officerError, setOfficerError] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [officerId, setOfficerId] = useState(0);

  const [intakeDD, setIntakeDD] = useState([]);
  const [deliveryDD, setDeliveryDD] = useState([]);

  const [ratingModal, setRatingModal] = useState(false);
  const [communicationValue, setCommunicationValue] = useState(1);
  const [helpfulValue, setHelpfulValue] = useState(1);
  const [recommendValue, setRecommendValue] = useState(1);
  const [overallValue, setOverallValue] = useState(1);
  // const [overallValue, setOverallValue] = useState((recommendValue+helpfulValue+communicationValue)/3);
  const [ratingValue, setRatingValue] = useState(0);

  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);

  // const { addToast } = useToasts();
  const history = useHistory();
  const { id, stdId } = useParams();
  const location = useLocation();
  const userType = localStorage.getItem("userType");

  // useEffect(()=>{
  //   if(applicationInfo?.subjectId !== undefined){
  //     get(`DeliveryPatternDD/Subject/${applicationInfo?.subjectId}`).then((res) => {
  //       setDeliveryDD(res);
  //       console.log("deliveryDD", res);
  //     });
  //     get(`IntakeDD/Intake/${applicationInfo?.subjectId}`).then((res) => {
  //       setIntakeDD(res);
  //       console.log("intakeDD", res);
  //     });
  //   }
  // },[applicationInfo?.subjectId])

  // useEffect(() => {
  //   get(`Application/Get/${id}`).then((res) => {
  //     setLoading(false);
  //     setApplicationInfo(res);
  //     console.log("appInfo", res);
  //     setManagerId(res?.admissionManager?.id);
  //     setOfficerId(res?.admissionOfficer?.id);
  //     setUniId(res?.university?.id);
  //     setElptDate(handleDate(res?.elpt?.elptDate));
  //     setEtaDate(handleDate(res?.elpt?.eta));
  //     setEtaDeadLine(handleDate(res?.elpt?.etaDeadline));
  //   });

  //   get(`ApplicationNote/get/${id}`).then((res) => {
  //     setNotes(res);
  //   });

  //   get(`ConsultantRating/GetByApplication/${id}`).then((res) => {
  //     console.log("ratings",res);
  //     setRatingValue(res);
  //   });

  // }, [id, success]);

  const toggle = (tab) => {
    setActivetab(tab);
    // if (tab == "1") {
    //   history.push("/addUniversityCampus");
    // }
    if (tab == "2") {
      setActivetab(tab);
      //   history.push("/addUniversityFinancial");
    }
    if (tab == "3") {
      setActivetab(tab);
      //   history.push("/addUniversityFeatures");
    }
    if (tab == "4") {
      setActivetab(tab);
      //   history.push("/addUniversityFeatures");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleRedirectToAppliPage = () => {
    if (location.providerId != undefined && location.managerId != undefined) {
      history.push(
        `/providerAdmissionManager/${location.managerId}/${location.providerId}`
      );
    } else if (location.appId != undefined) {
      history.push("/");
    } else {
      history.push("/applications");
    }
  };

  const submitNotes = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    post(`ApplicationNote/Create`, subData).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setNoteString("");
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handleChange = (uId) => {
    setModalOpen(true);
    get(`AdmissionManagerDD/University/${uId}`).then((res) => {
      setAdmissionManagerDD(res);
    });
  };

  const handleChange1 = (uId) => {
    setModalOpen1(true);
    get(`AdmissionOfficerDD/University/${uId}`).then((res) => {
      setOfficerDD(res);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
  };

  const closeModal1 = () => {
    setModalOpen1(false);
    setOfficerLabel("Select Admission Officer");
    setOfficerValue(0);
  };

  const managerOptions = admissionManagerDD?.map((adm) => ({
    label: adm?.name,
    value: adm?.id,
  }));

  const officerOptions = officerDD?.map((ado) => ({
    label: ado?.name,
    value: ado?.id,
  }));

  const selectManager = (label, value) => {
    setManagerLabel(label);

    if (value == managerId) {
      setManagerValue(null);
    } else {
      setManagerValue(value);
    }
    setManagerError(false);
  };

  const selectOfficer = (label, value) => {
    setOfficerLabel(label);

    if (value == officerId) {
      setOfficerValue(null);
    } else {
      setOfficerValue(value);
    }
    setOfficerError(false);
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();

    if (managerValue === 0) {
      setManagerError(true);
    } else {
      setProgress1(true);
      put(
        `ApplicationAdmissionManager/ChangeAdmissionManager/${id}/${managerValue}`
      ).then((res) => {
        // setButtonStatus(false);
        // setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setModalOpen(false);
          setSuccess(!success);
          setProgress1(false);
          setManagerLabel("Select Admission Manager");
          setManagerValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setProgress1(false);
        }
      });
    }
  };

  const handleSubmitChange1 = (e) => {
    e.preventDefault();

    if (officerValue === 0) {
      setOfficerError(true);
    } else {
      setProgress2(true);
      put(
        `ApplicationAdmissionOfficer/ChangeAdmissionOfficer/${id}/${officerValue}`
      ).then((res) => {
        // setButtonStatus(false);
        // setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setModalOpen1(false);
          setSuccess(!success);
          setProgress2(false);
          setOfficerLabel("Select Admission Officer");
          setOfficerValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setProgress2(false);
        }
      });
    }
  };

  const openRatingModal = () => {
    setRatingModal(true);
  };

  const closeRatingModal = () => {
    setRatingModal(false);
    setCommunicationValue(1);
    setHelpfulValue(1);
    setRecommendValue(1);
    setOverallValue(1);
    // setOverallValue((recommendValue+helpfulValue+communicationValue)/3);
  };

  const recommendToOther = {
    size: 15,
    count: 5,
    color: "1e98b0",
    activeColor: "#164677",
    value: recommendValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      console.log(`reco is ${newValue}`);
      setRecommendValue(newValue);
      setOverallValue((newValue + helpfulValue + communicationValue) / 3);
      console.log(`RecommendValue ${recommendValue}`);
      console.log(`recommendValue overall: new value is ${overallValue}`);
    },
  };

  const helpfulAndInformative = {
    size: 15,
    count: 5,
    color: "1e98b0",
    activeColor: "#164677",
    value: helpfulValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      console.log(`help is ${newValue}`);
      setHelpfulValue(newValue);
      setOverallValue((newValue + recommendValue + communicationValue) / 3);
      console.log(`helpful is ${helpfulValue}`);
      console.log(`helpfulValue overall: new value is ${overallValue}`);
    },
  };

  const communication = {
    size: 15,
    count: 5,
    color: "1e98b0",
    activeColor: "#164677",
    value: communicationValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      console.log(`comm is ${newValue}`);
      setCommunicationValue(newValue);
      setOverallValue((newValue + helpfulValue + recommendValue) / 3);
      console.log(`communication is ${communicationValue}`);
      console.log(`communicationValue overall: new value is ${overallValue}`);
    },
  };

  // const overall = {
  //   size: 15,
  //   count: 5,
  //   color: "black",
  //   activeColor: "1e98b0",
  //   value: overallValue,
  //   a11y: true,
  //   isHalf: true,
  //   emptyIcon: <i className="far fa-star" />,
  //   halfIcon: <i className="fa fa-star-half-alt" />,
  //   filledIcon: <i className="fa fa-star" />,
  //   edit: false,
  //   onChange: (newValue) => {
  //     console.log(`Example 2: new value is ${newValue}`);
  //     setOverallValue((newValue + recommendValue + helpfulValueValue + communicationValue)/3);
  //   }
  // };

  const handleSubmitRatings = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    subdata.append("RecommendToOthers", recommendValue);
    subdata.append("HelpfulAndInformative", helpfulValue);
    subdata.append("Communication", communicationValue);
    subdata.append("OverAllRating", overallValue);

    setProgress3(false);
    post(`ConsultantRating/Create`, subdata).then((res) => {
      setProgress3(false);
      setSuccess(!success);

      // setuniversityId(res?.data?.result?.universityId);
      if (res.status === 200 && res.data.isSuccess === true) {
        // setSubmitData(false);
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setRatingModal(false);
        setCommunicationValue(1);
        setHelpfulValue(1);
        setRecommendValue(1);
        setOverallValue(1);
        // setOverallValue((recommendValue+helpfulValue+communicationValue)/3);
      }
    });
  };

  // const handleUpdateTestScores = (data) => {

  //   history.push(`/addTestScore/${data?.id}/${1}`);
  // };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Application Details</h3>
              <div className="page-header-back-to-home">
                <span
                  onClick={handleRedirectToAppliPage}
                  className="text-white"
                >
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i>{" "}
                  {location.providerId != undefined &&
                  location.managerId != undefined
                    ? "Back to Admission Manager Details"
                    : location.appId
                    ? "Back to Student Dashboard"
                    : "Back to Application List"}
                </span>
              </div>
            </CardHeader>
          </Card>
          <Row>
            <Col md="7">
              <Card>
                <CardBody>
                  <Nav
                    tabs
                    className="row row-cols-md-4 row-cols-sm-1 text-center"
                  >
                    <NavItem>
                      <NavLink
                        active={activetab === "1"}
                        onClick={() => toggle("1")}
                      >
                        Application Info
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={activetab === "2"}
                        onClick={() => toggle("2")}
                      >
                        Documents
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={activetab === "3"}
                        onClick={() => toggle("3")}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={activetab === "4"}
                        onClick={() => toggle("4")}
                      >
                        Assessment
                      </NavLink>
                    </NavItem>
                  </Nav>

                  {activetab == 1 ? (
                    <TabContent activeTab={activetab}>
                      <TabPane tabId="1">
                        <ApplicationInfo
                          id={id}
                          applicationInfo={applicationInfo}
                          deliveryDD={deliveryDD}
                          intakeDD={intakeDD}
                          elptDate={elptDate}
                          etaDate={etaDate}
                          eatDeadLine={eatDeadLine}
                          success={success}
                          setSuccess={setSuccess}
                        />
                      </TabPane>
                    </TabContent>
                  ) : activetab == 2 ? (
                    <TabContent activeTab={activetab}>
                      <TabPane tabId="2">
                        <StudentDocument stdId={stdId} />
                      </TabPane>
                    </TabContent>
                  ) : activetab == 3 ? (
                    <TabContent activeTab={activetab}>
                      <TabPane tabId="3">
                        <ApplicationStudentProfile stdId={stdId} />
                      </TabPane>
                    </TabContent>
                  ) : (
                    <TabContent activeTab={activetab}>
                      <TabPane tabId="4">
                        <Assessment />
                      </TabPane>
                    </TabContent>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col md="5" className="mb-5">
              {userType == userTypes?.Student ? (
                <>
                  {applicationInfo?.admissionOfficer !== null ? (
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between mb-3">
                          <div>
                            <h5>
                              {" "}
                              <b>Admission Officer</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>
                          <div className="text-right edit-style">
                            {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                            {applicationInfo?.admissionOfficer !== null ? (
                              <>
                                {userType == userTypes?.SystemAdmin ||
                                userType == userTypes?.Admin ||
                                userType == userTypes?.ProviderAdmin ? (
                                  <ButtonForFunction
                                    func={() => handleChange1(uniId)}
                                    className={"btn btn-uapp-add "}
                                    //  icon={<i className="fas fa-plus"></i>}
                                    name={"Change"}
                                    permission={6}
                                  />
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </div>

                        <Modal
                          isOpen={modalOpen1}
                          toggle={closeModal1}
                          className="uapp-modal"
                        >
                          <ModalHeader>Change Admission Officer</ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmitChange1}>
                              {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="4">
                                  <span>
                                    Admission Officer{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="8">
                                  <Select
                                    options={officerOptions}
                                    value={{
                                      label: officerLabel,
                                      value: officerValue,
                                    }}
                                    onChange={(opt) =>
                                      selectOfficer(opt.label, opt.value)
                                    }
                                    name="id"
                                    id="id"
                                    // isDisabled={univerTypeId !== undefined ? true : false}
                                  />

                                  {officerError ? (
                                    <span className="text-danger">
                                      Admission Officer is required
                                    </span>
                                  ) : null}

                                  {officerValue == null ? (
                                    <span className="text-danger">
                                      Can not change to same admission officer
                                    </span>
                                  ) : null}
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
                                  onClick={closeModal1}
                                >
                                  Close
                                </Button>

                                {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                                {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                                <ButtonForFunction
                                  color={"primary"}
                                  type={"submit"}
                                  className={"mr-1 mt-3"}
                                  name={progress2 ? <ButtonLoader /> : "Submit"}
                                  // name={"Submit"}
                                  permission={6}
                                  disable={officerValue == null ? true : false}
                                />

                                {/* } */}
                              </FormGroup>
                            </Form>
                          </ModalBody>
                        </Modal>

                        {applicationInfo?.admissionOfficer !== null ? (
                          <div className="d-flex justify-content-between">
                            <div className="my-auto">
                              <span>
                                <b>Name:</b>{" "}
                                {applicationInfo?.admissionOfficer?.firstName}{" "}
                                {applicationInfo?.admissionOfficer?.lastName}
                              </span>{" "}
                              <br />
                              <span>
                                <b>Email:</b>{" "}
                                {applicationInfo?.admissionOfficer?.email}
                              </span>
                              <br />
                              <span>
                                <b>Phone:</b>{" "}
                                {applicationInfo?.admissionOfficer?.phoneNumber}
                              </span>
                            </div>
                            <div>
                              <div className="uapp-circle-image margin-top-minus">
                                {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                      null ? (
                        <img src={profileImage} alt="provider_img" />
                      ) : ( */}

                                <img
                                  src={
                                    rootUrl +
                                    applicationInfo?.admissionOfficer
                                      ?.admissionOfficerMedia?.thumbnailUrl
                                  }
                                  alt="admission_officer_img"
                                />

                                {/* )} */}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-center mb-2">
                              <b>Admission Officer is not assigned here.</b>
                            </div>
                            <center>
                              {userType == userTypes?.SystemAdmin ||
                              userType == userTypes?.Admin ||
                              userType == userTypes?.ProviderAdmin ? (
                                <ButtonForFunction
                                  func={() => handleChange1(uniId)}
                                  className={"btn btn-uapp-add "}
                                  //  icon={<i className="fas fa-plus"></i>}
                                  name={"Assign"}
                                  permission={6}
                                />
                              ) : null}
                            </center>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ) : (
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between mb-3">
                          <div>
                            <h5>
                              {" "}
                              <b>Admission Manager</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>
                          <div className="text-right edit-style">
                            {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                            {userType == userTypes?.SystemAdmin ||
                            userType == userTypes?.Admin ||
                            userType == userTypes?.ProviderAdmin ? (
                              <ButtonForFunction
                                func={() => handleChange(uniId)}
                                className={"btn btn-uapp-add "}
                                //  icon={<i className="fas fa-plus"></i>}
                                name={"Change"}
                                permission={6}
                              />
                            ) : null}
                          </div>
                        </div>

                        <Modal
                          isOpen={modalOpen}
                          toggle={closeModal}
                          className="uapp-modal"
                        >
                          <ModalHeader>Change Admission Manager</ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmitChange}>
                              {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="4">
                                  <span>
                                    Admission Manager{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="8">
                                  <Select
                                    options={managerOptions}
                                    value={{
                                      label: managerLabel,
                                      value: managerValue,
                                    }}
                                    onChange={(opt) =>
                                      selectManager(opt.label, opt.value)
                                    }
                                    name="id"
                                    id="id"
                                    // isDisabled={univerTypeId !== undefined ? true : false}
                                  />

                                  {managerError ? (
                                    <span className="text-danger">
                                      Admission Manager is required
                                    </span>
                                  ) : null}

                                  {managerValue == null ? (
                                    <span className="text-danger">
                                      Can not change to same admission manager
                                    </span>
                                  ) : null}
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

                                {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                                {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                                <ButtonForFunction
                                  color={"primary"}
                                  type={"submit"}
                                  className={"mr-1 mt-3"}
                                  name={progress1 ? <ButtonLoader /> : "Submit"}
                                  // name={"Submit"}
                                  permission={6}
                                  disable={managerValue == null ? true : false}
                                />

                                {/* } */}
                              </FormGroup>
                            </Form>
                          </ModalBody>
                        </Modal>

                        <div className="d-flex justify-content-between">
                          <div className="my-auto">
                            <span>
                              <b>Name:</b>{" "}
                              {applicationInfo?.admissionManager?.firstName}{" "}
                              {applicationInfo?.admissionManager?.lastName}
                            </span>{" "}
                            <br />
                            <span>
                              <b>Email:</b>{" "}
                              {applicationInfo?.admissionManager?.email}
                            </span>
                            <br />
                            <span>
                              <b>Phone:</b>{" "}
                              {applicationInfo?.admissionManager?.phoneNumber}
                            </span>
                          </div>
                          <div>
                            <div className="uapp-circle-image margin-top-minus">
                              {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}

                              <img
                                src={
                                  rootUrl +
                                  applicationInfo?.admissionManager
                                    ?.admissionManagerMedia?.thumbnailUrl
                                }
                                alt="admission_manager_img"
                              />

                              {/* )} */}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </>
              ) : userType == userTypes?.AdmissionManager ? (
                <>
                  <Card>
                    <CardBody>
                      <div className="hedding-titel d-flex justify-content-between mb-3">
                        <div>
                          <h5>
                            {" "}
                            <b>Admission Officer</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                        <div className="text-right edit-style">
                          {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                          {applicationInfo?.admissionOfficer !== null ? (
                            <>
                              {userType == userTypes?.SystemAdmin ||
                              userType == userTypes?.Admin ||
                              userType == userTypes?.ProviderAdmin ? (
                                <ButtonForFunction
                                  func={() => handleChange1(uniId)}
                                  className={"btn btn-uapp-add "}
                                  //  icon={<i className="fas fa-plus"></i>}
                                  name={"Change"}
                                  permission={6}
                                />
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>

                      <Modal
                        isOpen={modalOpen1}
                        toggle={closeModal1}
                        className="uapp-modal"
                      >
                        <ModalHeader>Change Admission Officer</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleSubmitChange1}>
                            {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="4">
                                <span>
                                  Admission Officer{" "}
                                  <span className="text-danger">*</span>{" "}
                                </span>
                              </Col>
                              <Col md="8">
                                <Select
                                  options={officerOptions}
                                  value={{
                                    label: officerLabel,
                                    value: officerValue,
                                  }}
                                  onChange={(opt) =>
                                    selectOfficer(opt.label, opt.value)
                                  }
                                  name="id"
                                  id="id"
                                  // isDisabled={univerTypeId !== undefined ? true : false}
                                />

                                {officerError ? (
                                  <span className="text-danger">
                                    Admission Officer is required
                                  </span>
                                ) : null}

                                {officerValue == null ? (
                                  <span className="text-danger">
                                    Can not change to same admission officer
                                  </span>
                                ) : null}
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
                                onClick={closeModal1}
                              >
                                Close
                              </Button>

                              {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                              {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                              <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"mr-1 mt-3"}
                                name={progress2 ? <ButtonLoader /> : "Submit"}
                                // name={"Submit"}
                                permission={6}
                                disable={officerValue == null ? true : false}
                              />

                              {/* } */}
                            </FormGroup>
                          </Form>
                        </ModalBody>
                      </Modal>

                      {applicationInfo?.admissionOfficer !== null ? (
                        <div className="d-flex justify-content-between">
                          <div className="my-auto">
                            <span>
                              <b>Name:</b>{" "}
                              {applicationInfo?.admissionOfficer?.firstName}{" "}
                              {applicationInfo?.admissionOfficer?.lastName}
                            </span>{" "}
                            <br />
                            <span>
                              <b>Email:</b>{" "}
                              {applicationInfo?.admissionOfficer?.email}
                            </span>
                            <br />
                            <span>
                              <b>Phone:</b>{" "}
                              {applicationInfo?.admissionOfficer?.phoneNumber}
                            </span>
                          </div>
                          <div>
                            <div className="uapp-circle-image margin-top-minus">
                              {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                      null ? (
                        <img src={profileImage} alt="provider_img" />
                      ) : ( */}

                              <img
                                src={
                                  rootUrl +
                                  applicationInfo?.admissionOfficer
                                    ?.admissionOfficerMedia?.thumbnailUrl
                                }
                                alt="admission_officer_img"
                              />

                              {/* )} */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-center mb-2">
                            <b>Admission Officer is not assigned here.</b>
                          </div>
                          <center>
                            {userType == userTypes?.SystemAdmin ||
                            userType == userTypes?.Admin ||
                            userType == userTypes?.ProviderAdmin ? (
                              <ButtonForFunction
                                func={() => handleChange1(uniId)}
                                className={"btn btn-uapp-add "}
                                //  icon={<i className="fas fa-plus"></i>}
                                name={"Assign"}
                                permission={6}
                              />
                            ) : null}
                          </center>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </>
              ) : userType == userTypes?.AdmissionOfficer ? (
                <>
                  <Card>
                    <CardBody>
                      <div className="hedding-titel d-flex justify-content-between mb-3">
                        <div>
                          <h5>
                            {" "}
                            <b>Admission Manager</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                        <div className="text-right edit-style">
                          {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                          {userType == userTypes?.SystemAdmin ||
                          userType == userTypes?.Admin ||
                          userType == userTypes?.ProviderAdmin ? (
                            <ButtonForFunction
                              func={() => handleChange(uniId)}
                              className={"btn btn-uapp-add "}
                              //  icon={<i className="fas fa-plus"></i>}
                              name={"Change"}
                              permission={6}
                            />
                          ) : null}
                        </div>
                      </div>

                      <Modal
                        isOpen={modalOpen}
                        toggle={closeModal}
                        className="uapp-modal"
                      >
                        <ModalHeader>Change Admission Manager</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleSubmitChange}>
                            {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="4">
                                <span>
                                  Admission Manager{" "}
                                  <span className="text-danger">*</span>{" "}
                                </span>
                              </Col>
                              <Col md="8">
                                <Select
                                  options={managerOptions}
                                  value={{
                                    label: managerLabel,
                                    value: managerValue,
                                  }}
                                  onChange={(opt) =>
                                    selectManager(opt.label, opt.value)
                                  }
                                  name="id"
                                  id="id"
                                  // isDisabled={univerTypeId !== undefined ? true : false}
                                />

                                {managerError ? (
                                  <span className="text-danger">
                                    Admission Manager is required
                                  </span>
                                ) : null}

                                {managerValue == null ? (
                                  <span className="text-danger">
                                    Can not change to same admission manager
                                  </span>
                                ) : null}
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

                              {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                              {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                              <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"mr-1 mt-3"}
                                name={progress1 ? <ButtonLoader /> : "Submit"}
                                // name={"Submit"}
                                permission={6}
                                disable={managerValue == null ? true : false}
                              />

                              {/* } */}
                            </FormGroup>
                          </Form>
                        </ModalBody>
                      </Modal>

                      <div className="d-flex justify-content-between">
                        <div className="my-auto">
                          <span>
                            <b>Name:</b>{" "}
                            {applicationInfo?.admissionManager?.firstName}{" "}
                            {applicationInfo?.admissionManager?.lastName}
                          </span>{" "}
                          <br />
                          <span>
                            <b>Email:</b>{" "}
                            {applicationInfo?.admissionManager?.email}
                          </span>
                          <br />
                          <span>
                            <b>Phone:</b>{" "}
                            {applicationInfo?.admissionManager?.phoneNumber}
                          </span>
                        </div>
                        <div>
                          <div className="uapp-circle-image margin-top-minus">
                            {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}

                            <img
                              src={
                                rootUrl +
                                applicationInfo?.admissionManager
                                  ?.admissionManagerMedia?.thumbnailUrl
                              }
                              alt="admission_manager_img"
                            />

                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <CardBody>
                      <div className="hedding-titel d-flex justify-content-between mb-3">
                        <div>
                          <h5>
                            {" "}
                            <b>Admission Manager</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                        <div className="text-right edit-style">
                          {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                          {userType == userTypes?.SystemAdmin ||
                          userType == userTypes?.Admin ||
                          userType == userTypes?.ProviderAdmin ? (
                            <ButtonForFunction
                              func={() => handleChange(uniId)}
                              className={"btn btn-uapp-add "}
                              //  icon={<i className="fas fa-plus"></i>}
                              name={"Change"}
                              permission={6}
                            />
                          ) : null}
                        </div>
                      </div>

                      <Modal
                        isOpen={modalOpen}
                        toggle={closeModal}
                        className="uapp-modal"
                      >
                        <ModalHeader>Change Admission Manager</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleSubmitChange}>
                            {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="4">
                                <span>
                                  Admission Manager{" "}
                                  <span className="text-danger">*</span>{" "}
                                </span>
                              </Col>
                              <Col md="8">
                                <Select
                                  options={managerOptions}
                                  value={{
                                    label: managerLabel,
                                    value: managerValue,
                                  }}
                                  onChange={(opt) =>
                                    selectManager(opt.label, opt.value)
                                  }
                                  name="id"
                                  id="id"
                                  // isDisabled={univerTypeId !== undefined ? true : false}
                                />

                                {managerError ? (
                                  <span className="text-danger">
                                    Admission Manager is required
                                  </span>
                                ) : null}

                                {managerValue == null ? (
                                  <span className="text-danger">
                                    Can not change to same admission manager
                                  </span>
                                ) : null}
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

                              {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                              {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                              <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"mr-1 mt-3"}
                                name={progress1 ? <ButtonLoader /> : "Submit"}
                                // name={"Submit"}
                                permission={6}
                                disable={managerValue == null ? true : false}
                              />

                              {/* } */}
                            </FormGroup>
                          </Form>
                        </ModalBody>
                      </Modal>

                      <div className="d-flex justify-content-between">
                        <div className="my-auto">
                          <span>
                            <b>Name:</b>{" "}
                            {applicationInfo?.admissionManager?.firstName}{" "}
                            {applicationInfo?.admissionManager?.lastName}
                          </span>{" "}
                          <br />
                          <span>
                            <b>Email:</b>{" "}
                            {applicationInfo?.admissionManager?.email}
                          </span>
                          <br />
                          <span>
                            <b>Phone:</b>{" "}
                            {applicationInfo?.admissionManager?.phoneNumber}
                          </span>
                        </div>
                        <div>
                          <div className="uapp-circle-image margin-top-minus">
                            {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}

                            <img
                              src={
                                rootUrl +
                                applicationInfo?.admissionManager
                                  ?.admissionManagerMedia?.thumbnailUrl
                              }
                              alt="admission_manager_img"
                            />

                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div className="hedding-titel d-flex justify-content-between mb-3">
                        <div>
                          <h5>
                            {" "}
                            <b>Admission Officer</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                        <div className="text-right edit-style">
                          {/* <span onClick={() => setModalOpen(true)}> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}

                          {applicationInfo?.admissionOfficer !== null ? (
                            <>
                              {userType == userTypes?.SystemAdmin ||
                              userType == userTypes?.Admin ||
                              userType == userTypes?.ProviderAdmin ? (
                                <ButtonForFunction
                                  func={() => handleChange1(uniId)}
                                  className={"btn btn-uapp-add "}
                                  //  icon={<i className="fas fa-plus"></i>}
                                  name={"Change"}
                                  permission={6}
                                />
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>

                      <Modal
                        isOpen={modalOpen1}
                        toggle={closeModal1}
                        className="uapp-modal"
                      >
                        <ModalHeader>Change Admission Officer</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleSubmitChange1}>
                            {/* {
                    programLvlId != undefined ?
                    <input
                      type='hidden'
                      name='id'
                      id='id'
                      value={programLvlId}
                    />
                        :
                        null
                  } */}

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="4">
                                <span>
                                  Admission Officer{" "}
                                  <span className="text-danger">*</span>{" "}
                                </span>
                              </Col>
                              <Col md="8">
                                <Select
                                  options={officerOptions}
                                  value={{
                                    label: officerLabel,
                                    value: officerValue,
                                  }}
                                  onChange={(opt) =>
                                    selectOfficer(opt.label, opt.value)
                                  }
                                  name="id"
                                  id="id"
                                  // isDisabled={univerTypeId !== undefined ? true : false}
                                />

                                {officerError ? (
                                  <span className="text-danger">
                                    Admission Officer is required
                                  </span>
                                ) : null}

                                {officerValue == null ? (
                                  <span className="text-danger">
                                    Can not change to same admission officer
                                  </span>
                                ) : null}
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
                                onClick={closeModal1}
                              >
                                Close
                              </Button>

                              {/* {
                    localStorage.getItem("ProgramId") ?
                      <Button color="primary" onClick={handleUpdateSubmit}  className="mr-1 mt-3">Update</Button> : */}
                              {/* <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                      >
                        Submit
                      </Button.Ripple> */}

                              <ButtonForFunction
                                color={"primary"}
                                type={"submit"}
                                className={"mr-1 mt-3"}
                                name={progress2 ? <ButtonLoader /> : "Submit"}
                                // name={"Submit"}
                                permission={6}
                                disable={officerValue == null ? true : false}
                              />

                              {/* } */}
                            </FormGroup>
                          </Form>
                        </ModalBody>
                      </Modal>

                      {applicationInfo?.admissionOfficer !== null ? (
                        <div className="d-flex justify-content-between">
                          <div className="my-auto">
                            <span>
                              <b>Name:</b>{" "}
                              {applicationInfo?.admissionOfficer?.firstName}{" "}
                              {applicationInfo?.admissionOfficer?.lastName}
                            </span>{" "}
                            <br />
                            <span>
                              <b>Email:</b>{" "}
                              {applicationInfo?.admissionOfficer?.email}
                            </span>
                            <br />
                            <span>
                              <b>Phone:</b>{" "}
                              {applicationInfo?.admissionOfficer?.phoneNumber}
                            </span>
                          </div>
                          <div>
                            <div className="uapp-circle-image margin-top-minus">
                              {/* {applicationInfo?.admissionManager?.admissionManagerMedia?.fileUrl ==
                      null ? (
                        <img src={profileImage} alt="provider_img" />
                      ) : ( */}

                              <img
                                src={
                                  rootUrl +
                                  applicationInfo?.admissionOfficer
                                    ?.admissionOfficerMedia?.thumbnailUrl
                                }
                                alt="admission_officer_img"
                              />

                              {/* )} */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-center mb-2">
                            <b>Admission Officer is not assigned here.</b>
                          </div>
                          <center>
                            {userType == userTypes?.SystemAdmin ||
                            userType == userTypes?.Admin ||
                            userType == userTypes?.ProviderAdmin ? (
                              <ButtonForFunction
                                func={() => handleChange1(uniId)}
                                className={"btn btn-uapp-add "}
                                //  icon={<i className="fas fa-plus"></i>}
                                name={"Assign"}
                                permission={6}
                              />
                            ) : null}
                          </center>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </>
              )}

              {userType == userTypes?.Consultant ? null : (
                <Card>
                  <CardBody>
                    <div className="hedding-titel d-flex justify-content-between mb-2">
                      <div>
                        <h5>
                          <div className="d-flex">
                            <div style={{ marginRight: "10px" }}>
                              {" "}
                              <b>Consultant</b>{" "}
                            </div>
                            {ratingValue !== 0 ? (
                              <StarRatings star={ratingValue} />
                            ) : null}
                          </div>
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="my-auto">
                        <span>
                          <b>Name:</b> {applicationInfo?.consultant?.firstName}{" "}
                          {applicationInfo?.consultant?.lastName}
                        </span>{" "}
                        <br />
                        <span>
                          <b>Email:</b> {applicationInfo?.consultant?.email}
                        </span>
                        <br />
                        <span>
                          <b>Phone:</b>{" "}
                          {applicationInfo?.consultant?.phoneNumber}
                        </span>
                        <br />
                        <span>
                          <b>Account Status: </b>{" "}
                          {
                            applicationInfo?.consultant?.accountStatus
                              ?.statusName
                          }
                          <br />
                          {applicationInfo?.consultant?.accountStatusId == 4 ? (
                            <span className="text-danger">
                              {" "}
                              The consultant of this student is blocked due to
                              compliance issue. Please contact admin before you
                              do any further update on his applications.
                            </span>
                          ) : null}
                        </span>
                        <br />
                        {userType == userTypes?.Student &&
                        applicationInfo?.enrollmentStatus?.id === 2 &&
                        permissions?.includes(
                          permissionList?.Add_New_ConsultantRating
                        ) ? (
                          <>
                            {ratingValue === 0 ? (
                              <Button onClick={openRatingModal} color="primary">
                                Rate Your Consultant
                              </Button>
                            ) : null}
                          </>
                        ) : null}
                        <Modal
                          isOpen={ratingModal}
                          toggle={closeRatingModal}
                          className="uapp-modal"
                        >
                          <ModalHeader>Rate Your Consultant</ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmitRatings}>
                              <input
                                type="hidden"
                                name="ConsultantId"
                                id="ConsultantId"
                                value={applicationInfo?.consultantId}
                              />

                              <input
                                type="hidden"
                                name="StudentId"
                                id="StudentId"
                                value={stdId}
                              />

                              <input
                                type="hidden"
                                name="applicationId"
                                id="applicationId"
                                value={id}
                              />

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="5">
                                  <span>
                                    Recommend to other{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="7">
                                  <ReactStars {...recommendToOther} />
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="5">
                                  <span>
                                    Helpful and Informative{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="7">
                                  <ReactStars {...helpfulAndInformative} />
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="5">
                                  <span>
                                    Communication{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="7">
                                  <ReactStars {...communication} />
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="5">
                                  <span>
                                    Comments{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="7">
                                  <Input
                                    type="textarea"
                                    row="3"
                                    name="Comment"
                                    id="Comment"
                                    placeholder="Write your comment here"
                                    required
                                  />
                                  {/* <div className="form-control-position">
                                                        <User size={15} />
                                                    </div> */}
                                </Col>
                              </FormGroup>

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col md="5">
                                  <span>
                                    Overall{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                </Col>
                                <Col md="7">
                                  {/* <ReactStars {...overall} /> */}
                                  <StarRatings star={overallValue} />
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
                                  onClick={closeRatingModal}
                                >
                                  Close
                                </Button>

                                <ButtonForFunction
                                  color={"primary"}
                                  type={"submit"}
                                  className={"mr-1 mt-3"}
                                  name={progress3 ? <ButtonLoader /> : "Submit"}
                                  // name={"Submit"}
                                  permission={6}
                                />
                              </FormGroup>
                            </Form>
                          </ModalBody>
                        </Modal>
                      </div>
                      <div>
                        <div className="uapp-circle-image margin-top-minus">
                          {/* {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : ( */}
                          <img
                            src={
                              rootUrl +
                              applicationInfo?.consultant
                                ?.consultantProfileImageMedia?.thumbnailUrl
                            }
                            alt="consultant_img"
                          />
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* <Card>
            <CardBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Message History</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                
              </div>
              <div className="box arrow-left">Mistakenly apply</div>
            </CardBody>
          </Card> */}

              <MessageHistoryCardApplicationDetailsPage applicationId={id} />

              {permissions?.includes(permissionList?.Add_ApplicationNote) ? (
                <Card>
                  <CardHeader>
                    <div className="hedding-titel d-flex justify-content-between">
                      <div className="mb-3">
                        <h5>
                          {" "}
                          <b>Note</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                    </div>
                  </CardHeader>
                  <CardBody style={{ height: "300px", overflowY: "scroll" }}>
                    <div>
                      {notes?.map((chat, i) => (
                        <div className="box my-3" key={i}>
                          <div className="d-flex justify-content-between mb-2">
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "800",
                                color: "#164677",
                              }}
                            >
                              {chat?.createdBy}
                            </span>
                            <span
                              style={{
                                fontSize: "11",
                                color: "hsla(0,0%,50.2%,.918)",
                              }}
                            >
                              {chat?.createdon}
                            </span>
                          </div>
                          <span>{chat?.note}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>

                  <CardFooter style={{ marginTop: "15px" }}>
                    <div>
                      <form onSubmit={submitNotes}>
                        <Input
                          type="hidden"
                          name="applicationId"
                          id="applicationId"
                          value={id}
                        />

                        <Input
                          type="textarea"
                          name="note"
                          id="note"
                          placeholder="Write note"
                          value={noteString}
                          onChange={(e) => setNoteString(e.target.value)}
                          required
                        />

                        <div className="d-flex justify-content-end mt-2">
                          <Button type="submit" color="primary">
                            Save
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardFooter>
                </Card>
              ) : null}

              {/* <div
            className="has-icon-left position-relative"
            style={{ display: "flex", justifyContent: "end" }}
          >
            

            <ButtonForFunction
              func={handleRedirectToAppliPage}
              className={"badge-primary"}
              name={<b>Back to Application Page</b>}
              permission={6}
            />
          </div> */}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ApplicationDetails;
