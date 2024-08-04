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
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";

const ProviderRegisterJWT = () => {
  const [type, setType] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();
  const [types, setTypes] = useState(0);
  const [typeError, setTypeError] = useState(false);
  const [name, setName] = useState("");
  // const [email,setEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // useEffect(()=>{

  //   get(`ProviderTypeDD/Index`)
  //   .then(res =>{
  //     setType(res);
  //   })

  // },[])

  const handleEmail = (e) => {
    setAdminEmail(e.target.value);
    get(`EmailCheck/Validate/${e.target.value}`).then((res) => {});
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const subData = {
      ProviderTypeId: types,
      Providername: name,
      Email: adminEmail,
      Password: pass,
      ProviderAdminFirstName: firstName,
      ProviderAdminLastName: lastName,
    };

    if (types == 0) {
      setTypeError("Provider type is required");
    } else if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else if (pass !== cPass) {
      setError("Passwords do not match");
    } else {
      post(`Provider/CreateAccount`, subData).then((res) => {
        if (res?.status == 200) {
          if (res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/`);
          } else {
            setError(res?.data?.message);
          }
        }
      });
    }
  };

  return (
    <React.Fragment>
      <CardBody>
        <Form className="mt-2" onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-3">
              <span>Provider Type</span>
            </div>

            <div className="col-md-9">
              {type?.map((tt) => (
                <>
                  <input
                    type="radio"
                    name="studentTypeId"
                    id="studentTypeId"
                    value={tt?.id}
                    onClick={() => {
                      setTypes(tt?.id);
                      setTypeError("");
                    }}
                  />

                  <label
                    className="mr-3"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    {tt?.name}
                  </label>
                </>
              ))}

              <span className="text-danger">{typeError}</span>
            </div>
          </div>

          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginTop: "20px" }}
          >
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              required
            />

            <Label
              style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
            >
              Name
            </Label>
          </FormGroup>

          <div className="mt-3">
            <h4
              className=""
              style={{
                color: "#111111",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Provider Admin Login Details
            </h4>
          </div>

          <div className="row">
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

            <Label
              style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
            >
              Email
            </Label>
          </FormGroup>

          <div className="row">
            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
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

            <div className="col-md-6">
              <FormGroup
                className="form-label-group position-relative has-icon-left"
                style={{ marginTop: "20px" }}
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setCPass(e.target.value)}
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
export default connect(mapStateToProps, { signupWithJWT })(ProviderRegisterJWT);
