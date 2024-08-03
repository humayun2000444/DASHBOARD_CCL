import React, { useEffect, useState } from "react";
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
import Select from "react-select";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const StudentRegisterJWT = () => {
  const [students, setStudents] = useState([]);
  const [names, setNames] = useState([]);

  const [studentLabel, setStudentLabel] = useState("Student Type");
  const [studentValue, setStudentValue] = useState(0);
  const [type, setType] = useState(0);
  const [title, setTitle] = useState(0);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [cPassword, setCpassword] = useState(false);

  const [typeError, setTypeError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [passError, setPassError] = useState("");

  const [emailError, setEmailError] = useState(true);
  const { addToast } = useToasts();
  const history = useHistory();

  // useEffect(() => {
  //   get("StudentTypeDD/Index").then((res) => {
  //     setStudents(res);
  //   });

  //   get(`NameTittleDD/index`)
  //   .then(res => {
  //     setNames(res);
  //   })
  // }, []);

  const studentOptions = students?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectStudent = (label, value) => {
    setStudentLabel(label);
    setStudentValue(value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    get(`EmailCheck/Validate/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const handlePass = (e) => {
    setPassError("");
    setPassword(e.target.value);
  };
  const handlePass2 = (e) => {
    setPassError("");
    setCpassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const subData = {
      studentTypeId: type,
      NameTittleID: title,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };

    if (type == 0) {
      setTypeError("Student type is required");
    } else if (title == 0) {
      setTitleError("Name title is required");
    } else if (password.length < 6) {
      setPassError("Password length can not be less than 6 digits");
    } else if (password !== cPassword) {
      setPassError("Passwords do not match");
    } else {
      post(`Student/CreateAccount`, subData).then((res) => {
        if (res?.status == 200) {
          if (res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/");
          } else {
            setPassError(res?.data?.message);
          }
        }
      });
    }
  };

  const handleDisability = (event) => {
    setType(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <React.Fragment>
      <CardBody className="pt-1">
        <Form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-3">
              <span>Student type</span>
            </div>

            <div className="col-md-9">
              {students?.map((tt) => (
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
            <span className="text-danger">{emailError}</span>
          </FormGroup>

          <div className="row gx-0">
            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={handlePass}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  Password
                </Label>

                <span className="text-danger">{passError}</span>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handlePass2}
                  style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                  required
                />
                <div className="form-control-position"></div>
                <Label
                  style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
                >
                  Confirm Password
                </Label>
              </FormGroup>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div>
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
        <div className="d-flex justify-content-between">
          <div
            className=""
            style={{ color: "#707070", fontSize: "13px", fontWeight: "400" }}
          >
            Privacy policy
          </div>

          <div
            className=""
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
export default connect(mapStateToProps, { signupWithJWT })(StudentRegisterJWT);
