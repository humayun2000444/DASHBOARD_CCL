import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

const UserFormModal = ({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  formData,
  style,
  adminRole,
  isUpdate = false,
  passwordError,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isUpdate ? "Update User" : "Add User"}
          </Typography>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="phoneNo">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNo"
                    placeholder="Enter Phone Number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="userStatus">
                  <Form.Label>Status:</Form.Label>
                  <Form.Control
                    as="select"
                    name="userStatus"
                    value={formData.userStatus}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="roles">
                  <Form.Label>Role:</Form.Label>
                  <Select
                    defaultValue={formData.roles}
                    isMulti
                    name="roles"
                    options={adminRole}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      handleChange({
                        target: { name: "roles", value: selectedOptions },
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            {!isUpdate && ( // Render password fields only for add user modal
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
            {!isUpdate && passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
            <Button className="mt-4" variant="primary" type="submit">
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserFormModal;
