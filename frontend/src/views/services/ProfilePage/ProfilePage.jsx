import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardBody } from "reactstrap";
import adminDashboardServices from "../../../apiServices/AdminDashboardServices/adminDashboardServices";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem("username");
  const token = JSON.parse(localStorage.getItem("userInfo")).token;

  const fetchUserData = async () => {
    try {
      const data = await adminDashboardServices.fetchPartnerDetailsUser(token, {
        email: username,
      });
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("userData", userData);

  // Inline styles
  const sectionStyle = {
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #e3e3e3",
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "5px",
    color: "#666",
  };

  const valueStyle = {
    marginBottom: "15px",
  };

  // Return loading or error if userData is null
  if (!userData) {
    return <Typography>Loading...</Typography>; // or a spinner
  }

  // Destructure userData for easier access
  const {
    firstName,
    lastName,
    username: userUsername,
    email,
    createdOn,
    phoneNo,
    userStatus,
    authRoles,
    partner,
  } = userData;

  return (
    <div>
      <Card className="mt-2">
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Profile</h4>
          </div>

          {/* User Information */}
          <CardBody style={sectionStyle}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              User Information
            </Typography>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Name</Typography>
                <Typography style={valueStyle}>
                  {`${firstName} ${lastName}`}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Username</Typography>
                <Typography style={valueStyle}>{userUsername}</Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Email</Typography>
                <Typography style={valueStyle}>
                  {email.startsWith("mailto:")
                    ? email.slice(7)
                    : email || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Created On</Typography>
                <Typography style={valueStyle}>{createdOn || "N/A"}</Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Phone No</Typography>
                <Typography style={valueStyle}>{phoneNo || "N/A"}</Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>User Status</Typography>
                <Typography style={valueStyle}>
                  {userStatus || "N/A"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Role</Typography>
                <Typography style={valueStyle}>
                  {authRoles[0]?.name || "N/A"}{" "}
                </Typography>
              </Col>
            </Row>
          </CardBody>

          <CardBody style={sectionStyle}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Partner Information
            </Typography>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Partner Name</Typography>
                <Typography style={valueStyle}>
                  {partner.partnerName || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Invoice Address</Typography>
                <Typography style={valueStyle}>
                  {partner.invoiceAddress || "N/A"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>VAT Registration No</Typography>
                <Typography style={valueStyle}>
                  {partner.vatRegistrationNo || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Telephone</Typography>
                <Typography style={valueStyle}>
                  {partner.telephone || "N/A"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Email</Typography>
                <Typography style={valueStyle}>
                  {partner.email?.startsWith("mailto:")
                    ? partner.email.slice(7)
                    : partner.email || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>City</Typography>
                <Typography style={valueStyle}>
                  {partner.city || "N/A"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>State</Typography>
                <Typography style={valueStyle}>
                  {partner.state || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Postal Code</Typography>
                <Typography style={valueStyle}>
                  {partner.postalCode || "N/A"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Country</Typography>
                <Typography style={valueStyle}>
                  {partner.country || "N/A"}
                </Typography>
              </Col>
              <Col md={6}>
                <Typography style={labelStyle}>Customer Pre-Paid</Typography>
                <Typography style={valueStyle}>
                  {partner.customerPrePaid ? "Yes" : "No"}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Typography style={labelStyle}>Default Currency</Typography>
                <Typography style={valueStyle}>
                  {partner.defaultCurrency || "N/A"}
                </Typography>
              </Col>
            </Row>
          </CardBody>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
