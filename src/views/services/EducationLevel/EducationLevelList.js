import React, { useEffect, useState } from "react";
import get from "../../../helpers/get";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  ModalHeader,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import ButtonForFunction from "../Components/ButtonForFunction";
import remove from "../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import LinkButton from "../Components/LinkButton";
import Loader from "../Search/Loader/Loader";
import put from "../../../helpers/put";
import post from "../../../helpers/post";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";

const EducationLevelList = () => {
  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [educationLevelData, setEducationLevelData] = useState([]);
  const [deleteData, setDeleteData] = useState({});

  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});

  // Delete Modal

  const toggleDanger = (data) => {
    //
    setDeleteData(data);
    setDeleteModal(true);
  };

  // Delete Button

  const handleDeleteData = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`EducationLevel/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const closeModal = () => {
    setData({});
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (data?.id) {
      setButtonStatus(true);
      setProgress1(true);
      put(`EducationLevel/Update`, subData).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setData({});
          setModalOpen(false);
        }
      });
    } else {
      setButtonStatus(true);
      setProgress1(true);
      post(`EducationLevel/Create`, subData).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setData({});
          setModalOpen(false);
        }
      });
    }
  };

  // Go To Education Level Form Page

  const handleAddEducationLevel = () => {
    setModalOpen(true);
  };

  // useEffect(() => {
  //   get("EducationLevel/Index").then((res) => {
  //     setEducationLevelData(res);
  //     setLoading(false);
  //   });
  // }, [success]);

  // back to dashboard

  const backToDashboard = () => {
    history.push("/");
  };

  const redirectToUpdate = (data) => {
    setData(data);
    setModalOpen(true);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Education Level Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} className="mt-5">
                {data?.id ? (
                  <input type="hidden" name="id" id="id" value={data?.id} />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      required
                      defaultValue={data?.name}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Description <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      rows={8}
                      placeholder="Enter Description"
                      defaultValue={data?.description}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Level Value <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="number"
                      name="levelValue"
                      id="levelValue"
                      placeholder="Enter Level Value"
                      required
                      defaultValue={data?.levelValue}
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="12">
                    <div className="d-flex justify-content-between">
                      <Button
                        color="danger"
                        className="mt-3 mr-1"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>

                      <ButtonForFunction
                        type={"submit"}
                        name={progress1 ? <ButtonLoader /> : "Submit"}
                        className={"ml-1 mt-3 badge-primary"}
                        disable={buttonStatus}
                      />
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>

          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Education Level List</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToDashboard}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              {/* <div className='mb-3'> */}
              {permissions?.includes(permissionList.Add_New_Education_Level) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  func={handleAddEducationLevel}
                  name={" Add Educational Level"}
                />
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {educationLevelData?.length}
                  </span>{" "}
                  Education Level Found{" "}
                </b>
              </div>

              {/* </div> */}
            </CardHeader>

            <CardBody>
              <div className="table-responsive mb-3">
                <Table className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      <th>Decription</th>
                      <th>Level Value</th>
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationLevelData?.map((educationInfo, i) => (
                      <tr
                        key={educationInfo?.id}
                        style={{ textAlign: "center" }}
                      >
                        <th scope="row">{serialNum + i}</th>
                        <td>{educationInfo?.name}</td>

                        <td>{educationInfo?.description}</td>

                        <td>{educationInfo?.levelValue}</td>

                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.Update_Education_Level_info
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={() => redirectToUpdate(educationInfo)}
                              />
                            ) : null}

                            {/* <LinkButton
                             icon={<i className="fas fa-edit"></i>}
                             color={"warning"}
                             className={"mx-1 btn-sm"}
                             url={`/addEducationLevel/${educationInfo?.name}/${educationInfo?.description}/${educationInfo?.levelValue}/${educationInfo?.id}`}
                            /> */}

                            {permissions?.includes(
                              permissionList.Delete_Education_Level
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-trash-alt"></i>}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(educationInfo)}
                              />
                            ) : null}
                          </ButtonGroup>

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
                                onClick={() => handleDeleteData(deleteData)}
                                disabled={buttonStatus}
                              >
                                {progress ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={() => setDeleteModal(false)}>
                                NO
                              </Button>
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
      )}
    </div>
  );
};

export default EducationLevelList;
