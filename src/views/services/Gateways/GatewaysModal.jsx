import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

const GatewaysModal = ({
  editMode,
  handleCloseModal,
  handleSubmit,
  handleChange,
  formData,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={editMode.isOpen}
        onClose={handleCloseModal}
        formData={formData}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editMode.type === "UPDATE" ? "Update Gateways" : "Add Gateways"}
          </Typography>

          <Form onSubmit={(e) => handleSubmit(e, editMode.type)}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ipNumber">
                  <Form.Label>Ip Number:</Form.Label>
                  <Form.Control
                    type="text"
                    name="ipNumber"
                    placeholder="Enter ip number"
                    value={formData.ipNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="callLimit">
                  <Form.Label>Call Limit:</Form.Label>
                  <Form.Control
                    type="text"
                    name="callLimit"
                    placeholder="Enter call limit"
                    value={formData.callLimit}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tariff">
                  <Form.Label>Tariff:</Form.Label>
                  <Form.Control
                    type="text"
                    name="tariff"
                    placeholder="Enter tariff"
                    value={formData.tariff}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status:</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-4" variant="primary" type="submit">
              {editMode.type === "UPDATE" ? "Update" : "Submit"}
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default GatewaysModal;
