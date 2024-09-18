import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
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
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
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

const UniversityApplicationDocumentForm = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { univerId } = useParams();
  const [activetab, setActivetab] = useState("7");

  const [document, setDocument] = useState([]);
  const [documentLabel, setDocumentLabel] = useState("Select Document");
  const [applicationLabel, setApplicationLabel] = useState(
    "Select Application Type"
  );
  const [documentValue, setDocumentValue] = useState(0);
  const [applicationValue, setApplicationValue] = useState(0);
  const [documentError, setDocumentError] = useState(false);
  const [applicationTypeError, setApplicationTypeError] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [applicationObject, setApplicationObject] = useState({});

  const [isMandatory, setIsMandatory] = useState(null);
  const [applicationError, setApplicationError] = useState(false);
  const [applicationTypeId, setApplicationTypeId] = useState([]);
  const [applicationName, setApplicationName] = useState("");
  const [applicationId, setApplicationId] = useState(0);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // useEffect(() => {
  //   get("ApplicationTypeDD/Index").then((res) => {
  //     setApplicationTypeId(res);
  //   });

  //   get(`DocumentDD/Index`).then((res) => {

  //     setDocument(res);
  //   });

  // }, []);

  const documentOptions = document?.map((doc) => ({
    label: doc?.name,
    value: doc?.id,
  }));

  const applicationOptions = applicationTypeId?.map((app) => ({
    label: app?.name,
    value: app?.id,
  }));

  const selectDocument = (label, value) => {
    setDocumentError(false);
    setDocumentLabel(label);
    setDocumentValue(value);
  };

  const selectApplicationType = (label, value) => {
    setApplicationTypeError(false);
    setApplicationLabel(label);
    setApplicationValue(value);
  };

  // redirect to
  const backToUniList = () => {
    history.push("/universityList");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    for (var i of subData) {
    }

    if (documentValue == 0) {
      setDocumentError(true);
    } else if (applicationValue == 0) {
      setApplicationTypeError(true);
    } else if (isMandatory === null) {
      setApplicationError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      post("UniversityApplicationDocument/Create", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/createUniversityTemplateDocument/${univerId}`);
          setSuccess(!success);
          setShowForm(!showForm);
          // setDocumentLabel("Select Requirement Status")
          // setDocumentValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleIsMandatory = (event) => {
    setIsMandatory(event.target.value);
    setApplicationError(false);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Application Document</h3>
          {/* <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University
              List
            </span>
          </div> */}
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-4">
            {/* <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Application Document</b>{" "}
                        </h5>

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
              {selectedId !== 0 ? (
                <Input type="hidden" id="Id" name="Id" value={selectedId} />
              ) : null}
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Document Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={documentOptions}
                  value={{ label: documentLabel, value: documentValue }}
                  onChange={(opt) => selectDocument(opt.label, opt.value)}
                  name="documentId"
                  id="documentId"
                />

                {documentError && (
                  <span className="text-danger">Document is required</span>
                )}
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
                    label: applicationLabel,
                    value: applicationValue,
                  }}
                  onChange={(opt) =>
                    selectApplicationType(opt.label, opt.value)
                  }
                  name="applicationTypeId"
                  id="applicationTypeId"
                />

                {applicationTypeError && (
                  <span className="text-danger">
                    Application type is required
                  </span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Mandatory <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isMandatory"
                    onChange={handleIsMandatory}
                    name="isMandatory"
                    value="true"
                    checked={isMandatory == "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isMandatory"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isMandatory"
                    onChange={handleIsMandatory}
                    name="isMandatory"
                    value="false"
                    checked={isMandatory == "false"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isMandatory"
                  >
                    No
                  </Label>
                </FormGroup>

                <br />

                {applicationError && (
                  <span className="text-danger">Yes or No is required</span>
                )}
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  color={"primary"}
                  type={"submit"}
                  className={"ml-lg-3 ml-sm-1 mt-3"}
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

export default UniversityApplicationDocumentForm;
