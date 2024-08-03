import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
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
  FormGroup,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";

import get from "../../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../../constants/constants";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { userTypes } from "../../../../constants/userTypeConstant";

import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";

const StudentDocument = ({ stdId }) => {
  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Status");
  const [docuValue, setDocuValue] = useState(0);
  const [docuDD, setDocuDD] = useState([]);
  const [openStatusModal11, setOpenStatusModal11] = useState(false);
  const [studentDocumentId, setStudentDocumentId] = useState(0);
  const [success, setSuccess] = useState(false);

  const [progress9, setProgress9] = useState(false);
  const [progress10, setProgress10] = useState(false);
  const [progress11, setProgress11] = useState(false);
  const [progress12, setProgress12] = useState(false);
  const [progress13, setProgress13] = useState(false);

  //   for document upload
  const [FileList2, setFileList2] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [studentDocuId, setStudentDocuId] = useState(0);
  const [delDocData, setdelDocData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [FileList1, setFileList1] = useState([]);
  const [docLevel, setDocLevel] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");

  const [docuType, setDocuType] = useState([]);
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document Type");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  const { addToast } = useToasts();

  // useEffect(() => {
  //   // document upload
  //   get(`StudentUploadDocument/Index/${stdId}`).then((res) => {
  //     setUploadedDocuData(res);
  //   });
  //   get(`DocumentStatusDD/index`).then((res) => {
  //     setDocuDD(res);
  //   });
  //   get("DocumentDD/Index").then((res) => {
  //     setDocuType(res);
  //   });
  // }, [stdId, success]);

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

    // for (var value of subdata.values()) {

    // }

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

  const changeHandler = (e, doc) => {
    setFileList2(e.target.files[0]);
    setIsSelected(true);
    setStudentDocuId(doc?.studentDocumentLevelId);
  };

  const toggleDanger = (docu) => {
    setdelDocData(docu);

    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    localStorage.removeItem("delDocNam");
    localStorage.removeItem("delDocId");
  };

  const handleDeleteDocument = () => {
    setProgress11(true);
    const returnValue = remove(
      `StudentUploadDocument/LevelDelete/${delDocData?.studentDocumentLevelId}`
    ).then((action) => {
      setProgress11(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      localStorage.removeItem("delDocNam");
      localStorage.removeItem("delDocId");
    });
  };

  const toggleDangerFile = (docFile) => {
    localStorage.setItem("delFileName", docFile?.studentDocumentFile?.fileName);
    localStorage.setItem("delFileId", docFile?.studentDocumentLevelId);
    setDeleteModal2(true);
  };

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDeleteModal2(false);
    localStorage.removeItem("delFileName");
    localStorage.removeItem("delFileId");
  };

  const handleDeleteFile = (id) => {
    setProgress10(true);
    const returnValue = remove(`StudentUploadDocument/FileDelete/${id}`).then(
      (action) => {
        setProgress10(false);
        setDeleteModal2(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        localStorage.removeItem("delFileName");
        localStorage.removeItem("delFileId");
      }
    );
  };

  const handleDate2 = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    // const x = localeDate.split(",")[0];
    return localeDate;
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
      setProgress9(true);
      post("StudentUploadDocument/Create", subData).then((res) => {
        setProgress9(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
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

  const docuTypeDD = docuType.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));
  const selectDocumentType = (label, value) => {
    setDocuTypeLabel(label);
    setDocuTypeValue(value);
    setDocuTypeError(false);
  };

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handleCardUpload = () => {
    const subData = new FormData();

    subData.append("studentId", stdId);
    subData.append("studentDocument", FileList2);
    subData.append("studentDocumentLevelId", parseInt(studentDocuId));

    // for (var i of subData) {

    // }

    if (studentDocuId !== 0) {
      setProgress12(true);
      post("StudentUploadDocument/FileCreate", subData).then((res) => {
        setProgress12(false);
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

  return (
    <div>
      <div className="">
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

                <h5 className="document-title">{docu?.documentLevelName}</h5>
              </div>

              <div className="row">
                {/* <div className="col-6"> */}
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
                          onClick={() => statusModal1(docu?.studentDocumentId)}
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
                  <div className="col-4">
                    <div style={{ cursor: "pointer" }} className="image-upload">
                      {progress12 ? (
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
                            className="fas fa-arrow-alt-circle-up text-danger"
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
                  <div className="col-4">
                    <a
                      className="text-decoration-none"
                      href={rootUrl + docu?.studentDocumentFile?.fileUrl}
                      target="_blank"
                      download
                    >
                      <i
                        style={{ fontSize: "50px" }}
                        className="fas fa-arrow-alt-circle-down text-success"
                      ></i>
                    </a>
                  </div>
                )}

                <div className="col-2">
                  <Icon.XCircle
                    onClick={() => toggleDanger(docu)}
                    className=" ml-0 pr-1 text-danger cross-icon-style"
                  />
                </div>

                <Modal
                  isOpen={deleteModal}
                  toggle={closeDeleteModal}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this{" "}
                      <b>{localStorage.getItem("delDocNam")}</b> ? Once Deleted
                      it can't be Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      color="danger"
                      // onClick={() =>
                      //   handleDeleteDocument(
                      //     localStorage.getItem("delDocId")
                      //   )
                      // }
                      onClick={handleDeleteDocument}
                    >
                      {progress11 ? <ButtonLoader /> : "YES"}
                    </Button>
                    <Button onClick={closeDeleteModal}>NO</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
            <div className="card-footer uapp-card-bg text-white d-flex justify-content-between">
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
                    {docu?.createdBy} at {handleDate2(docu?.createdOn)}
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
                    Are You Sure to Delete this{" "}
                    <b>{localStorage.getItem("delFileName")}</b> ? Once Deleted
                    it can't be Undone!
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() =>
                      handleDeleteFile(localStorage.getItem("delFileId"))
                    }
                  >
                    {progress10 ? <ButtonLoader /> : "YES"}
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
                    onChange={(opt) => selectDocuStatus(opt.label, opt.value)}
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

      <Form onSubmit={handleSubmit} className="mt-4 container">
        <input type="hidden" name="studentId" id="studentId" value={stdId} />

        <FormGroup row>
          <Col md="12">
            <p>
              Document Title <span className="text-danger">*</span>{" "}
            </p>

            <Input
              type="text"
              value={docLevel}
              name="documentLevelName"
              id="documentLevelName"
              placeholder="Write Document Title"
              onChange={(e) => setDocLevel(e.target.value)}
              required
            />
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col md="12">
            <p>
              Document Type <span className="text-danger">*</span>{" "}
            </p>

            <Select
              options={docuTypeDD}
              value={{
                label: docuTypeLabel,
                value: docuTypeValue,
              }}
              onChange={(opt) => selectDocumentType(opt.label, opt.value)}
              name="documentId"
              id="documentId"
            />
          </Col>

          {docutypeError && (
            <span className="text-danger ml-3">Document type is required</span>
          )}
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          {/* <Col md="2">
                        <span>
                          Upload Document <span className="text-danger">*</span>{" "}
                        </span>
                      </Col> */}
          <Col md="8">
            {/* <div className="row"> */}
            <div className="mb-2">Upload Document</div>

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

            <div className="col-md-3">
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
                open={previewVisible1}
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

        <FormGroup
          className="has-icon-left position-relative"
          style={{ display: "flex" }}
        >
          {permissions?.includes(permissionList.Add_New_Student_Documents) ? (
            <ButtonForFunction
              type={"submit"}
              className={"mr-1 mt-3 badge-primary"}
              name={progress9 ? <ButtonLoader /> : "Upload"}
              permission={6}
            />
          ) : null}
        </FormGroup>
      </Form>
    </div>
  );
};

export default StudentDocument;
