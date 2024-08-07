import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const ConvertStudentIntoConsultantForm = () => {
  const { studentId } = useParams();
  const history = useHistory();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const [visa, setVisa] = useState([]);
  const [visaLabel, setVisaLabel] = useState("Select Visa Status");
  const [visaValue, setVisaValue] = useState(0);

  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);

  const [visaError, setVisaError] = useState("");
  const [residencyError, setResidencyError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  const { addToast } = useToasts();

  // useEffect(()=>{

  //     get(`VisaTypeDD/index`)
  //     .then(res => {
  //         setVisa(res);
  //     })

  //     get(`ResidencyStatusDD/index`)
  //     .then(res =>{
  //         setResidency(res);
  //     })

  // },[])

  const visaOptions = visa?.map((v) => ({
    label: v?.name,
    value: v?.id,
  }));

  const residencyOptions = residency?.map((r) => ({
    label: r?.name,
    value: r?.id,
  }));

  const selectVisa = (label, value) => {
    setVisaLabel(label);
    setVisaValue(value);
    setVisaError("");
  };

  const selectResidency = (label, value) => {
    setResidencyLabel(label);
    setResidencyValue(value);
    setResidencyError("");
  };

  const backToDashboard = () => {
    history.push(`/`);
  };

  // Trial start1

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
    setFileList(fileList);
    setError("");
  };

  // Trial End1

  // Trial start2

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setError2("");
  };

  // Trial End2

  // Trial start3

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setError3("");
  };

  // Trial End3

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("ProfOfRightToWork", FileList[0]?.originFileObj);
    subData.append("ProfOfAddress", FileList2[0]?.originFileObj);
    subData.append("IdOrPassport", FileList3[0]?.originFileObj);

    if (FileList.length < 1) {
      setError("File is required");
    } else if (FileList2.length < 1) {
      setError2("File is required");
    } else if (FileList3.length < 1) {
      setError3("File is required");
    } else if (visaValue == 0) {
      setVisaError("Visa status is required");
    } else if (residencyValue == 0) {
      setResidencyError("Residency status is required");
    } else {
      setButtonStatus(true);
      post(`BecomeConsultant/Submit`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/");
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
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Register Student As Consultant</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="my-5">
            <input
              type="hidden"
              name="StudentId"
              id="StudentId"
              value={studentId}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Proof Of Right To Work <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
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
                      <span>Upload File Here</span>
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
                <span className="text-danger d-block">{error}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Proof Of Address <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Upload
                  listType="picture-card"
                  multiple={false}
                  fileList={FileList2}
                  onPreview={handlePreview2}
                  onChange={handleChange2}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList2.length < 1 ? (
                    <div className="text-danger" style={{ marginTop: 8 }}>
                      <Icon.Upload />
                      <br />
                      <span>Upload File Here</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Upload>
                <Modal
                  visible={previewVisible2}
                  title={previewTitle2}
                  footer={null}
                  onCancel={handleCancel2}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage2}
                  />
                </Modal>
                <span className="text-danger d-block">{error2}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Id Or Passport <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Upload
                  listType="picture-card"
                  multiple={false}
                  fileList={FileList3}
                  onPreview={handlePreview3}
                  onChange={handleChange3}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList3.length < 1 ? (
                    <div className="text-danger" style={{ marginTop: 8 }}>
                      <Icon.Upload />
                      <br />
                      <span>Upload File Here</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Upload>
                <Modal
                  visible={previewVisible3}
                  title={previewTitle3}
                  footer={null}
                  onCancel={handleCancel3}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage3}
                  />
                </Modal>
                <span className="text-danger d-block">{error3}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Visa Status <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={visaOptions}
                  value={{ label: visaLabel, value: visaValue }}
                  onChange={(opt) => selectVisa(opt.label, opt.value)}
                  name="VisaTypeId"
                  id="VisaTypeId"
                />
                <span className="text-danger">{visaError}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Residency Status <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={residencyOptions}
                  value={{ label: residencyLabel, value: residencyValue }}
                  onChange={(opt) => selectResidency(opt.label, opt.value)}
                  name="ResidencyStatusId"
                  id="ResidencyStatusId"
                />
                <span className="text-danger">{residencyError}</span>
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-9">
                <div className="d-flex justify-content-end">
                  <Button
                    color="danger"
                    className="mr-1"
                    onClick={backToDashboard}
                  >
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    className="ml-1"
                    disabled={buttonStatus}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ConvertStudentIntoConsultantForm;
