import React from "react";
import { Col, Row } from "reactstrap";
import CCl_Logo from "../../../../assets/img/CCL_Logo.png";
import "../../../../assets/scss/pages/authentication.scss";
import BTRCLoginJWT from "./BTRCLoginJWT";

class BTRCLogin extends React.Component {
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
        <div className="loginPage">
          <div>
            <Row className="m-0">

              <Col
                className="login-img py-0"
              >
                <div className="flexbox-container">
                  <div className="site__logo">
                    <img src={CCl_Logo} className="w-50" alt="site-logo" />
                  </div>
                </div>
              </Col>

              <Col className="loginRight">
                <div>
                  <div>
                    <h4
                      className=""
                      style={{
                        color: "#111111",
                        fontSize: "38px",
                        fontWeight: "700",
                      }}
                    >
                      Welcome
                    </h4>
                    <span
                      style={{
                        color: "#333",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Enter your email and Password to login for BTRC monitoring
                      dashboard
                    </span>
                  </div>

                  <div>
                    <div className="flexbox-container2">
                      <BTRCLoginJWT />
                    </div>
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
export default BTRCLogin;
