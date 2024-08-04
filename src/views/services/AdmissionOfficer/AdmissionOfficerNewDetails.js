import React, { createRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import uapploader from "../../../assets/img/Uapp_fav.png";
import Select from "react-select";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import { permissionList } from "../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../constants/constants";
import ButtonLoader from "../Components/ButtonLoader";
import Loader from "../Search/Loader/Loader";
import bulb from "../../../assets/img/bulb.png";
import user from "../../../assets/img/Uapp_fav.png";
const AdmissionOfficerNewDetails = () => {
  const [officerObj, setOfficerObj] = useState({});
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [success, setSuccess] = useState(false);
  const [admissionManagerList, setAdmissionManagerList] = useState([]);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const officerId = localStorage.getItem("referenceId");
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   get(`AdmissionOfficer/Profile/${officerId}`).then((res) => {

  //     setOfficerObj(res);
  //     setAdmissionManagerList(res?.admissionManager);

  //     setLoading(false);
  //   });
  // }, [officerId, success]);

  const backToAdmissionofficerList = () => {
    if (location.managerId != undefined && location.providerId != undefined) {
      history.push(
        `/providerAdmissionManager/${location.managerId}/${location.providerId}`
      );
    } else {
      history.push("/admissionOfficerList");
    }
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  const handlRedirectToAdmissionManagerDetails = (manager) => {
    history.push({
      pathname: `/providerAdmissionManager/${manager?.id}/${officerObj?.providerId}`,
      officerId: officerId,
    });
  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

    subData.append("profileImage", FileList1[0]?.originFileObj);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setButtonStatus1(true);
      setProgress(true);
      put(`AdmissionOfficer/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus1(false);
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Admission Officer Details</h3>
              <div className="page-header-back-to-home">
                <span
                  onClick={backToAdmissionofficerList}
                  className="text-white"
                >
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i>{" "}
                  {location.managerId != undefined &&
                  location.providerId != undefined
                    ? "Back to Admission Manager Details"
                    : "Back to Admission Officer List"}
                </span>
              </div>
            </CardHeader>
          </Card>

          <div className="row">
            <div className="col-md-9 col-sm-12">
              {/* <Card className="uapp-employee-profile-right">
                <div className="uapp-profile-CardHeader">
                  <div className="uapp-circle-image margin-top-minus">
                 
                        <div className='profile-pic1'>
                        {
    
                            (officerObj?.admissionOfficerMedia == null) ?
                          <img className="empProfileImg bg-white"  src={uapploader} alt="admissionOfficer"/>
    
                          :
    
                          <img className="empProfileImg"  src={
                            rootUrl + officerObj?.admissionOfficerMedia?.thumbnailUrl
                          } alt="admissionOfficer"/>
                          
                        }
                           {
                            permissions?.includes(permissionList.Change_Admission_Officer_profileImage) ?
                            <div className="edit1"><span  onClick={updateProfilePic}><i className="fas fa-camera" style={{cursor: "pointer"}} > </i ></span></div>
                            :
                            null
                           }
                         </div>
                    </div> 
    
                    
                    {
                            permissions?.includes(permissionList.Change_Admission_Officer_profileImage) ?
                    <Modal isOpen={modalOpen2} toggle={closeModal1} className="uapp-modal">
                           <ModalHeader>Update Profile Photo</ModalHeader>
    
                           <ModalBody>
                             <form onSubmit={handleSubmitProfilePhoto}>
                               <input type="hidden" name="id" id="id" value={officerId} />
    
                              
    
                               <FormGroup row className="has-icon-left position-relative">
                                 <Col className='ml-5' md="4">
                                   <span>
                                     Profile Photo <span className="text-danger">*</span>{" "}
                                   </span>
                                 </Col>
                                 <Col md="6">
                                   <div className="row d-flex">
                                    
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
                          
    
                                         <span className="text-danger d-block">{text1}</span>
    
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
                                     <Button color='danger' onClick={closeModal1} className='mr-1 mt-3'>
                                           Cancel
                                     </Button>
                                     <Button type="submit" className="ml-1 mt-3" color="primary" disabled={buttonStatus1}>
                                     {progress ? <ButtonLoader/> : '  Update'}
                                     </Button>
                                   </div>
                                 </Col>
                               </FormGroup>
                             </form>
                           </ModalBody>
                         </Modal>
                                        :
                                        null
                   }
                      
    
    
                  <div className="py-3">
                    <h5 className="py-1">
                      Name:{" "}
                      <span className="text-primary">
                        {officerObj?.nameTittleName} {officerObj?.firstName}{" "}
                        {officerObj?.lastName}
                      </span>{" "}
                    </h5>
                    <h5 className="py-1">
                      Provider:{" "}
                      <span className="text-primary">
                        {officerObj?.providerName}
                      </span>{" "}
                    </h5>
                    <h5 className="py-1">
                      {" "}
                      Email:{" "}
                      <span className="text-primary">{officerObj?.email}</span>{" "}
                    </h5>
                    <h5 className="py-1">
                      {" "}
                      Phone Number:{" "}
                      <span className="text-primary">
                        {officerObj?.phoneNumber}
                      </span>{" "}
                    </h5>
                  </div>
                </div>
                <CardBody>
                  <div>
                    <ul className="uapp-ul text-center">
                      <h5>
                        {" "}
                        State:{" "}
                        <span className="text-primary">
                          {officerObj?.stateName}
                        </span>{" "}
                      </h5>
                      <h5>
                        {" "}
                        City:{" "}
                        <span className="text-primary">
                          {officerObj?.city}
                        </span>{" "}
                      </h5>
                    </ul>
                  </div>
                </CardBody>
              </Card> */}

              {permissions?.includes(
                permissionList.Change_Admission_Officer_profileImage
              ) ? (
                <Modal
                  isOpen={modalOpen2}
                  toggle={closeModal1}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Profile Photo</ModalHeader>

                  <ModalBody>
                    <form onSubmit={handleSubmitProfilePhoto}>
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={officerId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col className="ml-5" md="4">
                          <span>
                            Profile Photo <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <div className="row d-flex">
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

              <Card>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 left-adm-div">
                      <div className="adm-user-img">
                        {officerObj?.admissionOfficerMedia?.thumbnailUrl ==
                        null ? (
                          <img src={user} alt="admission_manager_media" />
                        ) : (
                          <img
                            src={
                              rootUrl +
                              officerObj?.admissionOfficerMedia?.thumbnailUrl
                            }
                            alt="admission_manager_media"
                          />
                        )}

                        {permissions?.includes(
                          permissionList.Change_Admission_Officer_profileImage
                        ) ? (
                          <span
                            className="edit1-adm"
                            onClick={updateProfilePic}
                          >
                            <i
                              className="fas fa-camera"
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                            </i>
                          </span>
                        ) : null}
                      </div>

                      <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                        <p className="adm-user-title">
                          {officerObj?.nameTittleName} {officerObj?.firstName}{" "}
                          {} {officerObj?.lastName}{" "}
                        </p>

                        <p>
                          <span className="adm-provider-css">Provider: </span>
                          <span
                            className="adm-provider-css-name"
                            onClick={() => {
                              history.push(
                                `/providerDetails/${officerObj?.providerId}`
                              );
                            }}
                          >
                            {officerObj?.providerName}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-12 right-adm-div">
                      <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                        <div className="mb-1">
                          <span className="adm-provider-css-name2">
                            {officerObj?.email}
                          </span>
                        </div>

                        <div className="mb-1">
                          <span className="adm-provider-css-name2">
                            {officerObj?.phoneNumber}
                          </span>
                        </div>

                        <div className="mb-1">
                          <span className="adm-provider-css">
                            {officerObj?.stateName}
                          </span>
                        </div>
                      </div>

                      <div className="adm-user-img2">
                        <img src={bulb} alt="admission_manager_media" />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-3 col-sm-12"></div>
          </div>

          <div className=" info-item mt-4">
            <div className="row">
              <div className="col-md-9 col-sm-12">
                <Card style={{ height: "300px" }}>
                  <CardBody>
                    <div className="hedding-titel d-flex justify-content-between">
                      <div>
                        <h5>
                          {" "}
                          <b>Assigned Universities</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>

                    <div className="table-responsive pt-3">
                      <Table className="table-sm striped" style={tableStyle}>
                        <thead className="">
                          <tr style={{ textAlign: "center" }}>
                            <th>#</th>
                            <th>Accept EU_UK</th>
                            <th>Accept Home</th>
                            <th>Accept International</th>
                            <th>Name</th>
                            <th>Short Name</th>
                            <th>City</th>
                            {/* <th>Description</th> */}
                            <th>Founded</th>
                            <th>Global Ranking</th>
                            <th>Part Time Work Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          {officerObj?.admissionOfficerUniversities?.map(
                            (uni, i) => (
                              <tr key={i} style={{ textAlign: "center" }}>
                                <th scope="row">{1 + i}</th>
                                <td>
                                  {uni?.isAcceptEU_UK ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>
                                  {uni?.isAcceptHome ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>
                                  {uni?.isAcceptInternational ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>{uni?.university?.name}</td>

                                <td>{uni?.university?.shortName}</td>

                                <td>{uni?.university?.universityCity}</td>

                                {/* <td>{uni?.university?.description}</td> */}

                                <td>{uni?.university?.foundationYear}</td>

                                <td>{uni?.university?.globalRankNumber}</td>
                                <td>
                                  {uni?.university?.partTimeWorkInformation}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="col-md-3 col-sm-12">
                <Card className="container">
                  <div className="hedding-titel d-flex justify-content-between ms-1 pt-3">
                    <div>
                      <h5>
                        {" "}
                        <b>Admission Managers</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>

                    {/* <div className="text-right edit-style  p-3" >
                            <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                            </div> */}
                  </div>
                  <div style={{ height: "230px", overflowY: "scroll" }}>
                    {admissionManagerList?.map((manager, i) => (
                      <div key={i} className="rounded mt-3">
                        {/* <td>
                      {manager?.nameTittleName} {manager?.firstName}{" "}
                      {manager?.lastName}
                    </td>
    
                    <td>{manager?.email}</td>
    
                    <td>{manager?.university?.universityCity}</td> */}
                        <div className="d-flex justify-content-between mt-4">
                          <div>
                            {permissions?.includes(
                              permissionList.View_Admission_manager_info
                            ) ? (
                              <div className="cursor-pointer hyperlink-hover">
                                <span
                                  onClick={() =>
                                    handlRedirectToAdmissionManagerDetails(
                                      manager
                                    )
                                  }
                                >
                                  {manager?.nameTittleName} {manager?.firstName}{" "}
                                  {manager?.lastName}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span>
                                  {manager?.nameTittleName} {manager?.firstName}{" "}
                                  {manager?.lastName}
                                </span>
                              </div>
                            )}

                            <span>{manager?.email}</span>
                          </div>

                          {/* <div>
                      {
                        permissions?.includes(permissionList.View_Admission_manager_info)? 
                        <ButtonForFunction
                          func={() =>
                            handlRedirectToAdmissionManagerDetails(manager)
                          }
                          color={"primary"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-eye"></i>}
                          permission={6}
                        />
                        :
                        null
                      }
                      </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className=" info-item mt-4">
            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between">
                  <div>
                    <h5>
                      {" "}
                      <b>Assigned Subjects</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                </div>

                <div className="table-responsive pt-3">
                  <Table className="table-sm striped" style={tableStyle}>
                    <thead className="">
                      <tr style={{ textAlign: "center" }}>
                        <th>#</th>
                        <th>Subject</th>
                        <th>University</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officerObj?.assignedSubjects?.map((sub, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <th scope="row">{1 + i}</th>
                          <td>{sub?.subjectName}</td>

                          <td>
                            {sub?.universityShortName} -{" "}
                            {sub?.universityFullName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionOfficerNewDetails;
