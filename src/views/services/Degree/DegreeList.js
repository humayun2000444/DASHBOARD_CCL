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
import CustomButtonRipple from "../Components/CustomButtonRipple";
import Select from "react-select";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";

const DegreeList = () => {
  const [degreeList, setDegreeList] = useState([]);

  const [deleteData, setDeleteData] = useState({});

  const { addToast } = useToasts();
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState({});

  const [education, setEducation] = useState([]);
  const [educationLabel, setEducationLabel] = useState(
    "Select Education Level"
  );
  const [educationValue, setEducationValue] = useState(0);
  const [educationError, setEducationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Education level is required"
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // useEffect(()=>{

  //     get(`Degree/Index`)
  //     .then(res => {

  //         setDegreeList(res);
  //         setLoading(false);
  //     })

  //     get('EducationLevelDD/Index')
  //     .then(res => {

  //         setEducation(res);
  //     })

  // },[success])

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
    remove(`Degree/Delete/${data?.id}`).then((res) => {
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

  const educationName = education?.map((edu) => ({
    label: edu.name,
    value: edu.id,
  }));

  // select  Education Level
  const selectEducationLevel = (label, value) => {
    setEducationError(false);
    setEducationLabel(label);
    setEducationValue(value);
  };

  const handleAddDegree = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setData({});

    setEducationLabel(`Select Education Level`);
    setEducationValue(0);

    setModalOpen(false);
  };

  // back to dashboard

  const backToDashboard = () => {
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (educationValue == 0) {
      setEducationError(true);
    } else {
      // if(degreeName !== undefined && eduLabel !== undefined && educationId !== undefined && id !== undefined){
      //   setButtonStatus(true);
      //     put(`Degree/Update`,subData)
      //     .then( res => {
      //       setButtonStatus(false);
      //         if(res?.status ==200 && res?.data?.isSuccess == true){
      //             addToast(res?.data?.message,{
      //                 appearance: 'success',
      //                 autoDismiss: true
      //             })
      //             history.push('/degreeList');

      //         }

      //     })

      // }

      if (data?.id) {
        setButtonStatus(true);
        setProgress1(true);
        put(`Degree/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setData({});
            setSuccess(!success);
            setEducationLabel(`Select Education Level`);
            setEducationValue(0);
            setModalOpen(false);
          }
        });
      } else {
        setButtonStatus(true);
        setProgress1(true);
        post("Degree/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setEducationLabel(`Select Education Level`);
            setEducationValue(0);
            setModalOpen(false);
          }
        });
      }
    }
  };

  const redirectToUpdate = (data) => {
    setData(data);
    setEducationLabel(data?.educationLevel?.name);
    setEducationValue(data?.educationLevel?.id);
    setModalOpen(true);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Degree Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
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
                      Education Level <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={educationName}
                      defaultValue={{
                        label: educationLabel,
                        value: educationValue,
                      }}
                      onChange={(opt) =>
                        selectEducationLevel(opt.label, opt.value)
                      }
                      name="educationLevelId"
                      id="educationLevelId"
                      required
                    />
                    {educationError ? (
                      <span className="text-danger">{errorMessage}</span>
                    ) : null}
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
                        className="mt-3"
                        onClick={closeModal}
                      >
                        Close
                      </Button>

                      <ButtonForFunction
                        type={"submit"}
                        name={progress1 ? <ButtonLoader /> : "Submit"}
                        className={"mr-1 mt-3 badge-primary"}
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
              <h3 className="text-white">Degree List</h3>
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

              {permissions?.includes(permissionList.Add_New_degree) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  func={handleAddDegree}
                  name={" Add Degree"}
                />
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {degreeList?.length}
                  </span>{" "}
                  Degrees Found{" "}
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
                      <th>Education Level Name</th>
                      <th>Education Level Description </th>
                      <th>Education Level Value </th>
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {degreeList?.map((degree, i) => (
                      <tr key={degree?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{serialNum + i}</th>
                        <td>{degree?.name}</td>

                        <td>{degree?.educationLevel?.name}</td>

                        <td>{degree?.educationLevel?.description}</td>

                        <td>{degree?.educationLevel?.levelValue}</td>

                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.Update_degree_info
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={() => redirectToUpdate(degree)}
                              />
                            ) : null}

                            {/* <LinkButton
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                url={`/addDegree/${degree?.name}/${degree?.educationLevel?.name}/${degree?.educationLevel?.id}/${degree?.id}`}
                                /> */}

                            {permissions?.includes(
                              permissionList.Delete_degree
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-trash-alt"></i>}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(degree)}
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

export default DegreeList;
