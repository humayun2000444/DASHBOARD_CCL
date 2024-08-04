import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

const UpdateRole = ({
  updateOpen,
  handleUpdateClose,
  style,
  handleUpdateSubmit,
  roleData,
  updateHandleChange,
  adminRole,
  setRoleData,
  permission,
}) => {
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
            Create User
          </Typography>

          <Row className="mb-4">
            <Col>
              <Form onSubmit={handleUpdateSubmit}>
                <Row className="mb-4">
                  <Col md={8}>
                    <Form.Group controlId="roleName">
                      <Form.Label>Role Name :</Form.Label>
                      <Form.Control
                        type="text"
                        name="role"
                        placeholder="Enter Role name"
                        required
                        value={roleData.name}
                        onChange={updateHandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={8}>
                    <Form.Group controlId="description">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        placeholder="Description....."
                        value={roleData.description}
                        onChange={updateHandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="mt-4" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateRole;
