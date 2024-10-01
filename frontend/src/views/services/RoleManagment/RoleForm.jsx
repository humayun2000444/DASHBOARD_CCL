import React from "react";

import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const RoleForm = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
  const { role = "", description = "" } = formData || {};
  return (
    <div>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
              <IconButton
                onClick={handleClose}
                style={{
                  transition: "color 0.3s ease",
                  color: "inherit",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "red")}
                onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="role"
                    label="Role Name"
                    variant="standard"
                    fullWidth
                    value={role}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="description"
                    label="Description"
                    variant="standard"
                    fullWidth
                    value={description}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} className="mt-3">
                <Grid item xs={6}>
                  <Button type="submit">{buttonText}</Button>
                </Grid>
              </Grid>
            </Form>

            {/* <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
                <Col md={8}>
                  <Form.Group controlId="roleName">
                    <Form.Label>Role Name :</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      placeholder="Enter Role name"
                      required
                      value={role}
                      onChange={handleChange}
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
                      value={description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button className="mt-4" variant="primary" type="submit">
                {buttonText}
              </Button>
            </Form> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default RoleForm;
