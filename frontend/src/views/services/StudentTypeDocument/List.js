import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
} from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import ButtonForFunction from "../Components/ButtonForFunction";
import { permissionList } from "../../../constants/AuthorizationConstant";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import ButtonLoader from "../Components/ButtonLoader";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";

const List = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const { addToast } = useToasts();
  const [list, setList] = useState([]);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [document, setDocument] = useState([]);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [app, setApp] = useState([]);
  const [appLabel, setAppLabel] = useState("Select Application Type");
  const [appValue, setAppValue] = useState(0);
  const [docLabel, setDocLabel] = useState("Select Document Type");
  const [docValue, setDocValue] = useState(0);
  const [appError, setAppError] = useState("");
  const [docError, setDocError] = useState("");
  const [manError, setManError] = useState("");
  const [man, setMan] = useState(null);

  // useEffect(()=>{

  //         get(`StudentTypeDocument/Index`)
  //         .then(res => {
  //             setList(res);
  //         })

  //         get(`DocumentDD/Index`)
  //         .then(res => {
  //             setDocument(res);
  //         })

  //         get(`ApplicationTypeDD/Index`)
  //         .then(res => {
  //             setApp(res);
  //         })
  // },[success])

  const appOption = app?.map((ap) => ({
    label: ap?.name,
    value: ap?.id,
  }));

  const documentOption = document?.map((doc) => ({
    label: doc?.name,
    value: doc?.id,
  }));

  const selectApp = (label, value) => {
    setAppError("");
    setAppLabel(label);
    setAppValue(value);
  };

  const selectDocument = (label, value) => {
    setDocError("");
    setDocLabel(label);
    setDocValue(value);
  };

  const handleApplication = (event) => {
    setMan(event.target.value);
    setManError("");
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const closeModal = () => {
    setModalOpen(false);
    setAppLabel("Select Application Type");
    setAppValue(0);
    setDocLabel("Select Document Type");
    setDocValue(0);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelData({});
    setDeleteModal(false);
  };

  const toggleDanger = (data) => {
    setDelData(data);

    setDeleteModal(true);
  };

  const handleDeleteDocumentGroup = () => {
    setButtonStatus2(true);
    setProgress2(true);
    remove(`StudentTypeDocument/Delete/${delData?.id}`).then((res) => {
      setButtonStatus2(false);
      setProgress2(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      closeDeleteModal();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    if (docValue == 0) {
      setDocError("Document type is required");
    } else if (appValue == 0) {
      setAppError("Application type is required");
    } else if (man == null) {
      setManError("Must select one option");
    } else {
      setButtonStatus(true);
      setProgress1(true);
      post(`StudentTypeDocument/Create`, subData).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          closeModal();
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          closeModal();
        }
      });
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Student Type Document Group</h3>
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
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              {permissions?.includes(
                permissionList.Add_New_Student_Type_Documents
              ) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Student Type Document Group"}
                  permission={6}
                />
              ) : null}
            </div>

            <div>
              {" "}
              <b>
                {" "}
                Total{" "}
                <span className="badge badge-primary">{list?.length}</span>{" "}
                Student Type Document Group Found{" "}
              </b>
            </div>
          </div>

          {permissions?.includes(
            permissionList?.Add_New_Student_Type_Documents
          ) ? (
            <div>
              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal2"
              >
                <ModalHeader>Student Type Document Group</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Document Type <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={documentOption}
                          value={{
                            label: docLabel,
                            value: docValue,
                          }}
                          onChange={(opt) =>
                            selectDocument(opt.label, opt.value)
                          }
                          name="documentId"
                          id="documentId"
                        />

                        <span className="text-danger">{docError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={appOption}
                          value={{
                            label: appLabel,
                            value: appValue,
                          }}
                          onChange={(opt) => selectApp(opt.label, opt.value)}
                          name="applicationTypeId"
                          id="applicationTypeId"
                        />

                        <span className="text-danger">{appError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Details <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="textarea"
                          required
                          name="details"
                          id="details"
                          placeholder="Enter Details"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Mandatory {""}
                          <span className="text-danger">*</span>
                        </span>
                      </Col>
                      <Col md="8">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleApplication}
                            name="isMandatory"
                            value="true"
                            checked={man == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleApplication}
                            name="isMandatory"
                            value="false"
                            checked={man == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            No
                          </Label>
                        </FormGroup>

                        <br />

                        <span className="text-danger">{manError}</span>
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
                        className={"mr-0 mt-3"}
                        name={progress1 ? <ButtonLoader /> : "Submit"}
                        permission={6}
                        isDisabled={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
            </div>
          ) : null}

          <div className="mt-3 table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Title</th>

                  <th>Application type</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {list?.map((doc, i) => (
                  <tr key={doc?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>

                    <td className="text-center">{doc?.document?.name}</td>
                    <td className="text-center">
                      {doc?.applicationTypeId === 1 ? (
                        <span>Home</span>
                      ) : doc?.applicationTypeId === 2 ? (
                        <span>EU/UK</span>
                      ) : (
                        <span>International</span>
                      )}
                    </td>

                    <td>
                      <ButtonGroup>
                        {permissions?.includes(
                          permissionList.Delete_Student_Type_Documents
                        ) ? (
                          <ButtonForFunction
                            className={"mx-1 btn-sm"}
                            func={() => toggleDanger(doc)}
                            color={"danger"}
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
                            Are You Sure to Delete this ? Once Deleted it can't
                            be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            disabled={buttonStatus2}
                            color="danger"
                            onClick={handleDeleteDocumentGroup}
                          >
                            {progress2 ? <ButtonLoader /> : "YES"}
                          </Button>
                          <Button onClick={closeDeleteModal}>NO</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default List;
