import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";

const BranchConsultantRegistration = () => {
  const [nameTitle, setNameTitle] = useState([]);
  const [consParent, setConsParent] = useState([]);
  const [consType, setConsType] = useState([]);
  const [nameLabel, setNameLabel] = useState("Select Title");
  const [nameValue, setNameValue] = useState(0);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState("Select Consultant Type");
  const [typeValue, setTypeValue] = useState(0);

  const [emailError, setEmailError] = useState(true);
  const [consultantError, setConsultantError] = useState(false);
  const [parentError, setParentError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const { branchId } = useParams();

  // useEffect(()=>{
  //   get("NameTittleDD/index").then(res=>{
  //     setNameTitle(res);
  //   });

  //   get("ConsultantDD/index").then(res=>{
  //     setConsParent(res);
  //   });

  //   get("ConsultantTypeDD/index").then(res=>{
  //     setConsType(res);
  //   })

  // },[]);

  const nameTitleMenu = nameTitle?.map((titleOptions) => ({
    label: titleOptions?.name,
    value: titleOptions?.id,
  }));
  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));
  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const selectNameTitle = (label, value) => {
    setTitleError(false);
    setNameLabel(label);
    setNameValue(value);
  };

  const handlePass = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

  const selectParentCons = (label, value) => {
    setParentError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const selectConsType = (label, value) => {
    setConsultantError(false);
    setTypeLabel(label);
    setTypeValue(value);
  };

  const handleEmail = (e) => {
    get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const backToBranchList = () => {
    history.push("/branchList");
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    if (typeValue == 0) {
      setConsultantError(true);
    } else if (parentValue == 0) {
      setParentError(true);
    } else if (nameValue == 0) {
      setTitleError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      //  watch form data values
      for (var value of subdata) {
      }

      if (pass.length < 6) {
        setPassError("Password length can not be less than six digits");
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("Consultant/RegisterToBranch", subdata).then((res) => {
          setProgress(false);

          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess == true ? "success" : "error",
            autoDismiss: true,
          });
          setButtonStatus(false);

          if (res.status === 200 && res.data.isSuccess === true) {
            history.push(`/branchProfile/${branchId}`);
          } else {
            return;
          }
        });
      }
    }
  };

  const ToBranchList = () => {
    history.push("/branchList");
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Add Default Consultant</h3>
          <div className="page-header-back-to-home">
            {/* <span className="text-white" onClick={backToBranchList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Branch List
            </span> */}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-5">
            <input
              type="hidden"
              name="branchId"
              id="branchId"
              value={branchId}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Consultant Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={consTypeMenu}
                  value={{ label: typeLabel, value: typeValue }}
                  onChange={(opt) => selectConsType(opt.label, opt.value)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />

                {consultantError && (
                  <span className="text-danger">
                    Consultant type is required
                  </span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Parent Consultant <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={consParentMenu}
                  value={{ label: parentLabel, value: parentValue }}
                  onChange={(opt) => selectParentCons(opt.label, opt.value)}
                  name="parentConsultantId"
                  id="parentConsultantId"
                />

                {parentError && (
                  <span className="text-danger">
                    Parent consultant is required
                  </span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Title <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitleMenu}
                  value={{ label: nameLabel, value: nameValue }}
                  onChange={(opt) => selectNameTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                />

                {titleError && (
                  <span className="text-danger">Name title is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>First Name</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Last Name</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Email <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  onBlur={handleEmail}
                />

                {!emailError ? (
                  <span className="text-danger">Email already exists</span>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Phone Number</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Password <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
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

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            ></FormGroup>

            <FormGroup
              row
              className="has-icon-left position-relative ms-3"
              style={{ display: "flex", justifyContent: "end" }}
            >
              {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}
              <Col md="5">
                {/* <Button onClick={ToBranchList} 
                    className='mt-3 mr-1'
                    color='danger'>
                        Cancel
                    </Button> */}

                <ButtonForFunction
                  type={"submit"}
                  className={"mt-3 ml-1"}
                  color={"primary"}
                  name={progress ? <ButtonLoader /> : "Submit"}
                  disable={buttonStatus}
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BranchConsultantRegistration;
