import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Col,
  CardBody,
} from "reactstrap";
import Checkbox from "../../../../components/core/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { connect } from "react-redux";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";
import { history } from "../../../../history";
import axios from "axios";
import { rootUrl } from "../../../ReusableFunction/Api/ApiFunc";
import { store } from "react-notifications-component";
import { Link, useHistory } from "react-router-dom";
import get from "../../../../helpers/get";
import Select from "react-select";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const ConsultantRegisterJWT = () => {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [names, setNames] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [error, setError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const { addToast } = useToasts();
  const history = useHistory();

  // useEffect(()=>{

  //   get('NameTittleDD/index')
  //   .then(res => {

  //     setNames(res);

  //   })

  //   get('ConsultantTypeDD/index')
  //   .then(res => {
  //     setConsultants(res);
  //   })

  // },[])

  const handleEmail = (e) => {
    setEmail(e.target.value);
    get(`EmailCheck/Validate/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const subData = {
      ConsultantTypeId: type,
      NameTittleId: title,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNumber: number,
      Password: pass,
    };

    if (type == 0) {
      setTypeError("Consultant type is required");
    } else if (title == 0) {
      setTitleError("Name title is required");
    } else if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else {
      post(`Consultant/CreateAccount`, subData).then((res) => {
        if (res?.status == 200) {
          if (res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/");
          } else {
            setError(res?.data?.message);
          }
        }
      });
    }
  };

  return (
    <React.Fragment>
      <CardBody className="pt-1">
        <Form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-3">
              <span>Consultant type</span>
            </div>

            <div className="col-md-9">
              {consultants?.map((tt) => (
                <>
                  <input
                    type="radio"
                    name="studentTypeId"
                    id="studentTypeId"
                    value={tt?.id}
                    onClick={() => setType(tt?.id)}
                  />

                  <label
                    className="mr-3"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    {tt?.name}
                  </label>
                </>
              ))}
              <span className="text-danger ms-2">{typeError}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <span>Title</span>
            </div>

            <div className="col-md-9">
              {names?.map((tt) => (
                <>
                  <input
                    type="radio"
                    name="NameTittleID"
                    id="NameTittleID"
                    value={tt?.id}
                    onClick={() => setTitle(tt?.id)}
                  />

                  <label
                    className="mr-3"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    {tt?.name}
                  </label>
                </>
              ))}
              <span className="text-danger ms-2">{titleError}</span>
            </div>
          </div>

          <div className="row gx-0">
            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  First Name
                </Label>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  Last Name
                </Label>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={handleEmail}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  Email
                </Label>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setError("");
                    setPass(e.target.value);
                  }}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  Password
                </Label>
              </FormGroup>
            </div>
          </div>

          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginTop: "35px" }}
          >
            <Input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setNumber(e.target.value)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              required
            />
            <div className="form-control-position"></div>
            <Label
              style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
            >
              Phone Number
            </Label>
          </FormGroup>

          <div className="d-flex justify-content-between">
            <div>
              <div>
                <span className="text-danger">{error}</span>
              </div>
              <button className="login-btn-style" type="submit">
                Register
              </button>
            </div>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "rgb(30, 152, 176)",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              I am already registered
            </Link>
          </div>
        </Form>

        <br />
        <div className="row">
          <div
            className="col-md-6 float-left"
            style={{ color: "#707070", fontSize: "13px", fontWeight: "400" }}
          >
            Privacy policy
          </div>

          <div
            className="col-md-6 float-right"
            style={{ color: "#164677", fontSize: "13px", fontWeight: "400" }}
          >
            UAPP © services Higher Education Group.
          </div>
        </div>
      </CardBody>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    values: state.auth.register,
  };
};
export default connect(mapStateToProps, { signupWithJWT })(
  ConsultantRegisterJWT
);
