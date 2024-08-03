import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

const UpdateUserModal = ({
  updateOpen,
  handleUpdateClose,
  style,
  handleUpdateSubmit,
  userData,
  updateHandleChange,
  adminRole,
  setUserData,
}) => {
  console.log(userData.roles);
  return (
    <div>
      <Modal
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User
          </Typography>

          <Form onSubmit={(e) => handleUpdateSubmit(e, userData.id)}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={userData.firstName}
                    onChange={updateHandleChange}
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
                    value={userData.lastName}
                    onChange={updateHandleChange}
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
                    value={userData.phoneNo}
                    onChange={updateHandleChange}
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
                    value={userData.email}
                    onChange={updateHandleChange}
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
                    value={userData.userStatus}
                    onChange={updateHandleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                  {/* <Select
                    defaultValue={[]}
                    name="status"
                    options={status}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        roles: selectedOptions,
                      }))
                    }
                  /> */}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="roles">
                  <Form.Label>Role:</Form.Label>
                  <Select
                    defaultValue={userData.roles.map((role) => ({
                      value: role.name,
                      label: role.name,
                    }))}
                    isMulti
                    name="roles"
                    options={adminRole}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        roles: selectedOptions,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button className="mt-4" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
