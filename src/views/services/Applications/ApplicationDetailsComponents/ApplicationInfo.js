import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Col,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
} from "reactstrap";

import get from "../../../../helpers/get";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import ButtonForFunction from "../../Components/ButtonForFunction";
import SpanButton from "../../Components/SpanButton";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";

const ApplicationInfo = ({
  applicationInfo,
  intakeDD,
  deliveryDD,
  id,
  elptDate,
  etaDate,
  eatDeadLine,
  setSuccess,
  success,
}) => {
  const [statusDD, setStatusDD] = useState([]);
  const [statusLabel, setStatusLabel] = useState("");
  const [statusValue, setStatusvalue] = useState(0);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // const [deliveryDD, setDeliveryDD] = useState([]);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [deliveryLabel, setDeliveryLabel] = useState("");
  const [deliveryValue, setDeliveryValue] = useState(0);

  const [financeDD, setFinanceDD] = useState([]);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeLabel, setFinanceLabel] = useState("");
  const [financeValue, setFinanceValue] = useState(0);

  const [enrollDD, setEnrollDD] = useState([]);
  const [enrollLabel, setEnrollLabel] = useState("");
  const [enrollValue, setEnrollValue] = useState(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const [offerDD, setOfferDD] = useState([]);
  const [offerLabel, setOfferLabel] = useState("");
  const [offerValue, setOfferValue] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const [uniStdIdModalOpen, setUniStdIdModalOpen] = useState(false);
  const [uniAppDateModalOpen, setUniAppDateModalOpen] = useState(false);

  const [intakeModal, setIntakeModal] = useState(false);
  const [intakeLabel, setIntakeLabel] = useState("");
  const [intakeValue, setIntakeValue] = useState(0);
  // const [intakeDD, setIntakeDD] = useState([]);

  const [elptModalOpen, setElptModalOpen] = useState(false);
  const [elptModalOpen1, setElptModalOpen1] = useState(false);
  const [elptStatusLabel, setElptStatusLabel] = useState("Select ELPT status");
  const [elptStatusValue, setElptStatusValue] = useState(0);
  const [elptStatusError, setElptStatusError] = useState(false);
  //   const [elptDate, setElptDate] = useState("");
  //   const [etaDate, setEtaDate] = useState("");
  //   const [eatDeadLine, setEtaDeadLine] = useState("");

  const [elptStatusDD, setElptStatusDD] = useState([]);

  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [progress6, setProgress6] = useState(false);
  const [progress7, setProgress7] = useState(false);
  const [progress8, setProgress8] = useState(false);
  const [progress9, setProgress9] = useState(false);

  const { addToast } = useToasts();

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  //   const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   // get(`Application/Get/${id}`).then((res) => {
  //   //   setApplicationInfo(res);
  //   //   setElptDate(handleDate(res?.elpt?.elptDate));
  //   //   setEtaDate(handleDate(res?.elpt?.eta));
  //   //   setEtaDeadLine(handleDate(res?.elpt?.etaDeadline));
  //   // });

  //   // if(applicationInfo?.subjectId !== undefined){
  //   //   get(`DeliveryPatternDD/Subject/${applicationInfo?.subjectId}`).then((res) => {
  //   //     setDeliveryDD(res);
  //   //   });
  //   //   get(`IntakeDD/Intake/${applicationInfo?.subjectId}`).then((res) => {
  //   //     setIntakeDD(res);
  //   //     console.log("intakeDD", res);
  //   //   });
  //   // }
  //   get("StudentFinanceStatusDD/Index").then((res) => {
  //     setFinanceDD(res);
  //   });
  //   get("ApplicationStatusDD/Index").then((res) => {
  //     setStatusDD(res);
  //   });
  //   get("EnrollmentStatusDD/Index").then((res) => {
  //     setEnrollDD(res);
  //   });
  //   get("OfferStatusDD/Index").then((res) => {
  //     setOfferDD(res);
  //   });
  //   get("ElptStatusDD/Index").then((res) => {
  //     setElptStatusDD(res);
  //   });
  // }, [
  //     // applicationInfo?.subjectId
  //    ]);

  const handleApplicationEdit = (name, id) => {
    setStatusLabel(name);
    setStatusvalue(id);
    setStatusModalOpen(true);
  };

  const statusMenu = statusDD.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusvalue(value);
  };

  const offerMenu = offerDD.map((offer) => ({
    label: offer?.name,
    value: offer?.id,
  }));

  const selectOffer = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
  };

  const elptStatusMenu = elptStatusDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));

  const selectElpt = (label, value) => {
    setElptStatusLabel(label);
    setElptStatusValue(value);
    setElptStatusError(false);
  };

  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));

  const selectEnroll = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
  };

  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));

  const selectFinance = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };

  const deliveryMenu = deliveryDD.map((delivery) => ({
    label: delivery?.name,
    value: delivery?.id,
  }));

  const intakeMenu = intakeDD.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const selectDelivery = (label, value) => {
    setDeliveryLabel(label);
    setDeliveryValue(value);
  };

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const handleOfferEdit = (name, id) => {
    setOfferLabel(name);
    setOfferValue(id);
    setOfferModalOpen(true);
  };

  const handleEditEnrol = (name, id) => {
    setEnrollLabel(name);
    setEnrollValue(id);
    setEnrollModalOpen(true);
  };

  const handleEditFinance = (name, id) => {
    setFinanceLabel(name);
    setFinanceValue(id);
    setFinanceModalOpen(true);
  };

  const handleEditDeliveryPattern = (name, id) => {
    setDeliveryLabel(name);
    setDeliveryValue(id);
    setDeliveryModalOpen(true);
  };

  const handleEditUniStdId = (id) => {
    setUniStdIdModalOpen(true);
  };

  const handleUpdateIntake = (value, label) => {
    setIntakeModal(true);
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  // on Close Modal
  const closeModal = () => {
    setDeliveryModalOpen(false);
    setDeliveryLabel("");
    setDeliveryValue(0);
    setFinanceLabel("");
    setFinanceValue(0);
    setFinanceModalOpen(false);
    setStatusLabel("");
    setStatusvalue(0);
    setStatusModalOpen(false);
    setEnrollLabel("");
    setEnrollValue(0);
    setEnrollModalOpen(false);
    setOfferLabel("");
    setOfferValue(0);
    setOfferModalOpen(false);
    setUniStdIdModalOpen(false);
    setUniAppDateModalOpen(false);
    setIntakeModal(false);
    setIntakeLabel("");
    setIntakeValue(0);
  };

  const handleApplicationUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress(true);
    const returnvalue = put(
      `Application/UpdateApplicationStatus`,
      subData
    ).then((action) => {
      setProgress(false);
      setSuccess(!success);
      setStatusModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setStatusLabel("");
      setStatusvalue(0);
    });
  };

  const handleOfferUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress1(true);
    const returnvalue = put(`Application/UpdateOfferStatus`, subData).then(
      (action) => {
        setProgress1(false);
        setSuccess(!success);
        setOfferModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setOfferLabel("");
        setEnrollValue(0);
      }
    );
  };

  const handleEnrollUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress2(true);
    const returnvalue = put(`Application/UpdateEnrollmentStatus`, subData).then(
      (action) => {
        setProgress2(false);
        setSuccess(!success);
        setEnrollModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setEnrollLabel("");
        setEnrollValue(0);
      }
    );
  };

  const handleFinanceUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress3(true);
    const returnvalue = put(`Application/UpdateStudentFinance`, subData).then(
      (action) => {
        setProgress3(false);
        setSuccess(!success);
        setFinanceModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFinanceLabel("");
        setFinanceValue(0);
      }
    );
  };

  const handleDeliveryPatternSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    // for (var i of subData.values()) {

    // }

    // const subData = {
    //   id: applicationInfo?.id,
    //   statusId: deliveryValue,
    // };
    setProgress4(true);
    const returnvalue = put(`Application/UpdateDeliveryPattern`, subData).then(
      (action) => {
        setProgress4(false);
        setSuccess(!success);
        setDeliveryModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setDeliveryLabel("");
        setDeliveryValue(0);
      }
    );
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleUniStdIdSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress5(true);
    const returnvalue = put(
      `Application/UpdateUniversityStudentId`,
      subData
    ).then((action) => {
      setProgress5(false);
      setSuccess(!success);
      setUniStdIdModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleUpdateIntakeSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress9(true);
    const returnvalue = put(`Application/UpdateIntake`, subData).then(
      (action) => {
        setProgress9(false);
        setSuccess(!success);
        setIntakeModal(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    );
  };

  const handleEditUniAppDate = (id) => {
    setUniAppDateModalOpen(true);
  };

  const handleUniAppDateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress6(true);
    const returnvalue = put(
      `Application/UpdateUniversityApplicationDate`,
      subData
    ).then((action) => {
      setProgress6(false);
      setSuccess(!success);
      setUniAppDateModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleElptupdate = (e) => {
    setElptStatusLabel(applicationInfo?.elpt?.elptStatus?.name);
    setElptStatusValue(applicationInfo?.elpt?.elptStatus?.id);
    setElptModalOpen1(true);
  };

  // on close ELPT modal
  const closeElptModal1 = () => {
    setElptModalOpen1(false);
    setElptStatusError(false);
  };

  const handleSubmitElptupdate = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress8(true);
    const returnvalue = put(`ELPT/Update`, subData).then((action) => {
      setProgress8(false);
      setSuccess(!success);
      setElptModalOpen1(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setElptStatusLabel("Select ELPT status");
      setElptStatusValue(0);
    });
  };

  const handleOpenELPTModal = () => {
    setElptModalOpen(true);
  };

  // on close ELPT modal
  const closeElptModal = () => {
    setElptModalOpen(false);
  };

  const handleSubmitElpt = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    if (elptStatusValue === 0) {
      setElptStatusError(true);
    } else {
      setProgress7(true);
      const returnvalue = post(`ELPT/Create`, subData).then((action) => {
        setProgress7(false);
        setSuccess(!success);
        setOfferModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // setElptStatusLabel("Select ELPT status");
        // setElptStatusValue(0);
      });
    }
  };

  return (
    <div>
      <div className="my-4">
        <h2 className="text-secondary">
          {applicationInfo?.student?.nameTittle?.name}{" "}
          {applicationInfo?.student?.firstName}{" "}
          {applicationInfo?.student?.lastName}
        </h2>
      </div>

      <div className="hedding-titel d-flex justify-content-between">
        <div>
          <h5>
            {" "}
            <b>Application Status</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>
      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Status:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                {applicationInfo?.applicationStatus?.name}

                {permissions?.includes(
                  permissionList.Update_Application_Status
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleApplicationEdit(
                        applicationInfo?.applicationStatus?.name,
                        applicationInfo?.applicationStatus?.id
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={statusModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Application Status</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleApplicationUpdateSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Application Status{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={statusMenu}
                            value={{
                              label: statusLabel,
                              value: statusValue,
                            }}
                            onChange={(opt) =>
                              selectStatus(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>Offer Status:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                {applicationInfo?.offerStatus?.name}
                {permissions?.includes(
                  permissionList.Update_Application_OfferStatus
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleOfferEdit(
                        applicationInfo?.offerStatus?.name,
                        applicationInfo?.offerStatus?.id
                      )
                    }
                    permission={6}
                  />
                ) : null}
                <Modal
                  isOpen={offerModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Offer Status</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleOfferUpdateSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Offer Status <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={offerMenu}
                            value={{
                              label: offerLabel,
                              value: offerValue,
                            }}
                            onChange={(opt) =>
                              selectOffer(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress1 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>Enrolment Status:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                {applicationInfo?.enrollmentStatus?.name === "Withdrawn" ? (
                  <>
                    <div className="d-flex flex-column">
                      {applicationInfo?.enrollmentStatus?.name}{" "}
                      <span style={{ color: "red" }}>
                        {applicationInfo?.withdrawnReason}
                      </span>
                    </div>
                  </>
                ) : (
                  <>{applicationInfo?.enrollmentStatus?.name}</>
                )}

                {permissions?.includes(
                  permissionList.Update_Application_EnrollmentStatus
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleEditEnrol(
                        applicationInfo?.enrollmentStatus?.name,
                        applicationInfo?.enrollmentStatus?.id
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={enrollModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Enrolment Status</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleEnrollUpdateSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Enrolment Status{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            isDisabled={
                              applicationInfo?.enrollmentStatus?.name ===
                              "Registered"
                                ? true
                                : false
                            }
                            options={enrollMenu}
                            value={{
                              label: enrollLabel,
                              value: enrollValue,
                            }}
                            onChange={(opt) =>
                              selectEnroll(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
                          {applicationInfo?.enrollmentStatus?.name ===
                          "Registered" ? (
                            <div className="text-danger">
                              Once the enrolment status is changed to
                              "Registered" it can't be changed again.
                            </div>
                          ) : null}
                        </Col>
                      </FormGroup>

                      {enrollValue === 4 ? (
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="4">
                            <span>
                              Withdrwan Reason{" "}
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="8">
                            <Input
                              type="text"
                              defaultValue={applicationInfo?.withdrawnReason}
                              name="withdrawnReason"
                              id="withdrawnReason"
                              placeholder="Write Withdrwan Reason"
                            />
                          </Col>
                        </FormGroup>
                      ) : null}

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

                        <CustomButtonRipple
                          isDisabled={
                            applicationInfo?.enrollmentStatus?.name ===
                            "Registered"
                              ? true
                              : false
                          }
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress2 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Finance</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Student Finance Status:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                {applicationInfo?.studentFinanceStatus?.name}
                {permissions?.includes(
                  permissionList.Update_Application_Student_Finance
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleEditFinance(
                        applicationInfo?.studentFinanceStatus?.name,
                        applicationInfo?.studentFinanceStatus?.id
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={financeModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Student Finance Status</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleFinanceUpdateSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Student Finance{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={financeMenu}
                            value={{
                              label: financeLabel,
                              value: financeValue,
                            }}
                            onChange={(opt) =>
                              selectFinance(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress3 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Application Information</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Application Id:</b>
            </td>

            <td width="60%">{applicationInfo?.applicationViewId}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Delivery Pattern:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                {applicationInfo?.deliveryPattern?.name}
                {permissions?.includes(
                  permissionList.Update_Application_Delivery_Pattern
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleEditDeliveryPattern(
                        applicationInfo?.deliveryPattern?.name,
                        applicationInfo?.deliveryPattern?.id
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={deliveryModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Delivery Pattern</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleDeliveryPatternSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Delivery Pattern{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={deliveryMenu}
                            value={{
                              label: deliveryLabel,
                              value: deliveryValue,
                            }}
                            onChange={(opt) =>
                              selectDelivery(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress4 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>
          <tr>
            <td width="40%">
              <b>Application Type:</b>
            </td>

            <td width="60%">{applicationInfo?.student?.studentType?.name}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Uapp Application date:</b>
            </td>

            <td width="60%">
              {applicationInfo?.applicationTime ? (
                <>{handleDate(applicationInfo?.applicationTime)}</>
              ) : null}
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>University Student Id:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                <div>{applicationInfo?.universityStudentId}</div>
                {permissions?.includes(
                  permissionList.Update_Appliation_University_StudentId
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleEditUniStdId(applicationInfo?.universityStudentId)
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={uniStdIdModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update University Student Id</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleUniStdIdSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>University Student Id </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            defaultValue={applicationInfo?.universityStudentId}
                            name="universityStudentId"
                            id="universityStudentId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress5 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>University Application Date:</b>
            </td>

            <td width="60%">
              <div className="d-flex justify-content-between">
                <div>
                  {applicationInfo?.universityApplicationDate ? (
                    <>
                      {handleDate(applicationInfo?.universityApplicationDate)}
                    </>
                  ) : null}
                </div>
                {permissions?.includes(
                  permissionList.Update_University_ApplicationDate
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleEditUniAppDate(
                        applicationInfo?.universityApplicationDate
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={uniAppDateModalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update University Application Date</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleUniAppDateSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>University Application Date </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="Date"
                            defaultValue={handleDate(
                              applicationInfo?.universityApplicationDate
                            )}
                            name="universityApplicationDate"
                            id="universityApplicationDate"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress6 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>University Name:</b>
            </td>

            <td width="60%">{applicationInfo?.university?.name}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Campus Name:</b>
            </td>

            <td width="60%">{applicationInfo?.campus?.name}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Program-level:</b>
            </td>

            <td width="60%">{applicationInfo?.subject?.programLevel?.name}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Course Name:</b>
            </td>

            <td width="60%">{applicationInfo?.subject?.name}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Intake:</b>
            </td>

            <td width="60%">
              {/* {applicationInfo?.intake?.name} */}

              <div className="d-flex justify-content-between">
                <div>{applicationInfo?.intake?.name}</div>
                {permissions?.includes(
                  permissionList.Update_Application_Intake
                ) ? (
                  <SpanButton
                    icon={
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil-alt pencil-style"
                      ></i>
                    }
                    func={() =>
                      handleUpdateIntake(
                        applicationInfo?.intake?.id,
                        applicationInfo?.intake?.name
                      )
                    }
                    permission={6}
                  />
                ) : null}

                <Modal
                  isOpen={intakeModal}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Intake</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleUpdateIntakeSubmit}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={applicationInfo?.id}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>Intake </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={intakeMenu}
                            value={{
                              label: intakeLabel,
                              value: intakeValue,
                            }}
                            onChange={(opt) =>
                              selectIntake(opt.label, opt.value)
                            }
                            name="intakeId"
                            id="intakeId"
                          />
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

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress9 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>Additional Message:</b>
            </td>

            <td width="60%">{applicationInfo?.additionalMessage}</td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Interview</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Status:</b>
            </td>

            <td width="60%">{applicationInfo?.interviewStatus?.name}</td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4 mt-5">
        <div>
          <h5>
            {" "}
            <b>ELPT</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        <div className="text-right">
          {/* <span> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}
          {permissions?.includes(permissionList.Update_ELPT) ? (
            <>
              {applicationInfo?.elpt !== null ? (
                <SpanButton
                  icon={
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-pencil-alt pencil-style"
                    ></i>
                  }
                  func={handleElptupdate}
                  permission={6}
                />
              ) : null}
            </>
          ) : null}

          <Modal
            size="lg"
            isOpen={elptModalOpen1}
            toggle={closeElptModal1}
            className="uapp-modal2"
          >
            <ModalHeader>Update ELPT</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitElptupdate}>
                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="applicationId"
                    name="applicationId"
                    value={id}
                  />
                  <Input
                    type="hidden"
                    id="id"
                    name="id"
                    value={applicationInfo?.elpt?.id}
                  />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ELPT Date</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="ElptDate"
                      id="ElptDate"
                      defaultValue={elptDate}
                    />
                    {/* <div className="form-control-position">
                                <User size={15} />
                            </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ELPT Time</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="ElptTime"
                      id="ElptTime"
                      defaultValue={applicationInfo?.elpt?.elptTime}
                      placeholder="Enter ELPT Time"
                    />

                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ETA Date</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="eta"
                      id="eta"
                      defaultValue={etaDate}
                    />

                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ETA Deadline</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="etaDeadLine"
                      id="etaDeadLine"
                      defaultValue={eatDeadLine}
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Reading</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="reading"
                      id="reading"
                      defaultValue={applicationInfo?.elpt?.reading}
                      placeholder="Enter Reading Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Writting </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="writting"
                      id="writting"
                      defaultValue={applicationInfo?.elpt?.writting}
                      placeholder="Enter Writting Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Listening </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="listening"
                      id="listening"
                      defaultValue={applicationInfo?.elpt?.listening}
                      placeholder="Enter Listening Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Speaking </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="speaking"
                      id="speaking"
                      defaultValue={applicationInfo?.elpt?.speaking}
                      placeholder="Enter Speaking Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Overall </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="overall"
                      id="overall"
                      defaultValue={applicationInfo?.elpt?.overall}
                      placeholder="Enter Overall Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Result / Status </span>{" "}
                    <span className="text-danger">*</span>{" "}
                  </Col>
                  <Col md="7">
                    <Select
                      options={elptStatusMenu}
                      value={{
                        label: elptStatusLabel,
                        value: elptStatusValue,
                      }}
                      onChange={(opt) => selectElpt(opt.label, opt.value)}
                      name="elptStatusId"
                      id="elptStatusId"
                    />
                    {elptStatusError ? (
                      <div className="text-danger">
                        Please provide ELPT status
                      </div>
                    ) : null}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Col md="5">
                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"ml-5 mt-3"}
                      name={progress8 ? <ButtonLoader /> : "Submit"}
                      permission={6}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              {/* <Button
                              color="danger"
                              onClick={() =>
                                handleDeleteDocumentGroup(
                                  localStorage.getItem("delDocuGroupId")
                                )
                              }
                            >
                              YES
                            </Button> */}
              <Button color="danger" onClick={closeElptModal1}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      {applicationInfo?.elpt === null ? (
        <>
          {permissions?.includes(permissionList.Add_ELPT) ? (
            <ButtonForFunction
              func={handleOpenELPTModal}
              className={"badge-primary"}
              name={<b>Add ELPT</b>}
              permission={6}
            />
          ) : null}

          <Modal
            size="lg"
            isOpen={elptModalOpen}
            toggle={closeElptModal}
            className="pt-5 uapp-modal2"
          >
            <ModalHeader>Add ELPT</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitElpt}>
                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="applicationId"
                    name="applicationId"
                    value={id}
                  />
                  {/* <Input
                                  type="hidden"
                                  id="Id"
                                  name="Id"
                                  value={selectedId}
                                /> */}
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ELPT Date</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="ElptDate"
                      id="ElptDate"
                      // defaultValue={sDate}
                    />
                    {/* <div className="form-control-position">
                                <User size={15} />
                            </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ELPT Time</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="ElptTime"
                      id="ElptTime"
                      // defaultValue={campObj?.campusCity}
                      placeholder="Enter ELPT Time"
                      required
                    />

                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ETA Date</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="eta"
                      id="eta"
                      // defaultValue={sDate}
                    />

                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>ETA Deadline</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="date"
                      name="etaDeadLine"
                      id="etaDeadLine"
                      // defaultValue={sDate}
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Reading</span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="reading"
                      id="reading"
                      // defaultValue={campObj?.addressLine}
                      placeholder="Enter Reading Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Writting </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="writting"
                      id="writting"
                      // defaultValue={campObj?.totalStudent}
                      placeholder="Enter Writting Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Listening </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="listening"
                      id="listening"
                      // defaultValue={campObj?.internationalStudent}
                      placeholder="Enter Listening Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Speaking </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="speaking"
                      id="speaking"
                      // defaultValue={campObj?.avarageTutionFee}
                      placeholder="Enter Speaking Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Overall </span>
                  </Col>
                  <Col md="7">
                    <Input
                      type="text"
                      name="overall"
                      id="overall"
                      // defaultValue={campObj?.avarageLivingCost}
                      placeholder="Enter Overall Mark"
                    />
                    {/* <div className="form-control-position">
                        <User size={15} />
                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Result / Status </span>{" "}
                    <span className="text-danger">*</span>{" "}
                  </Col>
                  <Col md="7">
                    <Select
                      options={elptStatusMenu}
                      value={{
                        label: elptStatusLabel,
                        value: elptStatusValue,
                      }}
                      onChange={(opt) => selectElpt(opt.label, opt.value)}
                      name="elptStatusId"
                      id="elptStatusId"
                    />
                    {elptStatusError ? (
                      <div className="text-danger">ELPT status is required</div>
                    ) : null}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Col md="5">
                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"ml-5 mt-3"}
                      name={progress7 ? <ButtonLoader /> : "Submit"}
                      permission={6}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              {/* <Button
                              color="danger"
                              onClick={() =>
                                handleDeleteDocumentGroup(
                                  localStorage.getItem("delDocuGroupId")
                                )
                              }
                            >
                              YES
                            </Button> */}
              <Button color="danger" onClick={closeElptModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </>
      ) : (
        <Table className="table-bordered mt-4">
          <tbody>
            <tr>
              <td width="40%">
                <b>Status:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.elptStatus?.name}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Date:</b>
              </td>

              <td width="60%">
                {applicationInfo?.elpt?.elptDate ? (
                  <>{handleDate(applicationInfo?.elpt?.elptDate)}</>
                ) : null}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>Time:</b>
              </td>

              <td width="60%">
                <>{applicationInfo?.elpt?.elptTime}</>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>ETA:</b>
              </td>

              <td width="60%">
                {applicationInfo?.elpt?.eta ? (
                  <>{handleDate(applicationInfo?.elpt?.eta)}</>
                ) : null}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>ETA Deadline:</b>
              </td>

              <td width="60%">
                {applicationInfo?.elpt?.etaDeadline ? (
                  <>{handleDate(applicationInfo?.elpt?.etaDeadline)}</>
                ) : null}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>Reading:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.reading}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Writting:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.writting}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Listening:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.listening}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Speaking:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.speaking}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Overall:</b>
              </td>

              <td width="60%">{applicationInfo?.elpt?.overall}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ApplicationInfo;
