import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import Select from "react-select";
import StudentProfileImage from "./StudentProfileImage";
import * as Icon from "react-feather";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import { Upload, Modal as AntdModal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { Image } from "antd";
import ButtonForFunction from "../Components/ButtonForFunction";
import post from "../../../helpers/post";
import { rootUrl } from "../../../constants/constants";
import remove from "../../../helpers/remove";
import ButtonLoader from "../Components/ButtonLoader";
import { userTypes } from "../../../constants/userTypeConstant";
import put from "../../../helpers/put";
import { permissionList } from "../../../constants/AuthorizationConstant";

const DocumentUpload = () => {
  const { applicationStudentId } = useParams();

  const history = useHistory();
  const { addToast } = useToasts();

  const [activetab, setActivetab] = useState("10");
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [docuType, setDocuType] = useState([]);
  const [docLevel, setDocLevel] = useState("");
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document Type");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [studentDocuId, setStudentDocuId] = useState(0);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [delDocId, setDelDocId] = useState(0);
  const [delDocNam, setDelDocNam] = useState("");

  const [delFileId, setDelFileId] = useState(0);
  const [delFileName, setDelFileName] = useState("");

  const [delDocData, setdelDocData] = useState({});

  const [isSelected, setIsSelected] = useState(false);

  const [FileList2, setFileList2] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);

  const [docuLabel, setDocuLabel] = useState("Select Status");
  const [docuValue, setDocuValue] = useState(0);
  const [docuDD, setDocuDD] = useState([]);
  const [openStatusModal11, setOpenStatusModal11] = useState(false);
  const [studentDocumentId, setStudentDocumentId] = useState(0);
  const [progress13, setProgress13] = useState(false);

  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const previousPage = () => {
    history.push(`/addOtherInformation/${applicationStudentId}/${1}`);
  };

  const nextPage = () => {
    history.push(`/studentDeclaration/${applicationStudentId}`);
  };

  const backToStudentProfile = () => {
    history.push(`/studentProfile/${applicationStudentId}`);
  };

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
  };

  const handleChange2 = ({ fileList }) => {
    // setUploadError(false);
    setFileList2(fileList);
  };

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // useEffect(() => {
  //   get(`StudentUploadDocument/Index/${applicationStudentId}`).then((res) => {
  //     setUploadedDocuData(res);
  //   });

  //   get(`DocumentStatusDD/index`).then((res) => {
  //     setDocuDD(res);
  //   });

  //   get("DocumentDD/Index").then((res) => {
  //     setDocuType(res);
  //   });
  // }, [success, applicationStudentId]);

  const docuTypeDD = docuType.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  const selectDocumentType = (label, value) => {
    setDocuTypeLabel(label);
    setDocuTypeValue(value);
    setDocuTypeError(false);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(
        `/addStudentApplicationInformation/${applicationStudentId}/${1}`
      );
    }

    if (tab == "2") {
      history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "3") {
      history.push(
        `/addStudentContactInformation/${applicationStudentId}/${1}`
      );
    }

    if (tab == "4") {
      history.push(
        `/addStudentEducationalInformation/${applicationStudentId}/${1}`
      );
    }

    if (tab == "5") {
      history.push(`/addTestScore/${applicationStudentId}/${1}`);
    }

    if (tab == "6") {
      history.push(`/addExperience/${applicationStudentId}/${1}`);
    }

    if (tab == "7") {
      history.push(`/addReference/${applicationStudentId}/${1}`);
    }

    if (tab == "8") {
      history.push(`/addPersonalStatement/${applicationStudentId}/${1}`);
    }
    if (tab == "9") {
      history.push(`/addOtherInformation/${applicationStudentId}/${1}`);
    }
    if (tab == "11") {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append(
      "studentDocument",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );

    for (var i of subData) {
    }

    if (docuTypeValue == 0) {
      setDocuTypeError(true);
    }
    // if (FileList1.length < 1) {
    //   setUploadError(true);
    // }
    else {
      setButtonStatus(true);
      setProgress(true);
      post("StudentUploadDocument/Create", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          // history.push('/addUniversityRequiredDocument');
          setSuccess(!success);
          setFileList1([]);
          setDocLevel("");
          setDocuTypeLabel("Select Document Type");
          setDocuTypeValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const toggleDanger = (docu) => {
    setdelDocData(docu);
    setDelDocNam(docu?.documentLevelName);
    setDelDocId(docu?.studentDocumentLevelId);
    setDeleteModal(true);
  };

  const toggleDangerFile = (docFile) => {
    setDelFileName(docFile?.studentDocumentFile?.fileName);
    setDelFileId(docFile?.studentDocumentLevelId);
    setDeleteModal2(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelDocId(0);
    setDelDocNam("");
    setdelDocData({});
  };

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDeleteModal2(false);
    setDelFileId(0);
    setDelFileName("");
  };

  const handleDeleteDocument = () => {
    setButtonStatus(true);
    setProgress2(true);
    const returnValue = remove(
      `StudentUploadDocument/LevelDelete/${delDocData?.studentDocumentLevelId}`
    ).then((action) => {
      setProgress2(false);
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelDocNam("");
      setDelDocId(0);
      setdelDocData({});
    });
  };

  const handleDeleteFile = (id) => {
    setButtonStatus(true);
    setProgress3(true);
    const returnValue = remove(`StudentUploadDocument/FileDelete/${id}`).then(
      (action) => {
        setProgress3(false);
        setButtonStatus(false);
        setDeleteModal2(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelFileName("");
        setDelFileId(0);
      }
    );
  };

  const changeHandler = (e, doc) => {
    setFileList2(e.target.files[0]);
    setIsSelected(true);
    setStudentDocuId(doc?.studentDocumentLevelId);
  };

  const handleCardUpload = () => {
    const subData = new FormData();

    subData.append("studentId", applicationStudentId);
    subData.append("studentDocument", FileList2);
    subData.append("studentDocumentLevelId", parseInt(studentDocuId));

    // for (var i of subData) {
    //
    // }

    if (studentDocuId !== 0) {
      setButtonStatus(true);
      setProgress4(true);
      post("StudentUploadDocument/FileCreate", subData).then((res) => {
        setButtonStatus(false);
        setProgress4(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList2(undefined);
          setIsSelected(false);
          setStudentDocuId(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }

    return;
  };

  if (
    isSelected === true &&
    FileList2 !== undefined &&
    typeof FileList2 === "object"
  ) {
    handleCardUpload();
    setFileList2(undefined);
    setIsSelected(false);
    setStudentDocuId(0);
  }

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    // const x = localeDate.split(",")[0];
    return localeDate;
  };

  const statusModal1 = (studentDocuId) => {
    setDocuLabel("Select Status");
    setDocuValue(0);
    setStudentDocumentId(studentDocuId);
    get(`StudentUploadDocument/StatusInfo/${studentDocuId}`).then((res) => {
      setDocuLabel(res?.name);
      setDocuValue(res?.id);
    });
    setOpenStatusModal11(true);
  };

  const closeStatusModal11 = () => {
    setDocuLabel("Select Status");
    setDocuValue(0);
    setOpenStatusModal11(false);
  };

  const handleStatusUpdateSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    setProgress13(true);
    put("StudentUploadDocument/UpdateStatus", subdata).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setProgress13(false);
        setOpenStatusModal11(false);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const selectDocuStatus = (label, value) => {
    setDocuLabel(label);
    setDocuValue(value);
  };

  const statusName = docuDD?.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Upload Documents</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student
              Profile
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="">
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Application
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Personal
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Contact
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Educational
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Experience
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Reference
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Personal Statement
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                Others
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "10"} onClick={() => toggle("10")}>
                Documents
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "11"} onClick={() => toggle("11")}>
                Declaration
              </NavLink>
            </NavItem>
          </Nav>

          <div className="row gy-3">
            <div className="col-md-8 ">
              <div className="hedding-titel d-flex justify-content-between mb-4 mt-4">
                <div>
                  <h5>
                    {" "}
                    <b>Document Information</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
              </div>

              {uploadedDocuData.map((docu, i) => (
                <div key={i} className="card mb-3 file-upload-border">
                  <div className="container  py-3 flex-style ">
                    <div>
                      <div className="document-type-style">
                        <span className="badge badge-secondary">
                          <span
                            className="text-decoration-none"
                            style={{ fontSize: "15px" }}
                          >
                            {docu?.document?.name}{" "}
                          </span>
                        </span>
                      </div>

                      <h5 className="document-title">
                        {docu?.documentLevelName}
                      </h5>
                    </div>

                    <div className="row">
                      {docu?.studentDocumentFile === null ? (
                        <div className="col-5"></div>
                      ) : (
                        <div className="col-6">
                          {userType == userTypes?.AdmissionManager ||
                          userType == userTypes?.AdmissionOfficer ||
                          userType == userTypes?.Admin ||
                          userType == userTypes?.SystemAdmin ||
                          userType == userTypes?.ComplianceManager ? (
                            <>
                              <b>Status</b>{" "}
                              <i
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  statusModal1(docu?.studentDocumentId)
                                }
                                className="fas fa-edit warning"
                              ></i>{" "}
                              <br />
                              <span>
                                {docu?.statusId == 1
                                  ? "Processing"
                                  : docu?.statusId == 2
                                  ? "Accepted"
                                  : "Rejected"}
                              </span>
                            </>
                          ) : (
                            <>
                              <b>Status</b> <br />
                              <span>
                                {docu?.statusId == 1
                                  ? "Processing"
                                  : docu?.statusId == 2
                                  ? "Accepted"
                                  : "Rejected"}
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      {docu?.studentDocumentFile === null ? (
                        <div className="col-3">
                          <div
                            style={{ cursor: "pointer" }}
                            className="image-upload"
                          >
                            {progress4 ? (
                              <LoadingOutlined
                                style={{
                                  fontSize: 30,
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                                spin
                              />
                            ) : (
                              <label htmlFor={`hp+${i}`}>
                                <i
                                  style={{
                                    fontSize: "50px",
                                    cursor: "pointer",
                                  }}
                                  className="mr-3 fas fa-arrow-alt-circle-up text-danger"
                                ></i>
                              </label>
                            )}

                            <input
                              name={i}
                              id={`hp+${i}`}
                              type="file"
                              onChange={(e) => changeHandler(e, docu)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="col-3">
                          <a
                            className="text-decoration-none"
                            href={rootUrl + docu?.studentDocumentFile?.fileUrl}
                            target="_blank"
                            download
                          >
                            <i
                              style={{ fontSize: "50px" }}
                              class="fas fa-arrow-alt-circle-down text-success"
                            ></i>
                          </a>
                        </div>
                      )}

                      <div className="col-3">
                        <Icon.XCircle
                          onClick={() => toggleDanger(docu)}
                          className=" ml-2 text-danger cross-icon-style"
                        />
                      </div>

                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this <b>{delDocNam}</b> ?
                            Once Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button color="danger" onClick={handleDeleteDocument}>
                            {progress2 ? <ButtonLoader /> : "YES"}
                          </Button>
                          <Button onClick={closeDeleteModal}>NO</Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                  <div class="card-footer uapp-card-bg text-white d-flex justify-content-between">
                    {docu?.studentDocumentFile != null ? (
                      <>
                        <div>
                          {/* 1 file uploaded:{" "} */}
                          <span className="ml-2  px-2">
                            {docu?.studentDocumentFile?.fileName}{" "}
                            <i
                              onClick={() => toggleDangerFile(docu)}
                              title="delete file"
                              style={{ cursor: "pointer" }}
                              className="fas fa-times text-warning "
                            ></i>
                          </span>
                        </div>
                        <div>
                          {docu?.createdBy} at {handleDate(docu?.createdOn)}
                        </div>
                      </>
                    ) : (
                      <div>0 file uploaded</div>
                    )}

                    {/* delete file modal */}
                    <Modal
                      isOpen={deleteModal2}
                      toggle={closeDeleteModalFile}
                      className="uapp-modal"
                    >
                      <ModalBody>
                        <p>
                          Are You Sure to Delete this <b>{delFileName}</b> ?
                          Once Deleted it can't be Undone!
                        </p>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          onClick={() => handleDeleteFile(delFileId)}
                        >
                          {progress3 ? <ButtonLoader /> : "YES"}
                        </Button>
                        <Button onClick={closeDeleteModalFile}>NO</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              ))}

              {/* status update modal starts here */}
              <Modal
                isOpen={openStatusModal11}
                toggle={closeStatusModal11}
                className="uapp-modal"
              >
                <ModalHeader>Update Status</ModalHeader>

                <ModalBody>
                  <form onSubmit={handleStatusUpdateSubmit}>
                    <input
                      type="hidden"
                      name="studentDocumentId"
                      id="studentDocumentId"
                      value={studentDocumentId}
                    />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          {" "}
                          Status
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={statusName}
                          value={{
                            label: docuLabel,
                            value: docuValue,
                          }}
                          onChange={(opt) =>
                            selectDocuStatus(opt.label, opt.value)
                          }
                          name="statusId"
                          id="statusId"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="9">
                        <div className="d-flex justify-content-end">
                          <Button
                            color="danger"
                            onClick={closeStatusModal11}
                            className="mr-1 mt-3"
                          >
                            Cancel
                          </Button>

                          {permissions?.includes(
                            permissionList.Change_Document_Status
                          ) ? (
                            <Button
                              className="ml-1 mt-3"
                              color="primary"
                              // disabled={buttonStatus}
                            >
                              {progress13 ? <ButtonLoader /> : "Update"}
                            </Button>
                          ) : null}
                        </div>
                      </Col>
                    </FormGroup>
                  </form>
                </ModalBody>
              </Modal>
              {/* status update modal ends here */}
            </div>

            <div className="col-md-4 file-upload-border rounded-3">
              <Form onSubmit={handleSubmit} className="mt-4 container">
                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <p>
                    Document Title <span className="text-danger">*</span>{" "}
                  </p>

                  <Input
                    className="input-custom-style ms-3"
                    type="text"
                    value={docLevel}
                    name="documentLevelName"
                    id="documentLevelName"
                    placeholder="Write Document Title"
                    onChange={(e) => setDocLevel(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <p>
                    Document Type <span className="text-danger">*</span>{" "}
                  </p>

                  <Select
                    className="input-custom-style ms-3"
                    options={docuTypeDD}
                    value={{ label: docuTypeLabel, value: docuTypeValue }}
                    onChange={(opt) => selectDocumentType(opt.label, opt.value)}
                    name="documentId"
                    id="documentId"
                  />

                  {docutypeError && (
                    <span className="text-danger">
                      Document type is required.
                    </span>
                  )}
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  {/* <Col md="2">
                        <span>
                          Upload Document <span className="text-danger">*</span>{" "}
                        </span>
                      </Col> */}
                  <Col md="8">
                    <div className="row">
                      <span className="mb-2">Upload Document</span>

                      {/* {applicationObject?.document ? (
                            <div className="col-md-3">
                              <Image
                                width={104}
                                height={104}
                                src={
                                  rootUrl + applicationObject?.document?.thumbnailUrl
                                }
                              />
                            </div>
                          ) : null} */}

                      {/* <div className="col-md-3"> */}
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
                            <span>Upload Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <AntdModal
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
                      </AntdModal>
                    </div>
                    {/* </div> */}

                    {/* {uploadError && (
                      <span className="text-danger">
                        Document is required
                      </span>
                    )} */}
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-end">
                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex" }}
                  >
                    {/* <Button.Ripple
             type="submit"
             className="mr-1 mt-3 badge-primary"
           >
             Upload
           </Button.Ripple> */}

                    <ButtonForFunction
                      type={"submit"}
                      className={"mr-1 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Upload"}
                      permission={6}
                      disable={buttonStatus}
                    />
                  </FormGroup>
                </div>
              </Form>
            </div>
          </div>

          <FormGroup
            className="has-icon-left position-relative"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ButtonForFunction
              name={"Previous"}
              className={"mr-1 mt-3 btn-warning"}
              func={previousPage}
              icon={<i className="fas fa-arrow-left-long mr-1"></i>}
            />

            <Button className="mr-1 mt-3 btn-warning" onClick={nextPage}>
              Next <i className="fas fa-arrow-right-long ml-1"></i>
            </Button>
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default DocumentUpload;
