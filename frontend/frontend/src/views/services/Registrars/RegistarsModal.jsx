import React from "react";

import Modal from "@mui/material/Modal";
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const RegistarsModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            maxWidth: 1000,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>

          {/* <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={8}>
                <Form.Group controlId="permissionName">
                  <Form.Label>Permission Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="permission"
                    placeholder="Enter Permission name"
                    required
                    value={permission}
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

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField label="Prefix" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Route type"
                variant="standard"
                select
                fullWidth
                defaultValue="External gateway"
              >
                <MenuItem value="External gateway">External gateway</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Route" variant="standard" fullWidth />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12} md={2}>
              <TextField
                label="Priority"
                type="number"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Balance share"
                type="number"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="From day"
                variant="standard"
                select
                fullWidth
                defaultValue="Sunday"
              >
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                {/* Add other days here */}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="From hour"
                type="time"
                variant="standard"
                fullWidth
                defaultValue="00:00"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="To day"
                variant="standard"
                select
                fullWidth
                defaultValue="Saturday"
              >
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
                {/* Add other days here */}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="To hour"
                type="time"
                variant="standard"
                fullWidth
                defaultValue="00:00"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Proxy"
                variant="standard"
                select
                fullWidth
                defaultValue="Signalling and media proxy"
              >
                <MenuItem value="Signalling and media proxy">
                  Signalling and media proxy
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12} md={4}>
              <TextField
                label="Special properties"
                variant="standard"
                select
                fullWidth
                defaultValue="None"
              >
                <MenuItem value="None">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Calls limit"
                type="number"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Do not jump"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Disable answering rules"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12} md={4}>
              <TextField
                label="Display name prefix"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Caller ID prefix"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Destination number prefix"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12} md={6}>
              <TextField
                label="CONTACT From prefix"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Skip overriding 'From' header"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12}>
              <TextField
                label="Advanced header manipulation"
                variant="standard"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button>{buttonText}</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default RegistarsModal;
