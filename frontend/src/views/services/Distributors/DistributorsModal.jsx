import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";

const DistributorsModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
  const {
    partnerName = "",
    telephone = "",
    email = "",
    address1 = "",
    address2 = "",
    city = "",
    state = "",
    postalCode = "",
    country = "",
    alternateNameInvoice = "",
    alternateNameOther = "",
    vatRegistrationNo = "",
    invoiceAddress = "",
    customerPrePaid = "",
    partnerType = "",
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
        {/* <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                name="partnerName"
                label="Partner Name"
                variant="standard"
                fullWidth
                value={context}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                // value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="telephone"
                label="Telephone"
                variant="standard"
                fullWidth
                // value={telephone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="ipAddress"
                label="IP Address"
                variant="standard"
                fullWidth
                value={ipAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-1">
            <Grid item xs={12} md={3}>
              <TextField
                name="context"
                label="Context"
                variant="standard"
                fullWidth
                value={context}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="prefix"
                label="Prefix"
                variant="standard"
                fullWidth
                value={prefix}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="profileName"
                label="Profile Name"
                variant="standard"
                fullWidth
                value={profileName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="ipAddress"
                label="IP Address"
                variant="standard"
                fullWidth
                value={ipAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-1">
            <Grid item xs={12} md={3}>
              <TextField
                name="context"
                label="Context"
                variant="standard"
                fullWidth
                value={context}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="prefix"
                label="Prefix"
                variant="standard"
                fullWidth
                value={prefix}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="profileName"
                label="Profile Name"
                variant="standard"
                fullWidth
                value={profileName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="ipAddress"
                label="IP Address"
                variant="standard"
                fullWidth
                value={ipAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-1">
            <Grid item xs={12} md={3}>
              <TextField
                name="context"
                label="Context"
                variant="standard"
                fullWidth
                value={context}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="prefix"
                label="Prefix"
                variant="standard"
                fullWidth
                value={prefix}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="profileName"
                label="Profile Name"
                variant="standard"
                fullWidth
                value={profileName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="ipAddress"
                label="IP Address"
                variant="standard"
                fullWidth
                value={ipAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button type="submit">{buttonText}</Button>
            </Grid>
          </Grid>
        </Form> */}

        {/*  */}
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                name="partnerName"
                label="Partner Name"
                variant="standard"
                fullWidth
                value={partnerName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="telephone"
                label="Telephone"
                variant="standard"
                fullWidth
                value={telephone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="address1"
                label="Address 1"
                variant="standard"
                fullWidth
                value={address1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="address2"
                label="Address 2"
                variant="standard"
                fullWidth
                value={address2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="city"
                label="City"
                variant="standard"
                fullWidth
                value={city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="state"
                label="State"
                variant="standard"
                fullWidth
                value={state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="postalCode"
                label="Postal Code"
                variant="standard"
                fullWidth
                value={postalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="country"
                label="Country"
                variant="standard"
                fullWidth
                value={country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="alternateNameOther"
                label="Invoice Address (Other)"
                variant="standard"
                fullWidth
                value={alternateNameOther}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="alternateNameInvoice"
                label="Alternate Name (Invoice)"
                variant="standard"
                fullWidth
                value={alternateNameInvoice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="vatRegistrationNo"
                label="VAT Registration No"
                variant="standard"
                fullWidth
                value={vatRegistrationNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Pre/Post Paid</InputLabel>
                <Select
                  name="customerPrePaid"
                  value={customerPrePaid}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Prepaid</MenuItem>
                  <MenuItem value={2}>Postpaid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Partner Type</InputLabel>
                <Select
                  name="partnerType"
                  value={partnerType}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>IOS</MenuItem>
                  <MenuItem value={2}>ANS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="invoiceAddress"
                label="Invoice Address"
                variant="standard"
                fullWidth
                value={invoiceAddress}
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

export default DistributorsModal;
