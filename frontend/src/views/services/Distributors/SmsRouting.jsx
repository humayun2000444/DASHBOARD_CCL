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

const SmsRouting = () => {
  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            name="routeName"
            label="Router Name"
            variant="standard"
            fullWidth
            // value={routeName}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="field5"
            label="Route Address"
            variant="standard"
            fullWidth
            // value={field5}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="zone"
            label="Zone"
            variant="standard"
            fullWidth
            // value={zone}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Select Partner</InputLabel>
            {/* <Select name="idPartner" value={idPartner} onChange={handleChange}>
              {partners.map((partner) => (
                <MenuItem key={partner.idPartner} value={partner.idPartner}>
                  {partner.partnerName}
                </MenuItem>
              ))}
            </Select> */}
            <Select name="idPartner">
              <MenuItem value={1}>National</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="standard">
            <InputLabel>National Or International</InputLabel>
            <Select
              name="nationalOrInternational"
              //   value={nationalOrInternational}
              //   onChange={handleChange}
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
            // value={field4}
            // onChange={handleChange}
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
            // value={description}
            // onChange={handleChange}
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

export default SmsRouting;