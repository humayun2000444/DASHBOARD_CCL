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

const ManageDidPool = () => {
  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            name="Pool Name"
            label="Pool Name"
            variant="standard"
            fullWidth
            // value={routeName}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="Description"
            label="Description"
            variant="standard"
            fullWidth
            // value={field5}
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

export default ManageDidPool;
