import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  ButtonGroup,
  Card,
  Label,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";

import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import get from "../../../helpers/get";
import { permissionList } from "../../../constants/AuthorizationConstant";
import { userTypes } from "../../../constants/userTypeConstant";
import ButtonLoader from "../Components/ButtonLoader";

const AssignOfficerUniversity = () => {
  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [providerUniList, setProviderUniList] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [uniError, setUniError] = useState(false);

  const [uniList, setUniList] = useState([]);
  const [success, setSuccess] = useState(false);

  const [radioIsAcceptHome, setRadioIsAcceptHome] = useState("false");
  const [radioIsAcceptUk, setRadioIsAcceptUk] = useState("true");
  const [radioIsAcceptInt, setRadioIsAcceptInt] = useState("false");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(undefined);

  const [managerUniName, setManagerUniName] = useState("");
  const [managerUniId, setManagerUniId] = useState(0);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [admissionManager, setAdmissionManager] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [managerError, setManagerError] = useState("");
  const userType = localStorage.getItem("userType");
  const [officerData, setOfficerData] = useState({});
  const [progress, setProgress] = useState(false);

  const { providerId, managerId } = useParams();

  // useEffect(() => {

  //   get(`AdmissionOfficerUniversity/Index/${managerId}`)
  //   .then(res => {

  //       setUniList(res);
  //   })

  //   if(userType == userTypes?.AdmissionManager){
  //     get(`AdmissionManagerUniversityDD/AdmissionManager/${managerId}`)
  //     .then(res => {

  //       setProviderUniList(res);
  //     })
  //   }

  //   get(`AdmissionManagerDD/AdmissionOfficer/${managerId}`)
  //   .then(res => {

  //     setAdmissionManager(res);
  //   })

  //   get(`AdmissionOfficer/Get/${managerId}`)
  //   .then(res => {

  //       setOfficerData(res);
  //   })

  // }, [providerId, managerId, success]);

  const { addToast } = useToasts();
  const componentRef = useRef();
  const location = useLocation();

  const backToOfficerDetails = () => {
    if (location.officerList != undefined) {
      history.push(`/providerDetails/${providerId}`);
    } else {
      history.push("/admissionOfficerList");
    }
  };

  const universityMenu = providerUniList.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const admissionmanagerOptions = admissionManager.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectUniversity = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
    setUniError(false);
  };

  const selectAdmissionManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
    setManagerError("");
    get(`AdmissionManagerUniversityDD/systemAdmin/${managerId}/${value}`).then(
      (res) => {
        setProviderUniList(res);
      }
    );
  };

  const backToProviderDetails = () => {
    if (location.managerList != undefined) {
      history.push(`/admissionManagerList`);
    } else {
      history.push(`/providerDetails/${providerId}`);
    }
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUniLabel("Select University");
    setUniValue(0);
    setSelectedId(undefined);
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setManagerError("");
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on change radio button starts here
  const onValueChangeIsAcceptHome = (event) => {
    setRadioIsAcceptHome(event.target.value);
  };

  const onValueChangeIsAcceptUk = (event) => {
    setRadioIsAcceptUk(event.target.value);
  };

  const onValueChangeIsAcceptInt = (event) => {
    setRadioIsAcceptInt(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      admissionOfficerId: managerId,
      universityId: uniValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    const subData1 = {
      id: selectedId,
      admissionOfficerId: managerId,
      universityId: uniValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    if (selectedId !== undefined) {
      setButtonStatus(true);
      setProgress(true);
      put(`AdmissionOfficerUniversity/Update`, subData1).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setModalOpen(false);
          setUniLabel("Select University");
          setUniValue(0);
          setSelectedId(undefined);
          setRadioIsAcceptHome("false");
          setRadioIsAcceptUk("true");
          setRadioIsAcceptInt("false");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      if (userType == userTypes?.AdmissionManager) {
        if (uniValue === 0) {
          setUniError(true);
        } else {
          setButtonStatus(true);
          setSelectedId(undefined);
          setProgress(true);
          post(`AdmissionOfficerUniversity/Create`, subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status == 200 && res?.data?.isSuccess == true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              setModalOpen(false);
              setUniLabel("Select University");
              setUniValue(0);
              setRadioIsAcceptHome("false");
              setRadioIsAcceptUk("true");
              setRadioIsAcceptInt("false");
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      } else {
        if (managerValue === 0) {
          setManagerError("Admission manager is required ");
        } else if (uniValue === 0) {
          setUniError(true);
        } else {
          setButtonStatus(true);
          setSelectedId(undefined);
          setProgress(true);
          post(`AdmissionOfficerUniversity/Create`, subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status == 200 && res?.data?.isSuccess == true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              setModalOpen(false);
              setUniLabel("Select University");
              setUniValue(0);
              setRadioIsAcceptHome("false");
              setRadioIsAcceptUk("true");
              setRadioIsAcceptInt("false");
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    }
  };

  const toggleDanger = (p) => {
    setManagerUniId(p?.id);
    setManagerUniName(p?.university?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (managerUniId) => {
    setButtonStatus1(true);
    setProgress(true);
    const returnValue = remove(
      `AdmissionOfficerUniversity/Delete/${managerUniId}`
    ).then((action) => {
      setProgress(false);
      setButtonStatus1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setManagerUniId(0);
      setManagerUniName("");
    });
  };

  const handleUpdate = (university) => {
    setModalOpen(true);
    setUniLabel(university?.university?.name);
    setUniValue(university?.university?.id);
    setRadioIsAcceptHome(`${university?.isAcceptHome}`);
    setRadioIsAcceptUk(`${university?.isAcceptEU_UK}`);
    setRadioIsAcceptInt(`${university?.isAcceptInternational}`);
    setSelectedId(university?.id);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Assigned University List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToOfficerDetails} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.officerList != undefined
                ? "Back to Provider Details"
                : "Back to Admission Officer List"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <div className="d-flex justify-content-end mb-3">
            <span style={{ fontWeight: "bold" }}>
              Admission Officer: {officerData?.nameTittle?.name}{" "}
              {officerData?.firstName} {officerData?.lastName}
            </span>
          </div>

          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12">
              {permissions?.includes(
                permissionList.Add_New_Admission_Officer_university
              ) ? (
                <ButtonForFunction
                  func={() => setModalOpen(true)}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Assign University"}
                  permission={6}
                />
              ) : null}
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <div className="d-flex justify-content-end">
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
                    <DropdownMenu className="bg-dd-3">
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
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
                          <p className="">University Name</p>
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
                          <p className="">Requirement Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedType(e);
                              }}
                              defaultChecked={checkType}
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

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="md"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">University</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    {selectedId === undefined ? (
                      <>
                        {userType == userTypes?.AdmissionManager ? null : (
                          <>
                            <Col md="5">
                              <span>
                                Admission Manager{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>

                            <Col md="7">
                              <Select
                                options={admissionmanagerOptions}
                                value={{
                                  label: managerLabel,
                                  value: managerValue,
                                }}
                                onChange={(opt) =>
                                  selectAdmissionManager(opt.label, opt.value)
                                }
                              />

                              <span className="text-danger">
                                {managerError}
                              </span>
                            </Col>
                          </>
                        )}
                      </>
                    ) : null}
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    {selectedId === undefined ? (
                      <>
                        <Col md="5">
                          <span>
                            University Name{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>

                        <Col md="7">
                          <Select
                            options={universityMenu}
                            value={{ label: uniLabel, value: uniValue }}
                            onChange={(opt) =>
                              selectUniversity(opt.label, opt.value)
                            }
                            name="universityId"
                            id="universityId"
                          />

                          {uniError && (
                            <span className="text-danger">
                              University is required
                            </span>
                          )}
                        </Col>
                      </>
                    ) : null}
                  </FormGroup>

                  {uniValue > 0 ? (
                    <>
                      <p className="pt-3">
                        <b>Recruitment Type :</b>
                      </p>

                      <FormGroup row>
                        <Col md="5">
                          <span>Is Accept Home </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="true"
                              checked={radioIsAcceptHome == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="false"
                              checked={radioIsAcceptHome == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="5">
                          <span>Is Accept EU/UK </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="true"
                              checked={radioIsAcceptUk == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="false"
                              checked={radioIsAcceptUk == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="5">
                          <span>Is Accept International </span>
                        </Col>

                        <Col md="7">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="true"
                              checked={radioIsAcceptInt == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="false"
                              checked={radioIsAcceptInt == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </>
                  ) : null}

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "space-between" }}
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
                      isDisabled={buttonStatus}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <div></div>
          </div>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>University Name</th> : null}
                    {checkType ? <th>Requirement Type</th> : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {uniList?.map((uni, i) => (
                    <tr key={uni?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{i + 1}</th> : null}

                      {checkName ? <td>{uni?.university?.name}</td> : null}
                      {checkType ? (
                        <td>
                          {uni?.isAcceptHome === true ? `Home,` : null}{" "}
                          {uni?.isAcceptEU_UK === true ? `EU/UK,` : null}{" "}
                          {uni?.isAcceptInternational === true
                            ? "International"
                            : null}
                          {uni?.isAcceptHome === false &&
                          uni?.isAcceptEU_UK === false &&
                          uni?.isAcceptInternational === false
                            ? "Not available"
                            : null}
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <LinkButton
                            url={`/campusDetails/${campus?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}

                            {permissions?.includes(
                              permissionList.Update_Admission_Officer_university_info
                            ) ? (
                              <ButtonForFunction
                                func={() => handleUpdate(uni)}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList?.Delete_Admission_Officer_university
                            ) ? (
                              <ButtonForFunction
                                color={"danger"}
                                func={() => toggleDanger(uni)}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}

                            <Modal
                              isOpen={deleteModal}
                              toggle={() => setDeleteModal(!deleteModal)}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{managerUniName}</b> ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  disabled={buttonStatus1}
                                  color="danger"
                                  onClick={() =>
                                    handleDeletePermission(managerUniId)
                                  }
                                >
                                  {progress ? <ButtonLoader /> : "YES"}
                                </Button>

                                <Button
                                  // color="primary"
                                  onClick={() => {
                                    setDeleteModal(false);
                                    setManagerUniId(0);
                                    setManagerUniName("");
                                  }}
                                >
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </ButtonGroup>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignOfficerUniversity;
