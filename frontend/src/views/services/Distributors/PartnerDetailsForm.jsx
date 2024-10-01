import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";

const PartnerDetailsForm = ({ formData, handleSubmit, handleChange }) => {
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
              <MenuItem value={1}>ICX</MenuItem>
              <MenuItem value={2}>SIP</MenuItem>
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
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default PartnerDetailsForm;
