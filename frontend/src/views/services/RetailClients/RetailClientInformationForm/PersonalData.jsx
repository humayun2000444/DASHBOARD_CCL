import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const PersonalData = () => {
  return (
    <Container fluid>
      <Row className="my-3">
        <Col md={3}>
          <TextField label="First name" variant="outlined" fullWidth required />
        </Col>
        <Col md={3}>
          <TextField label="Last name" variant="outlined" fullWidth />
        </Col>
        <Col md={3}>
          <TextField label="Address" variant="outlined" fullWidth />
        </Col>
        <Col md={3}>
          <TextField label="City" variant="outlined" fullWidth />
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={3}>
          <TextField label="Zip" variant="outlined" fullWidth />
        </Col>
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select defaultValue="">{/* Add items as needed */}</Select>
          </FormControl>
        </Col>
        <Col md={3}>
          <TextField label="State" variant="outlined" fullWidth />
        </Col>
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select defaultValue="">{/* Add items as needed */}</Select>
          </FormControl>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={4}>
          <TextField label="Phone" variant="outlined" fullWidth />
        </Col>
        <Col md={4}>
          <TextField label="Mobile phone" variant="outlined" fullWidth />
        </Col>
        <Col md={4}>
          <TextField label="Email" variant="outlined" fullWidth />
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <TextField label="TAX ID" variant="outlined" fullWidth />
        </Col>
        <Col md={6}>
          <TextField label="Client number" variant="outlined" fullWidth />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Button variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalData;
