import React from "react";
import Modal from "@mui/material/Modal";
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
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";

const SmsRoutingModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
  partners,
}) => {
  const {
    routeName = "",
    description = "",
    field5 = "",
    zone = "",
    nationalOrInternational = "",
    field4 = "",
    idPartner = "",
  } = formData || {};
  return (
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
          maxWidth: 1000,
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
            <Grid item xs={12} md={3}>
              <TextField
                name="routeName"
                label="Router Name"
                variant="standard"
                fullWidth
                value={routeName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="field5"
                label="Route Address"
                variant="standard"
                fullWidth
                value={field5}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="zone"
                label="Zone"
                variant="standard"
                fullWidth
                value={zone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Select Partner</InputLabel>
                <Select
                  name="idPartner"
                  value={idPartner}
                  onChange={handleChange}
                >
                  {partners.map((partner) => (
                    <MenuItem key={partner.idPartner} value={partner.idPartner}>
                      {partner.partnerName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel>National Or International</InputLabel>
                <Select
                  name="nationalOrInternational"
                  value={nationalOrInternational}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>National</MenuItem>
                  <MenuItem value={2}>International</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="field4"
                label="Channel"
                variant="standard"
                fullWidth
                value={field4}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="description"
                label="Description"
                variant="standard"
                fullWidth
                multiline
                rows={1}
                value={description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button type="submit">{buttonText}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Modal>
  );
};

export default SmsRoutingModal;