import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
// import MediaPictures from "./UniversityMedia";
import Select from "react-select";
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
  ButtonGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import get from "../../../../helpers/get";

import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";

import { Image } from "antd";

import CustomButtonRipple from "../../Components/CustomButtonRipple";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkSpanButton from "../../Components/LinkSpanButton";
import { rootUrl } from "../../../../constants/constants";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";

const UniversityTemplateDocumentForm = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { univerId } = useParams();
  const [activetab, setActivetab] = useState("8");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [document, setDocument] = useState([]);
  const [documentLabel, setDocumentLabel] = useState(
    "Select Requirement Status"
  );
  const [documentValue, setDocumentValue] = useState(0);
  const [applicationError, setApplicationError] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [applicationObject, setApplicationObject] = useState({});

  const [applicationTypeLabel, setApplicationTypeLabel] = useState(
    "Select Application Type"
  );
  const [applicationTypeValue, setApplicationTypeValue] = useState(0);
  const [applicationTypeId, setApplicationTypeId] = useState([]);

  // image upload starts here
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);

  const [templateName, setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState(0);

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
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

  //   get("ApplicationTypeDD/Index").then((res) => {
  //     setApplicationTypeId(res);
  //   });

  // }, []);

  const applicationOptions = applicationTypeId?.map((app) => ({
    label: app?.name,
    value: app?.id,
  }));

  const selectApplicationType = (label, value) => {
    setApplicationError(false);
    setApplicationTypeLabel(label);
    setApplicationTypeValue(value);
  };

  // redirect to
  const backToUniList = () => {
    history.push("/universityList");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    subData.append(
      "template",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );

    // for(var i of subData){
    //
    // }

    if (applicationTypeValue == 0) {
      setApplicationError(true);
    } else if (FileList1.length < 1 && selectedId == 0) {
      setUploadError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      post("UniversityTemplateDocument/Create", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/createUniversityCommission/${univerId}`);
          setSuccess(!success);
          setShowForm(!showForm);
          setFileList1([]);
          setApplicationTypeLabel("Select Application Type");
          setApplicationTypeValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  // redirect to Next Page
  // const onNextPage = () => {
  //   history.push({
  //     pathname: "/addUniversityRequiredDocument",
  //     id: uniID,
  //   });
  // };

  const redirectToNext = () => {
    history.push(`/createUniversityCommission/${univerId}`);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Template Document</h3>
          {/* <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University List
            </span>
          </div> */}
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-4">
            {/* <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5> <b>Template Document</b> </h5>

                        <div className="bg-h"></div>
                      </div>

                    </div> */}

            <FormGroup row className="has-icon-left position-relative">
              <Input
                type="hidden"
                id="universityId"
                name="universityId"
                value={univerId}
              />
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  {" "}
                  Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  //   defaultValue={applicationObject?.name}
                  placeholder="Write Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  {" "}
                  Description <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="textarea"
                  rows="4"
                  name="description"
                  id="description"
                  //   defaultValue={applicationObject?.description}
                  placeholder="Write Description"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Application Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={applicationOptions}
                  value={{
                    label: applicationTypeLabel,
                    value: applicationTypeValue,
                  }}
                  onChange={(opt) =>
                    selectApplicationType(opt.label, opt.value)
                  }
                  name="applicationTypeId"
                  id="applicationTypeId"
                />

                {applicationError && (
                  <span className="text-danger">
                    Application type is required
                  </span>
                )}

                {/* <div className="form-control-position">
                        <User size={15} />
                        </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Upload Document <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row">
                  {applicationObject?.templateFile ? (
                    <div className="col-md-3">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          applicationObject?.templateFile?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

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
                </div>

                {uploadError && (
                  <span className="text-danger">Document is required</span>
                )}

                {/* {
                            <MediaPictures/>
                        } */}
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  color={"primary"}
                  func={redirectToNext}
                  className={"mt-3"}
                  name={"Skip & Next"}
                  // disable={buttonStatus}
                  permission={6}
                />

                <ButtonForFunction
                  color={"primary"}
                  type={"submit"}
                  className={"ml-lg-2 ml-sm-1 mt-3"}
                  name={progress ? <ButtonLoader /> : "Save & Next"}
                  disable={buttonStatus}
                  permission={6}
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
      <br /> <br /> <br />
    </div>
  );
};

export default UniversityTemplateDocumentForm;
