import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Col,
  Input,
} from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import Select from "react-select";
import ButtonForFunction from "../Components/ButtonForFunction";
import { Hidden } from "@material-ui/core";
import remove from "../../../helpers/remove";
import ButtonLoader from "../Components/ButtonLoader";

const AddCity = () => {
  const history = useHistory();
  const [uni, setUni] = useState([]);
  const [uniError, setUniError] = useState("");
  const [uniLabel, setUniLabel] = useState("Select University County");
  const [uniValue, setUniValue] = useState(0);
  const [city, setCity] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cityvar, setCityVar] = useState("");
  const [data, setData] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});

  // useEffect(()=>{

  //     get(`UniversityCountryDD/Index`)
  //     .then(res => {
  //         setUni(res);
  //         setLoading(false);
  //     })

  //     get(`UniversityCity/Index`)
  //     .then(res => {
  //         setCity(res);
  //         setLoading(false);
  //     })

  // },[success])

  const backToDashboard = () => {
    history.push("/");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setUniLabel("Select University");
    setUniValue(0);
  };

  const uniOptions = uni?.map((ans) => ({
    label: ans?.name,
    value: ans?.id,
  }));

  const selectUni = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
    setUniError("");
  };

  const handleDeleteUniState = () => {
    remove(`UniversityCity/Delete/${delData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
    setDeleteModal(false);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUniLabel("Select University Country");
    setUniValue(0);
    setCityVar("");
    setData({});
    setUniError("");
  };

  // delete button click
  const toggleDanger = (state) => {
    setDelData(state);
    setDeleteModal(true);
  };

  const handleUpdate = (data) => {
    setData(data);
    setModalOpen(true);
    setUniLabel(data?.universityCountry?.name);
    setUniValue(data?.universityCountryId);
    setCityVar(data?.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (uniValue == 0) {
      setUniError("University country is required");
    } else {
      if (!data?.id) {
        setButtonStatus(true);
        setProgress(true);
        post(`UniversityCity/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setCityVar("");
            setUniLabel("Select University Country");
            setUniValue(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: "true",
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`UniversityCity/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setCityVar("");
            setUniLabel("Select University Country");
            setUniValue(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: "true",
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">City List</h3>
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
          {permissions?.includes(permissionList?.Add_New_City) ? (
            <ButtonForFunction
              className={"btn btn-uapp-add"}
              func={() => setModalOpen(true)}
              icon={<i className="fas fa-plus"></i>}
              name={" Add City"}
            />
          ) : null}

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary"> {city?.length} </span>{" "}
              States Found{" "}
            </b>
          </div>
        </CardHeader>

        <CardBody>
          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader> City</ModalHeader>

              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {data?.id ? (
                    <input type="Hidden" name="id" id="id" value={data?.id} />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        City <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        required
                        name="name"
                        id="name"
                        value={cityvar}
                        placeholder="Write City Name"
                        onChange={(e) => {
                          setCityVar(e.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        University Country{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Select
                        options={uniOptions}
                        value={{ label: uniLabel, value: uniValue }}
                        onChange={(opt) => selectUni(opt.label, opt.value)}
                        name="universityCountryId"
                        id="universityCountryId"
                      />
                      <span className="text-danger">{uniError}</span>
                    </Col>
                  </FormGroup>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button
                      color="danger"
                      className="mr-2 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    <Button
                      type="submit"
                      color="primary"
                      className="mt-3"
                      disabled={buttonStatus}
                    >
                      {progress ? <ButtonLoader /> : "Submit"}
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>

          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>State</th>
                  <th className="text-center">Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {city?.map((state, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{state?.name}</td>
                    <td>{state?.universityCountry?.name}</td>
                    <td>
                      <ButtonGroup>
                        {permissions?.includes(
                          permissionList.Update_City_info
                        ) ? (
                          <ButtonForFunction
                            func={() => handleUpdate(state)}
                            className={"mx-1 btn-sm"}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />
                        ) : null}

                        {permissions?.includes(permissionList?.Delete_city) ? (
                          <ButtonForFunction
                            func={() => toggleDanger(state)}
                            className={"mx-1 btn-sm"}
                            color={"danger"}
                            icon={<i className="fas fa-trash-alt"></i>}
                          />
                        ) : null}
                      </ButtonGroup>

                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal2"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this <b>{delData?.name}</b> ?
                            Once Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() => handleDeleteUniState()}
                            disabled={buttonStatus}
                          >
                            {progress ? <ButtonLoader /> : "YES"}
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

export default AddCity;
