import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonGroup, Table } from "reactstrap";
import {
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
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { User } from "react-feather";
import { useToasts } from "react-toast-notifications";

import { useDispatch } from "react-redux";
import { StoreEmployeeTypeData } from "../../../../redux/actions/SMS/Employees/EmployeesTypeAction";
import { useHistory } from "react-router";
import get from "../../../../helpers/get";

import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import loader from "../../../../assets/img/load.gif";
import ButtonLoader from "../../Components/ButtonLoader";
const EmployeeType = (props) => {
  const myForm = createRef();
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeesTypeName, setemployeesTypeName] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState(undefined);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const EmployeesTypeList = props.EmployeesTypeList[0];
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [empDelName, setEmpDelName] = useState("");
  const [empDelId, setEmpDelId] = useState(undefined);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const openModal = () => {
    setModalOpen(!modalOpen);
    setSelected("");
    setSelectedId(undefined);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
    setSelectedId(undefined);
    setemployeesTypeName("");
    localStorage.removeItem("updateemployeesType");
  };

  // useEffect(() => {
  //    get(`EmployeType/Index`).then((data) => {
  //    setLoading(false);
  //     dispatch(StoreEmployeeTypeData(data))

  //   })
  // }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = {
      Name: employeesTypeName,
    };

    setProgress(true);
    const returnValue = post(`EmployeType/Create`, subdata).then((action) => {
      setSuccess(!success);
      setModalOpen(false);

      setProgress(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setemployeesTypeName("");
      setSelected("");
      setSelectedId(undefined);
      get(`EmployeType/Index`).then((data) => {
        dispatch(StoreEmployeeTypeData(data));
      });
    });
  };

  const handleUpdate = (p) => {
    setModalOpen(true);
    setSelected(p?.name);
    setSelectedId(p?.id);
    // localStorage.setItem('updateemployeesType', p.id)
  };

  const changingemployeesType = (v) => {
    setemployeesTypeName(v);
    setSelected(v);
  };
  const toggleDanger = (p) => {
    // localStorage.setItem('employeesTypeId', p.id);
    setEmpDelId(p?.id);
    setEmpDelName(p?.name);
    // localStorage.setItem('employeesTypeName', p.name)
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    setProgress2(true);
    const returnValue = remove(`EmployeType/Delete/${id}`).then((action) => {
      setDeleteModal(false);
      setSuccess(!success);
      setProgress2(false);

      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setEmpDelName("");
      setEmpDelId(undefined);
      // localStorage.removeItem('employeesTypeId')
      // localStorage.removeItem('employeesTypeName')
      get(`EmployeType/Index`).then((data) => {
        dispatch(StoreEmployeeTypeData(data));
      });
    });
  };

  const handleUpdateSubmit = () => {
    // const id = localStorage.getItem('updateemployeesType');

    const subData = {
      Name: selected,
      Id: selectedId,
    };

    setProgress1(true);
    const returnvalue = put(`EmployeType/Update`, subData).then((action) => {
      setSuccess(!success);
      setModalOpen(false);

      if (action?.status == 200) {
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setProgress1(false);
        setSelected("");
        setSelectedId(undefined);
        // localStorage.removeItem('updateemployeesType')
        get(`EmployeType/Index`).then((data) => {
          dispatch(StoreEmployeeTypeData(data));
        });
      } else {
        addToast(action?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setProgress1(false);
      }
    });
  };

  // employee count click
  const handleEmpCount = (id) => {
    history.push(`/staffListByType/${id}`);
  };
  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <img className="img-fluid" src={loader} alt="uapp_loader" />
        </div>
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Staff Types</h3>
              <div className="page-header-back-to-home">
                <span onClick={backToDashboard} className="text-white">
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <ButtonForFunction
                // color={"success"}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                func={() => setModalOpen(true)}
                name={" Add Employee Type"}
                permission={6}
              />

              <div className="mt-2">
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {EmployeesTypeList?.length}
                  </span>{" "}
                  Staff Types Found{" "}
                </b>
              </div>
            </CardHeader>
            <CardBody>
              <Modal
                isOpen={modalOpen}
                toggle={openModal}
                className="uapp-modal"
              >
                <ModalHeader>Employees Type</ModalHeader>
                <ModalBody>
                  <Form ref={myForm} onSubmit={handleSubmit}>
                    <Input type="number" name="Id" id="Id" hidden />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Employees Type <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="text"
                          name="Name"
                          id="Name"
                          value={selected}
                          placeholder="Employees Type"
                          onChange={(e) =>
                            changingemployeesType(e.target.value)
                          }
                          required
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
                        onClick={() => closeModal()}
                      >
                        Close
                      </Button>

                      {
                        // localStorage.getItem("updateemployeesType") ?
                        selectedId != undefined ? (
                          <Button
                            color="primary"
                            className="mr-1 mt-3"
                            onClick={handleUpdateSubmit}
                          >
                            {progress1 ? <ButtonLoader /> : "Update"}
                          </Button>
                        ) : (
                          <Button.Ripple
                            color="primary"
                            type="submit"
                            className="mr-1 mt-3"
                          >
                            {progress ? <ButtonLoader /> : "Submit"}
                          </Button.Ripple>
                        )
                      }
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      <th className="text-center"> Total Staff</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EmployeesTypeList?.map((etype, i) => (
                      <tr key={etype.id} style={{ textAlign: "center" }}>
                        <th scope="row">{i + 1}</th>
                        <td>{etype.name}</td>
                        <td className="text-center">
                          <span
                            onClick={() => handleEmpCount(etype?.id)}
                            className="badge badge-pill badge-primary cursor-pointer"
                          >
                            {" "}
                            {etype.employeeCount}{" "}
                          </span>
                        </td>
                        <td>
                          <ButtonGroup>
                            {etype?.id == 2 ||
                            etype?.id == 3 ||
                            etype?.id == 4 ||
                            etype?.id == 5 ||
                            etype?.id == 6 ||
                            etype?.id == 7 ? null : (
                              <>
                                {/* <Button onClick={() => handleUpdate(etype)} color="warning" className=" btn-sm"> <i className="fas fa-edit"></i> </Button> */}

                                <ButtonForFunction
                                  func={() => handleUpdate(etype)}
                                  color={"warning"}
                                  className={"mr-2 btn-sm"}
                                  icon={<i className="fas fa-edit"></i>}
                                  permission={6}
                                />

                                {/* <Button onClick={() => toggleDanger(etype)} color="danger" className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}

                                <ButtonForFunction
                                  func={() => toggleDanger(etype)}
                                  color={"danger"}
                                  className={"btn-sm"}
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  permission={6}
                                />
                              </>
                            )}
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}

                    <Modal
                      isOpen={deleteModal}
                      toggle={() => setDeleteModal(!deleteModal)}
                      className="uapp-modal"
                    >
                      <ModalBody>
                        <p>
                          Are You Sure to Delete this <b>{empDelName}</b> ? Once
                          Deleted it can't be Undone!
                        </p>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={() => handleDeletePermission(empDelId)}
                          color="danger"
                        >
                          {progress2 ? <ButtonLoader /> : "YES"}
                        </Button>
                        <Button onClick={() => setDeleteModal(false)}>
                          NO
                        </Button>
                      </ModalFooter>
                    </Modal>
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
const mapStateToProps = (state) => ({
  EmployeesTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(EmployeeType);
