import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { CardBody, Form, FormGroup, Input } from "reactstrap";
import { history } from "../../../../history";
import Calls from "../../../dashboard/WebRtc/Calls";

import config from "../../../../configs/config.json";

const { root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    error: "",
    emailerror: "",
    passwordError: "",
    canNavigate: true,
    progress: false,
    IpAddress: "",
    GeoLocationInfo: "",
  };

  antIcon = (
    <LoadingOutlined
      style={{ fontSize: 35, color: "white", fontWeight: "bold" }}
      spin
    />
  );

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ progress: true });

    const userDetails = {
      email: this.state.email,
      password: this.state.password,
    };

    // Determine the correct URL based on the input
    const url = /^\d+$/.test(this.state.email)
      ? `${rootUrl}auth/webrtc/login`
      : `${rootUrl}auth/login`;

    if (localStorage.getItem("userInfo") == null) {
      axios
        .post(url, userDetails)
        .then((response) => {
          console.log("Response:", response.data);

          localStorage.setItem("userInfo", JSON.stringify(response.data));
          localStorage.setItem("username", userDetails.email);
          localStorage.setItem("password", userDetails.password);

          // After successful login, register with WebSocket
          // this.webSocketClient = new WebSocketClient(
          //   // "wss://103.95.96.100:3000/",
          //   "wss://pbx.cosmocom.net:3000/",
          //   this.handleWebSocketMessage,
          //   "janus-protocol"
          // );
          // this.webSocketClient.connect(userDetails.email, userDetails.password);

          window.location.reload();
          history.push(Calls); // Navigate to the Calls page
        })
        .catch((error) => {
          console.error("Error:", error.message);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            window.alert(error.response.data.message);
          } else {
            window.alert("An error occurred while processing your request.");
          }
          this.setState({ progress: false });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CardBody className="p-0">
          <Form
            action="/"
            onSubmit={this.handleLogin}
            className=""
            style={{ marginTop: "30px" }}
          >
            <FormGroup className="form-label-group has-icon-left">
              <p style={{ fontSize: "18px", color: "#333" }}>Email Address</p>
              <Input
                type="text"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(e) =>
                  this.setState({ email: e.target.value, emailerror: "" })
                }
                style={{
                  height: "52px",
                  background: "#e6e6e6",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                required
              />
            </FormGroup>
            <FormGroup
              className="form-label-group has-icon-left"
              style={{ marginTop: "30px" }}
            >
              <p style={{ fontSize: "18px", color: "#333" }}>Password</p>
              <Input
                type="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(e) =>
                  this.setState({ password: e.target.value, passwordError: "" })
                }
                style={{
                  height: "52px",
                  background: "#e6e6e6",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                required
              />
            </FormGroup>
            <div className="text-danger">
              <span>{this.state.error}</span>
            </div>
            <div className="row d-flex justify-content-space-between">
              <div className="col-md-6">
                <div>
                  <button className="login-btn-style" type="submit">
                    {this?.state?.progress ? (
                      <Spin indicator={this.antIcon} />
                    ) : (
                      "Login Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>
          <br />
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};

export default connect(mapStateToProps)(Login);
