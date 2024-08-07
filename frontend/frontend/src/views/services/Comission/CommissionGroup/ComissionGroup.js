import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
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
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  ButtonGroup,
} from "reactstrap";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";

const ComissionGroup = () => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [commission, setCommission] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [delData, setDelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);

  // useEffect(()=>{

  //   get(`CommissionGroup/Index`)
  //   .then(res => {

  //     setCommission(res);
  //     setLoading(false);
  //   })

  // },[success])

  const backToDashboard = () => {
    history.push("/");
  };

  const handleupdate = (data) => {
    setData(data);
    setEdit(true);
    setOpenModal(true);
  };

  const toggleDanger = (data) => {
    setDeleteModal(true);

    setDelData(data);
  };

  const confirmDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`CommissionGroup/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelData({});
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    if (edit) {
      setButtonStatus(true);
      setProgress(true);
      put(`CommissionGroup/Update`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setEdit(false);
          setData({});
          setOpenModal(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(`CommissionGroup/Create`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setOpenModal(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const modalOff = () => {
    setOpenModal(false);
    setData({});
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={openModal} toggle={modalOff} className="uapp-modal">
            <ModalBody>
              <form onSubmit={submitModalForm} className="mt-3">
                {edit ? (
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
                      defaultValue={data?.name}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="12">
                    <div className="d-flex justify-content-between">
                      <Button
                        color="danger"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={buttonStatus}
                      >
                        {progress ? <ButtonLoader /> : "Submit"}
                      </Button>
                    </div>
                  </Col>
                </FormGroup>
              </form>
            </ModalBody>
          </Modal>

          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Commission Groups</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToDashboard}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card className="uapp-employee-search">
            <CardHeader>
              {permissions?.includes(permissionList.Add_New_CommissionGroup) ? (
                <div className="">
                  <Button
                    className="btn btn-uapp-add"
                    onClick={() => setOpenModal(true)}
                  >
                    <i className="fas fa-plus"></i> Add Commission Group
                  </Button>
                </div>
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {commission?.length}
                  </span>{" "}
                  Commission Group Found{" "}
                </b>
              </div>
            </CardHeader>

            <CardBody className="search-card-body">
              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      {permissions?.includes(
                        permissionList.View_CommissionGroup_info
                      ) ? (
                        <th>Price Settings</th>
                      ) : null}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commission?.map((comm, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        <th scope="row">{i + 1}</th>
                        <td>{comm?.name}</td>
                        {permissions?.includes(
                          permissionList.View_CommissionGroup_info
                        ) ? (
                          <td>
                            <Link to={`/commissionPriceList/${comm?.id}`}>
                              <Button color="primary">Edit / View</Button>
                            </Link>
                          </td>
                        ) : null}

                        <td style={{ width: "15%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <ButtonForFunction
                              icon={<i className="fas fa-edit"></i>}
                              color={"dark"}
                              className={"mx-1 btn-sm"}
                              func={()=>handleEdit(student)}
                              /> */}

                            {permissions?.includes(
                              permissionList.Update_CommissionGroup_info
                            ) ? (
                              <Button
                                className="mr-1 btn-sm"
                                color="warning"
                                onClick={() => handleupdate(comm)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            ) : null}

                            {permissions?.includes(
                              permissionList?.Delete_CommissionGroup
                            ) ? (
                              <Button
                                className="ml-1 btn-sm"
                                color="danger"
                                onClick={() => toggleDanger(comm)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                            ) : null}

                            {/* <Button onClick={() => toggleDanger(student?.name, student?.id)} color="danger" className="mx-1 btn-sm">
                              <i className="fas fa-trash-alt"></i>
                            </Button> */}

                            {/* <ButtonForFunction
                            icon={<i className="fas fa-trash-alt"></i>}
                            color={'danger'}
                            className={"mx-1 btn-sm"}
                            func={()=> toggleDanger(student)}
  
                            /> */}
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
                                onClick={confirmDelete}
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

export default ComissionGroup;
