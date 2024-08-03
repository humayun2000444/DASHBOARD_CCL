import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "../../services/Pagination/Pagination.jsx";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { rootUrl } from "../../../constants/constants";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove.js";
import { useToasts } from "react-toast-notifications";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import LinkButton from "../Components/LinkButton.js";
import Form from "../../core/country/pages/form.js";
import Select from "react-select";
import uapploader from "../../../assets/img/Uapp_fav.png";
import put from "../../../helpers/put.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import LinkSpanButton from "../Components/LinkSpanButton.js";
import ToggleSwitch from "../Components/ToggleSwitch.js";
import ButtonLoader from "../Components/ButtonLoader.js";

const ProviderDetails = () => {
  const { id } = useParams();
  // localStorage.setItem("providerId", id);
  const [providerInfo, setProviderInfo] = useState({});
  const [universityList, setUniversityList] = useState([]);
  const [providerId, setProviderId] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [deleteData, setDeleteData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stateList, setstateList] = useState([0]);

  const [providerList, setProviderList] = useState([]);
  const [proId, setProId] = useState();

  const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type...");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select University Country..."
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState(
    "Select University State..."
  );
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Select Provider...");
  const [providerValue, setProviderValue] = useState(0);
  const [admissionManager, setAdmissionManager] = useState([]);
  const [adminData, setAdminData] = useState({});

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState(0);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);

  const [text, setText] = useState("");

  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [delData2, setDelData2] = useState(false);

  const [officer, setOfficer] = useState({});

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // useEffect(() => {
  //   const uCountryId = 0;
  //   const uStateId = 0;
  //   const uTypeId = 0;

  //   get(`Provider/Get/${id}`).then((res) => {
  //     setProviderInfo(res);
  //     setProId(res?.providertype?.id);
  //   });
  //   get(
  //     `University/IndexForProvider?page=${currentPage}&pagesize=${dataPerPage}&providerId=${id}`
  //   ).then((action) => {

  //     setUniversityList(action?.models);
  //     setLoading(false);
  //     setEntity(action?.totalEntity);
  //     setSerialNum(action?.firstSerialNumber);
  //   });

  //   get(`AdmissionManager/GetbyProvider/${id}`).then((res) => {

  //     setAdmissionManager(res);
  //   });

  //   get(`ProviderAdmin/GetbyProvider/${id}`).then((res) => {

  //     setAdminData(res);
  //     setTitleLabel(res?.nameTittle?.name);
  //     setTitleValue(res?.nameTittle?.id);
  //   });

  //   get("NameTittle/GetAll").then((res) => {
  //     setTitle(res);
  //   });

  //   // get(`AdmissionOfficer/GetByProvider/${id}`)
  //   // .then(res => {

  //   //   setOfficer(res);
  //   // })

  //   get(`AdmissionOfficer/OfficerForProvider/${id}`).then((res) => {

  //     setOfficer(res);
  //   });
  // }, [
  //   currentPage,
  //   dataPerPage,
  //   searchStr,
  //   uniCountryValue,
  //   uniTypeValue,
  //   unistateValue,
  //   id,
  //   success,
  // ]);

  const history = useHistory();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    // setFileList(fileList);

    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setText("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setText("");
    }
  };

  const backToDashboard = () => {
    history.push("/providerList");
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setManagerId(0);
    setManagerName("");
    setDeleteData({});
  };

  const toggleDelete = (manager) => {
    setManagerId(manager?.id);
    setManagerName(manager?.firstName);
    setDeleteData(manager);
    setDeleteModal(true);
  };
  const closeDeleteModal2 = () => {
    setDeleteModal2(false);

    setDeleteData({});
  };

  const handleUpdateStatus = (data) => {
    put(`University/UpdateStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const toggleDelete2 = (data) => {
    setDelData2(data);
    setDeleteModal2(true);
  };

  const handleDelete = () => {
    setProgress2(true);
    remove(`AdmissionManager/Delete/${deleteData?.id}`).then((res) => {
      setProgress2(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setDeleteModal(false);
      setManagerId(0);
      setManagerName("");
      setSuccess(!success);
    });
  };

  const handleDelete2 = () => {
    setButtonStatus(true);
    setProgress3(true);
    remove(`AdmissionOfficer/Delete/${delData2?.id}`).then((res) => {
      setProgress3(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelData2({});
      setDeleteModal2(false);

      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));

  // select  Title
  const selectTitle = (label, value) => {
    setTitleError(false);
    setTitleLabel(label);
    setTitleValue(value);
  };

  const updateAdmissionManager = (ids, id) => {
    history.push(`/updateAdmissionManager/${ids}/${id}`);
  };

  const updateAdmissionOfficer = (data) => {
    history.push(`/updateAdmissionOfficer/${data?.id}/${id}`);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const updateProviderAdmin = () => {
    setModalOpen(true);
  };

  const viewProviderAdminInfo = () => {
    history.push(`/providerAdminProfile/${adminData?.id}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress1(true);
    const subData = new FormData(event.target);

    subData.append("providerAdmin", FileList[0]?.originFileObj);

    setButtonStatus(true);

    put(`ProviderAdmin/Update`, subData).then((res) => {
      setButtonStatus(false);
      setProgress1(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFileList([]);
        setModalOpen(false);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handleAddUniversity = (e) => {
    e.preventDefault();
    // localStorage.removeItem("proProfileId");
    // localStorage.removeItem("id");
    // localStorage.setItem("proProfileId", id);
    history.push({
      pathname: `/addProviderUniversity/${id}`,
      providerProfileId: id,
    });
  };

  const redirectToAssignPage = (managerId) => {
    history.push(`/assignUniversity/${id}/${managerId}`);
  };
  const redirectToAssignSubjectPage = (officer) => {
    history.push({
      pathname: `/admissionOfficerAssignedSubjects/${officer?.id}`,
      officerList: id,
    });
  };

  const redirectToProviderAdmissionManager = (managerId, id) => {
    history.push(`/providerAdmissionManager/${managerId}/${id}`);
  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    // setFileList(fileList);

    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setText1("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList1(fileList);
      setText1("");
      setError1(false);
      setButtonStatus1(false);
    }
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("providerLogo", FileList1[0]?.originFileObj);

    setButtonStatus1(true);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      put(`Provider/UpdateLogo`, subData).then((res) => {
        setButtonStatus1(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList1([]);
          setModalOpen2(false);
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

  const handleRedirectToAddProviderAdmin = () => {
    history.push({
      pathname: `/adminProviderForm/${id}`,
      providerId: id,
    });
  };

  const redirectToUniAssignPage = (providerId, officerId) => {
    history.push({
      pathname: `/assignOfficerUniversity/${providerId}/${officerId}`,
      officerList: "officerList",
    });
  };

  const redirectToSub = (data) => {
    history.push({
      pathname: `/admissionManagerAssignedSubjects/${data}`,
      proviiderId: id,
    });
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Update Provider Admin</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="providerId" id="providerId" value={id} />

            <input type="hidden" name="id" id="id" value={adminData?.id} />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  Title
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitle}
                  value={{ label: titleLabel, value: titleValue }}
                  onChange={(opt) => selectTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  First Name
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={adminData?.firstName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  Last Name
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={adminData?.lastName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  Phone Number
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={adminData?.phoneNumber}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Profile Photo <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row d-flex">
                  {adminData?.providerAdminMedia !== null ? (
                    <div className="col-md-6">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl + adminData?.providerAdminMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-6">
                    <>
                      <Upload
                        listType="picture-card"
                        multiple={false}
                        fileList={FileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        {FileList.length < 1 ? (
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Image Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>

                      <span className="text-danger d-block">{text}</span>
                    </>
                  </div>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="9">
                <div className="d-flex justify-content-end">
                  <Button
                    color="danger"
                    onClick={() => setModalOpen(false)}
                    className="mr-1 mt-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ml-1 mt-3"
                    color="primary"
                    disabled={buttonStatus}
                  >
                    {progress1 ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>

      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider List
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="uapp-employee-profile">
        <Row>
          <Col md="8">
            <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                  <div className="profile-pic1">
                    {providerInfo?.providerLogoMedia == null ? (
                      <img
                        className="empProfileImg"
                        src={uapploader}
                        alt="provider_profile"
                      />
                    ) : (
                      <img
                        className="empProfileImg"
                        src={
                          rootUrl +
                          providerInfo?.providerLogoMedia?.thumbnailUrl
                        }
                        alt="provider_profile"
                      />
                    )}
                    {permissions?.includes(
                      permissionList.Change_Provider_LogoImage
                    ) ? (
                      <div className="edit1">
                        <span onClick={updateProfilePic}>
                          <i
                            className="fas fa-camera"
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                          </i>
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* profile photo edit modal starts here */}
                {permissions?.includes(
                  permissionList.Change_Provider_LogoImage
                ) ? (
                  <Modal
                    isOpen={modalOpen2}
                    toggle={closeModal1}
                    className="uapp-modal"
                  >
                    <ModalHeader>Update Profile Photo</ModalHeader>

                    <ModalBody>
                      <form onSubmit={handleSubmitProfilePhoto}>
                        <input type="hidden" name="id" id="id" value={id} />

                        {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col className="ml-5" md="4">
                            <span>
                              Profile Photo{" "}
                              <span className="text-danger">*</span>{" "}
                            </span>
                          </Col>
                          <Col md="6">
                            <div className="row d-flex">
                              {/* {consultantData?.consultantCoverImageMedia !== null ? (
                                   <div className="col-md-6">
                                     <Image
                                       width={104}
                                       height={104}
                                       src={
                                         rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                                       }
                                     />
                                   </div>
                                 ) : null} */}

                              <div className="col-md-6">
                                <>
                                  <Upload
                                    listType="picture-card"
                                    multiple={false}
                                    fileList={FileList1}
                                    onPreview={handlePreview1}
                                    onChange={handleChange1}
                                    beforeUpload={(file) => {
                                      return false;
                                    }}
                                  >
                                    {FileList1.length < 1 ? (
                                      <div
                                        className="text-danger"
                                        style={{ marginTop: 8 }}
                                      >
                                        <Icon.Upload />
                                        <br />
                                        <span>Upload Image Here</span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Upload>
                                  <Modal
                                    visible={previewVisible1}
                                    title={previewTitle1}
                                    footer={null}
                                    onCancel={handleCancel1}
                                  >
                                    <img
                                      alt="example"
                                      style={{ width: "100%" }}
                                      src={previewImage1}
                                    />
                                  </Modal>

                                  <span className="text-danger d-block">
                                    {text1}
                                  </span>

                                  {error1 && (
                                    <span className="text-danger">
                                      Profile photo is required
                                    </span>
                                  )}
                                </>
                              </div>
                            </div>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col md="12">
                            <div className="d-flex justify-content-end">
                              <Button
                                color="danger"
                                onClick={closeModal1}
                                className="mr-1 mt-3"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                className="ml-1 mt-3"
                                color="primary"
                                disabled={buttonStatus1}
                              >
                                {progress ? <ButtonLoader /> : "Update"}
                              </Button>
                            </div>
                          </Col>
                        </FormGroup>
                      </form>
                    </ModalBody>
                  </Modal>
                ) : null}
                {/* profile photo edit modal ends here */}

                <h5> {providerInfo?.name}</h5>
                <p> {providerInfo?.providerType?.name} </p>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    <li> {providerInfo?.email} </li>
                    <li> {providerInfo?.phoneNumber} </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="4">
            {adminData ? (
              <Card className="uapp-employee-profile-right">
                <div className="uapp-profile-CardHeader">
                  <div className="uapp-circle-image margin-top-minus">
                    {adminData?.providerAdminMedia == null ? (
                      <img src={uapploader} alt="provider_profile" />
                    ) : (
                      <img
                        src={
                          rootUrl + adminData?.providerAdminMedia?.thumbnailUrl
                        }
                        alt="provider_profile"
                      />
                    )}
                  </div>

                  <h5 className="">
                    {adminData?.nameTittle?.name} {adminData?.firstName}{" "}
                    {adminData?.lastName}
                  </h5>
                  <p> Provider Admin </p>
                </div>
                <CardBody>
                  <div className="d-flex justify-content-center">
                    <ul className="uapp-ul text-center ms-4">
                      <li> {adminData?.email} </li>
                      <li> {adminData?.phoneNumber} </li>
                    </ul>

                    <div style={{ position: "relative", left: "45px" }}>
                      <ButtonGroup>
                        {permissions?.includes(
                          permissionList?.View_Provider_Admin_info
                        ) ? (
                          <LinkButton
                            // name={"Edit"}
                            func={viewProviderAdminInfo}
                            color={"primary"}
                            icon={
                              <i
                                style={{ paddingBottom: "4px" }}
                                className="fas fa-eye"
                              ></i>
                            }
                            className={"btn-sm mr-1"}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList?.Update_Provider_Admin_info
                        ) ? (
                          <LinkButton
                            // name={"Edit"}
                            func={updateProviderAdmin}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                            className={"btn-sm ml-1"}
                          />
                        ) : null}
                      </ButtonGroup>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card style={{ marginTop: "40px" }}>
                {permissions?.includes(
                  permissionList.Add_New_Provider_Admin
                ) ? (
                  <div className="container py-3">
                    {/* <Link to={`/adminProviderForm/${id}`}> */}

                    <center>
                      <Button
                        onClick={handleRedirectToAddProviderAdmin}
                        className="btn btn-uapp-add "
                        // onClick={localStorage.removeItem('branchManagerId')}
                      >
                        {" "}
                        <i className="fas fa-plus"></i> Add Provider Admin{" "}
                      </Button>
                    </center>
                    {/* </Link> */}
                  </div>
                ) : null}
              </Card>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col lg="5" md="5" sm="12" xs="12">
                    <div className="ms-3 mb-4 hedding-titel">
                      <h5>
                        {" "}
                        <b>University List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {permissions?.includes(
                      permissionList.Add_New_University
                    ) ? (
                      <ButtonForFunction
                        func={handleAddUniversity}
                        className={" btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={" Add University"}
                        permission={6}
                      />
                    ) : null}
                  </Col>

                  <Col lg="7" md="7" sm="12" xs="12"></Col>
                </Row>

                {universityList.length < 1 ? (
                  <h5 className="text-center mt-3 mb-4">
                    University Not Found.
                  </h5>
                ) : (
                  <div className="table-responsive  mt-3">
                    <Table className="table-sm table-bordered">
                      <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                          <th>Logo</th>
                          <th>Name</th>
                          <th>Total Applications</th>
                          <th>Total Registered</th>
                          <th>Total Subjects</th>
                          {permissions?.includes(
                            permissionList?.Change_Status_University
                          ) ? (
                            <th>Status</th>
                          ) : null}

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {universityList?.map((university, i) => (
                          <tr
                            key={university?.id}
                            style={{ textAlign: "center" }}
                          >
                            <td>
                              {university?.universityLogo == null ? (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image"
                                    src={uapploader}
                                    alt="logo"
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image"
                                    src={`${
                                      rootUrl +
                                      university?.universityLogo?.thumbnailUrl
                                    }`}
                                    alt="logo"
                                  />{" "}
                                </>
                              )}
                            </td>
                            <td>
                              {university?.universityName} (
                              {university?.universityShortName})
                            </td>

                            <td>
                              <span
                                className="badge badge-secondary"
                                // style={{ cursor: "pointer" }}
                              >
                                {university?.totalApplication}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge badge-secondary"
                                // style={{ cursor: "pointer" }}
                              >
                                {university?.totalRegistered}
                              </span>
                            </td>

                            <td>
                              <span
                                className="badge badge-secondary"
                                // style={{ cursor: "pointer" }}
                              >
                                {university?.totalSubjects}
                              </span>
                            </td>

                            {permissions?.includes(
                              permissionList?.Change_Status_University
                            ) ? (
                              <td>
                                <ToggleSwitch
                                  defaultChecked={university?.isActive}
                                  onChange={() =>
                                    handleUpdateStatus(university)
                                  }
                                />
                              </td>
                            ) : null}
                            <td>
                              {permissions?.includes(
                                permissionList.View_University_info
                              ) ? (
                                <Button
                                  color="primary"
                                  className="btn-sm"
                                  onClick={() => {
                                    history.push({
                                      pathname: `/universityDetails/${university?.id}`,
                                      providerId: id,
                                    });
                                  }}
                                >
                                  <i className="fas fa-eye"></i>
                                </Button>
                              ) : null}
                            </td>
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

            <Card className="p-3">
              <div className="ms-3 mb-4 hedding-titel">
                <h5>
                  {" "}
                  <b>Admission Manager</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>

              {permissions?.includes(
                permissionList?.Add_New_Admission_manager
              ) ? (
                <Link to={`/addAdmissionManager/${id}`}>
                  <Button className="btn btn-uapp-add mt-2">
                    {" "}
                    <i className="fas fa-plus"></i> Add Admission Manager{" "}
                  </Button>
                </Link>
              ) : null}

              {admissionManager.length < 1 && (
                <h5 className="text-center mt-3 mb-4">
                  Admission Manager Not Found.
                </h5>
              )}
              {admissionManager.length > 0 && (
                <div className="table-responsive  mt-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>UAPP ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        {permissions?.includes(
                          permissionList.View_Admission_manager_university_List
                        ) ? (
                          <th>Assigned University</th>
                        ) : null}
                        {permissions?.includes(
                          permissionList?.View_Admissionmanager_Subject_list
                        ) ? (
                          <th>Assigned Subject</th>
                        ) : null}
                        <th>Applications</th>
                        <th>Registered Applications</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissionManager?.map((manager, i) => (
                        <tr key={manager.id} style={{ textAlign: "center" }}>
                          <td>{manager?.sequenceId}</td>
                          <td>
                            <span className="me-1">{manager?.firstName} </span>
                            {manager?.lastName}
                          </td>
                          <td>{manager?.email}</td>
                          <td>{manager?.phoneNumber}</td>
                          <td>
                            {" "}
                            <span
                              className="badge badge-secondary"
                              style={{ cursor: "pointer" }}
                            >
                              {/* <Link className="text-decoration-none" to = {`campusSubjectList/${campus?.id}`}> 
                                 <span> View </span>
                                 </Link> */}

                              {/* <LinkSpanButton
                                url={`assignUniversity/${id}/${manager?.id}`}
                                className={"text-decoration-none"}
                                data={"View"}
                                permission={6}
                              /> */}
                              {permissions?.includes(
                                permissionList.View_Admission_manager_university_List
                              ) ? (
                                <span
                                  onClick={() =>
                                    redirectToAssignPage(manager?.id)
                                  }
                                  className="text-decoration-none"
                                >
                                  View
                                </span>
                              ) : null}
                            </span>{" "}
                          </td>

                          {permissions?.includes(
                            permissionList?.View_Admissionmanager_Subject_list
                          ) ? (
                            <td>
                              {" "}
                              <span
                                className="badge badge-secondary"
                                style={{ cursor: "pointer" }}
                              >
                                <span
                                  onClick={() => redirectToSub(manager?.id)}
                                  className="text-decoration-none"
                                >
                                  View
                                </span>
                              </span>{" "}
                            </td>
                          ) : null}

                          <td>
                            <span
                              className="badge badge-secondary"
                              // style={{ cursor: "pointer" }}
                            >
                              {manager?.totalApplication}
                            </span>
                          </td>
                          <td>
                            <span
                              className="badge badge-secondary"
                              // style={{ cursor: "pointer" }}
                            >
                              {manager?.registeredApplication}
                            </span>
                          </td>
                          <td>
                            <ButtonGroup>
                              {/* <Link to={`/providerAdmissionManager/${manager?.id}/${id}`}>
                           <Button color="primary" className="btn-sm me-1">
                       
                          <i className="fas fa-eye"></i>
                         
                           </Button>
                           </Link> */}

                              {permissions?.includes(
                                permissionList?.Update_Admission_manager_info
                              ) ? (
                                // <Button color="warning">
                                // <i
                                //   className="fas fa-edit"
                                //   onClick={() =>
                                //     updateAdmissionManager(manager?.id, id)
                                //   }
                                // ></i>
                                // </Button>

                                <ButtonForFunction
                                  func={() =>
                                    updateAdmissionManager(manager?.id, id)
                                  }
                                  className={"mx-1 btn-sm"}
                                  color={"warning"}
                                  icon={<i className="fas fa-edit"></i>}
                                />
                              ) : null}

                              {permissions?.includes(
                                permissionList?.Delete_Admission_manager
                              ) ? (
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i
                                    className="fas fa-trash-alt"
                                    onClick={() => toggleDelete(manager)}
                                  ></i>
                                </Button>
                              ) : null}
                            </ButtonGroup>

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{managerName}</b> ? Once Deleted it can't
                                  be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button color="danger" onClick={handleDelete}>
                                  {progress2 ? <ButtonLoader /> : "YES"}
                                </Button>
                                <Button
                                  color="secondary"
                                  onClick={closeDeleteModal}
                                >
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
              )}
            </Card>

            <Card className="p-3">
              <div className="ms-3 mb-4 hedding-titel">
                <h5>
                  {" "}
                  <b>Admission Officer</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>

              {permissions?.includes(
                permissionList?.Add_New_Admissionofficer
              ) ? (
                <Link to={`/addAdmissionOfficer/${id}`}>
                  <Button className="btn btn-uapp-add mt-2">
                    {" "}
                    <i class="fas fa-plus"></i> Add Admission Officer{" "}
                  </Button>
                </Link>
              ) : null}

              {officer.length < 1 && (
                <h5 className="text-center mt-3 mb-4">
                  Admission Officer Not Found.
                </h5>
              )}
              {officer.length > 0 && (
                <div className="table-responsive  mt-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>UAPP ID</th>
                        <th>Name</th>

                        <th>Email</th>
                        <th>Phone Number</th>
                        {permissions?.includes(
                          permissionList.View_Admission_Officer_university_List
                        ) ? (
                          <th>Assigned University</th>
                        ) : null}
                        {permissions?.includes(
                          permissionList?.View_Admissionofficer_Subject_list
                        ) ? (
                          <th>Assigned Subject</th>
                        ) : null}
                        <th>Applications</th>
                        <th>Registered Applications</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officer?.map((off, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>{off?.viewId}</td>
                          <td>
                            <span className="me-1">{off?.firstName} </span>
                            {off?.lastName}
                          </td>
                          <td>{off?.email}</td>
                          <td>{off?.phoneNumber}</td>
                          {permissions?.includes(
                            permissionList.View_Admission_Officer_university_List
                          ) ? (
                            <td>
                              {" "}
                              <span
                                className="badge badge-secondary"
                                style={{ cursor: "pointer" }}
                              >
                                <span
                                  onClick={() =>
                                    redirectToUniAssignPage(id, off?.id)
                                  }
                                  className="text-decoration-none"
                                >
                                  View
                                </span>
                              </span>{" "}
                            </td>
                          ) : null}
                          {permissions?.includes(
                            permissionList?.View_Admissionofficer_Subject_list
                          ) ? (
                            <td>
                              {" "}
                              <span
                                onClick={() => redirectToAssignSubjectPage(off)}
                                className="badge badge-secondary"
                                style={{ cursor: "pointer" }}
                              >
                                View
                              </span>
                            </td>
                          ) : null}
                          <td>
                            <span
                              className="badge badge-secondary"
                              // style={{ cursor: "pointer" }}
                            >
                              {off?.applications}
                            </span>
                          </td>
                          <td>
                            <span
                              className="badge badge-secondary"
                              // style={{ cursor: "pointer" }}
                            >
                              {off?.registeredApplications}
                            </span>
                          </td>

                          <td>
                            <ButtonGroup>
                              {permissions?.includes(
                                permissionList?.Update_Admissionofficer_info
                              ) ? (
                                <ButtonForFunction
                                  func={() => updateAdmissionOfficer(off)}
                                  className={"mx-1 btn-sm"}
                                  color={"warning"}
                                  icon={<i className="fas fa-edit"></i>}
                                />
                              ) : null}

                              {permissions?.includes(
                                permissionList?.Delete_Admissionofficer
                              ) ? (
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i
                                    className="fas fa-trash-alt"
                                    onClick={() => toggleDelete2(off)}
                                  ></i>
                                </Button>
                              ) : null}
                            </ButtonGroup>

                            <Modal
                              isOpen={deleteModal2}
                              toggle={closeDeleteModal2}
                              className="uapp-modal2"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>
                                    {delData2?.firstName} {delData2?.lastName}
                                  </b>{" "}
                                  ? Once Deleted it can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={handleDelete2}
                                  disabled={buttonStatus}
                                >
                                  {progress3 ? <ButtonLoader /> : "YES"}
                                </Button>
                                <Button
                                  color="secondary"
                                  onClick={closeDeleteModal2}
                                >
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
              )}
            </Card>
          </Col>

          {/* <Col md="4">
            

            <Card className="p-3">
              {/* <h6> Notice</h6>
              <span className="bg-wg bg-width"></span> */}

          {/* <div className="ms-3 mb-1 hedding-titel">
                <h5> <b>Notice</b> </h5>
                 
                <div className="bg-h"></div>
                </div>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="#">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="#">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div> */}

          {/* <Card className="p-3">

<h6> Notice</h6>
<span className="bg-wg bg-width"></span>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="#"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="#"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>



  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
          
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="#"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
          <div className="uapp-read-more-btn">
            <a className="" href="#"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
         
      </div>
  </div>

  

</Card> */}

          {/* <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="#">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="#">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default ProviderDetails;
