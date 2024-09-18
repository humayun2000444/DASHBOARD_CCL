import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import Select from "react-select";
import ButtonForFunction from "../../Components/ButtonForFunction";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import ButtonLoader from "../../Components/ButtonLoader";

const UniversityCommissionForm = () => {
  const history = useHistory();
  const { univerId } = useParams();
  const [activetab, setActivetab] = useState("9");
  const [commission, setCommission] = useState([]);
  const { addToast } = useToasts();

  const [commissionTitleHome, setCommissionTitleHome] = useState(
    "Select Commission Type"
  );
  const [commissionValueHome, setCommissionValueHome] = useState(0);
  const [commissionTitleInternational, setCommissionTitleinternational] =
    useState("Select Commission Type");
  const [commissionValueInternational, setCommissionValueInternational] =
    useState(0);
  const [commissionTitleEU_UK, setCommissionTitleEU_UK] = useState(
    "Select Commission Type"
  );
  const [commissionValueEU_UK, setCommissionValueEU_UK] = useState(0);
  const [homeError, setHomeError] = useState("");
  const [intError, setIntError] = useState("");
  const [euukhomeError, setEUUKError] = useState("");
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [val, setVal] = useState({});

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // useEffect(()=>{
  //     get(`StudentComissionTypeDD/Index`)
  //     .then(res => {

  //         setCommission(res);
  //     })

  // },[])

  // redirect to
  const backToUniList = () => {
    history.push("/universityList");
  };

  const commissionOptions = commission?.map((com) => ({
    label: com?.name,
    value: com?.id,
  }));

  const selectCommissionHome = (label, value) => {
    setHomeError("");
    setCommissionTitleHome(label);
    setCommissionValueHome(value);
  };

  const selectCommissionInternational = (label, value) => {
    setIntError("");
    setCommissionTitleinternational(label);
    setCommissionValueInternational(value);
  };

  const selectCommissionEU_UK = (label, value) => {
    setEUUKError("");
    setCommissionTitleEU_UK(label);
    setCommissionValueEU_UK(value);
  };

  const onGoUniList = () => {
    history.push("/universityList");
  };

  const onGoUniProfile = () => {
    history.push(`/universityDetails/${univerId}`);
  };

  const submitFormData = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (commissionValueHome == 0) {
      setHomeError("Select commission type for home students");
    } else if (commissionValueInternational == 0) {
      setIntError("Select commission type for international students");
    } else if (commissionValueEU_UK == 0) {
      setEUUKError("Select commission type for eu_uk students");
    } else {
      setProgress(true);
      setButtonStatus(true);
      post(`UniversityComission/Create`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setVal({});
          setShowForm(false);
          setCommissionTitleHome("Select Commission Type");
          setCommissionTitleinternational("Select Commission Type");
          setCommissionTitleEU_UK("Select Commission Type");
          setCommissionValueHome(0);
          setCommissionValueInternational(0);
          setCommissionValueEU_UK(0);
          history.push({
            pathname: `/universityDetails/${univerId}`,
          });
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
          <h3 className="text-white">University Commission</h3>
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
          <Form className="mt-5" onSubmit={submitFormData}>
            {/* <div className="hedding-titel d-flex justify-content-between mb-3">
                    <div>
                      <h5>
                        {" "}
                        <b>Commission Informtation</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div> */}

            <FormGroup row className="has-icon-left position-relative">
              <input
                type="hidden"
                id="universityId"
                name="universityId"
                value={univerId}
              />
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Type (Home) <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={commissionOptions}
                  value={{
                    label: commissionTitleHome,
                    value: commissionValueHome,
                  }}
                  onChange={(opt) => selectCommissionHome(opt.label, opt.value)}
                  name="homeStudentComissionType"
                  id="homeStudentComissionType"
                />
                <span className="text-danger">{homeError}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Installment (Home){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="homeStudentComissionInstallment"
                  id="homeStudentComissionInstallment"
                  max={"10"}
                  placeholder="Write Commission Installment"
                  required
                  defaultValue={val?.homeStudentComissionInstallment}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Value (Home) <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="homeStudentComissionValue"
                  id="homeStudentComissionValue"
                  defaultValue={val?.homeStudentComissionValue}
                  placeholder="Write Commission Value"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Type (International){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={commissionOptions}
                  value={{
                    label: commissionTitleInternational,
                    value: commissionValueInternational,
                  }}
                  onChange={(opt) =>
                    selectCommissionInternational(opt.label, opt.value)
                  }
                  name="internationalStudentComissionType"
                  id="internationalStudentComissionType"
                />
                <span className="text-danger">{intError}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Installment (International){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="internationalStudentComissionInstallment"
                  id="internationalStudentComissionInstallment"
                  max={"10"}
                  placeholder="Write Commission Installment"
                  required
                  defaultValue={val?.internationalStudentComissionInstallment}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Value (International){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="internationalStudentComissionValue"
                  id="internationalStudentComissionValue"
                  defaultValue={val?.internationalStudentComissionValue}
                  placeholder="Write Commission Value"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Type (EU_UK) <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={commissionOptions}
                  value={{
                    label: commissionTitleEU_UK,
                    value: commissionValueEU_UK,
                  }}
                  onChange={(opt) =>
                    selectCommissionEU_UK(opt.label, opt.value)
                  }
                  name="eU_UKStudentComissionType"
                  id="eU_UKStudentComissionType"
                />
                <span className="text-danger">{euukhomeError}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Installment (EU_UK){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="eU_UKStudentComissionInstallment"
                  id="eU_UKStudentComissionInstallment"
                  max={"10"}
                  placeholder="Write Commission Installment"
                  required
                  defaultValue={val?.eU_UKStudentComissionInstallment}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Commission Value (EU_UK){" "}
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="eU_UKStudentComissionValue"
                  id="eU_UKStudentComissionValue"
                  defaultValue={val?.eU_UKStudentComissionValue}
                  placeholder="Write Commission Value"
                  required
                />
              </Col>
            </FormGroup>

            <div className="row mt-5">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  color={"primary"}
                  type={"submit"}
                  className={"ml-lg-3 ml-sm-1 mt-3"}
                  name={progress ? <ButtonLoader /> : "Save & Finish"}
                  disable={buttonStatus}
                  permission={6}
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityCommissionForm;
