import React, { useState } from "react";
import General from "./General";
import PersonalData from "./PersonalData";
import {
  Card,
  CardBody,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const RetailClientInformationForm = () => {
  const [activetab, setActivetab] = useState("1");

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "2") {
      setActivetab(tab);
    }
    if (tab == "3") {
      setActivetab(tab);
    }
    if (tab == "4") {
      setActivetab(tab);
    }
  };
  return (
    <div>
      <Col>
        <Card>
          <CardBody>
            <Nav tabs className="row row-cols-md-3 row-cols-sm-1 text-center">
              <NavItem>
                <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                  GENERAL
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  PERSONAL DATA
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  BILLING
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  CODECS
                </NavLink>
              </NavItem>
            </Nav>

            {activetab == 1 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="1">
                  <General />
                </TabPane>
              </TabContent>
            ) : activetab == 2 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="2">
                  <PersonalData />
                </TabPane>
              </TabContent>
            ) : activetab == 3 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="3">
                  {/* <RegisteredUsers /> */}
                  {/* <UserGroup /> */}
                </TabPane>
              </TabContent>
            ) : (
              <TabContent activeTab={activetab}>
                <TabPane tabId="4"></TabPane>
              </TabContent>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default RetailClientInformationForm;
