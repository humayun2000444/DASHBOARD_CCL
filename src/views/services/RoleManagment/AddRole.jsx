import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

function AddRole({
  open,
  handleChange,
  handleSubmit,
  handleClose,
  formData,
  style,
  permission,
}) {
  console.log(permission);
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
            Create Role
          </Typography>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={8}>
                <Form.Group controlId="roleName">
                  <Form.Label>Role Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter Role name"
                    required
                    value={formData.role}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="permission">
                  <Form.Label>Permission:</Form.Label>
                  <Select
                    defaultValue={[]}
                    isMulti
                    name="permission"
                    options={permission}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    // onChange={(selectedOptions) =>
                    //   setFormData((prevState) => ({
                    //     ...prevState,
                    //     roles: selectedOptions,
                    //   }))
                    // }
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
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddRole;
