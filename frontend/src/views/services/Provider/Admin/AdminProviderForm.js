import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
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
} from "reactstrap";
import Select from "react-select";
import AdminLogo from "./AdminLogo";
import get from "../../../../helpers/get";
import { Upload, Modal } from "antd";

import * as Icon from "react-feather";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonLoader from "../../Components/ButtonLoader";

const AdminProviderForm = () => {
  const { adminProviderHiddenId } = useParams();

  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [text, setText] = useState("");

  const [emailError, setEmailError] = useState(true);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // useEffect(()=>{

  //   get('NameTittle/GetAll')
  //   .then(res => {

  //     setTitle(res);
  //   })

  // },[])

  const backToDashboard = () => {
    if (location.providerId !== undefined) {
      history.push(`/providerDetails/${location.providerId}`);
    } else {
      history.push("/providerList");
    }
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

  // provider admin image code start

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
    setImageError(false);
    //  setFileList(fileList);

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

  // provider admin image code end

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("providerAdmin", FileList[0]?.originFileObj);

    if (titleValue == 0) {
      setTitleError(true);
    } else if (FileList?.length < 1) {
      setImageError(true);
    } else if (pass.length < 6) {
      setPassError("Password length can not be less than six digits");
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(`ProviderAdmin/Create`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/providerDetails/${adminProviderHiddenId}`);
        } else if (res?.status == 200 && res?.data?.isSuccess == false) {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleEmail = (e) => {
    get(`EmailCheck/Validate/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const handlePass = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Admin Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              {location.providerId !== undefined ? (
                <>
                  <i className="fas fa-arrow-circle-left"></i> Back to Provider
                  Details
                </>
              ) : // "Back to Provider List"
              // <>
              //   <i className="fas fa-arrow-circle-left"></i>{" "}"Back to Provider List"
              // </>
              null}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="providerId"
              id="providerId"
              value={adminProviderHiddenId}
            />

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Title <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Select
                  options={nameTitle}
                  value={{ label: titleLabel, value: titleValue }}
                  onChange={(opt) => selectTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                  required
                />

                {titleError && (
                  <span className="text-danger">Title is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  First Name <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Last Name <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Email <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  onBlur={handleEmail}
                  // onChange={(e)=>setIcon(e.target.value)}
                />
                {!emailError ? (
                  <span className="text-danger">Email already exists</span>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Password <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  onChange={handlePass}
                />
                <span className="text-danger">{passError}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Phone Number <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter Your Phone Number"
                  required
                  // onChange={(e)=>setIcon(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <span className="pl-2">
                  {" "}
                  Admin Image <span className="text-danger">*</span>
                </span>
              </Col>

              <Col md="10" lg="6">
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

                {imageError ? (
                  <span className="text-danger">Admin image is required</span>
                ) : null}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="8">
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                    // onClick={(e)=>handleSubmit(e)}
                    disabled={buttonStatus}
                  >
                    {progress ? <ButtonLoader /> : "Submit"}
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminProviderForm;
