import React, { useState } from "react";
// import Button from "@mui/material/Button";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import {
  PlusOneOutlined,
  PlusOneSharp,
  SearchOutlined,
} from "@material-ui/icons";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import RegisteredUsers from "./RegisteredUsers/RegisteredUsers";
import NotVerifiedUsers from "./NotVerifiedUsers/NotVerifiedUsers";
import UserGroup from "./UserGroup/UserGroup";
const Users = () => {
  const [activetab, setActivetab] = useState("1");

  const toggle = (tab) => {
    setActivetab(tab);
    // if (tab == "1") {
    //   history.push("/addUniversityCampus");
    // }
    if (tab == "2") {
      setActivetab(tab);
      //   history.push("/addUniversityFinancial");
    }
    if (tab == "3") {
      setActivetab(tab);
      //   history.push("/addUniversityFeatures");
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
                  REGISTERD USERS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  NOT VERIFIED USERS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  USER GROP
                </NavLink>
              </NavItem>
            </Nav>

            {activetab == 1 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="1">
                  <RegisteredUsers />
                </TabPane>
              </TabContent>
            ) : activetab == 2 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="2">
                  <NotVerifiedUsers />
                </TabPane>
              </TabContent>
            ) : activetab == 3 ? (
              <TabContent activeTab={activetab}>
                <TabPane tabId="3">
                  {/* <RegisteredUsers /> */}
                  <UserGroup />
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

export default Users;
