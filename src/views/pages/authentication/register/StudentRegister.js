import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import RegisterFirebase from "./RegisterFirebase";
import RegisterAuth0 from "./RegisterAuth0";
import StudentRegisterJWT from "./StudentRegisterJWT";
import registerImg from "../../../../assets/img/pages/register.jpg";
import "../../../../assets/scss/pages/authentication.scss";
import LoginNavbar from "../login/LoginNavbar";
import UappLogo from "../../../../assets/img/Asset 12Icon.svg";
import Lgimage from "../../../../assets/img/Asset 12Icon.svg";
import Footer from "../../../../layouts/components/footer/Footer";
import Studentregister from "../../../../assets/img/Studentregister.png";

class Register extends React.Component {
  state = {
    activeTab: "1",
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  render() {
    return (
      <div className="top-style">
        <div className="" style={{ backgroundColor: "#fff" }}>
          <div className="responsive-top">
            <Row className="m-0 ">
              <Col
                lg="6"
                md="6"
                className=" px-1 py-0 hide-responsive-left-side"
              >
                <div className="flexbox-container student-register-img">
                  <div>
                    <img src={UappLogo} className="w-50 mt-5" />
                  </div>
                </div>
              </Col>
              
              <Col lg="6" md="6">
                <div className=" my-md-5 ml-md-4">
                  <h4
                    className=""
                    style={{
                      color: "#111111",
                      fontSize: "38px",
                      fontWeight: "500",
                    }}
                  >
                    Become a Student
                  </h4>
                  <span
                    style={{
                      color: "#7f7f7f",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Apply to Multiple Universities
                  </span>
                </div>

                <div className="col-right">
                  <div className="text-center hide-responsive-right-side">
                    <img src={UappLogo} className="w-50" />
                  </div>
                  <div
                    className="flexbox-container2"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <StudentRegisterJWT />
                  </div>
                </div>

                
              </Col>
            </Row>
          </div>
          
        </div>

        {/* <Footer></Footer> */}
      </div>
    );
  }
}
export default Register;
