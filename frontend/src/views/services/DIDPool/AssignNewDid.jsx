import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";

const didNumbersList = [
  { id: 1, number: "09646699601" },
  { id: 2, number: "09646699602" },
  { id: 3, number: "09646699603" },
  { id: 4, number: "09646699607" },
];

const AssignNewDid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDid, setSelectedDid] = useState(null);
  const [description, setDescription] = useState("");
  return (
    <Form>
      <Grid container spacing={3}>
        {/* DID Number Autocomplete */}
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={didNumbersList}
            getOptionLabel={(option) => option.number}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue); // Update the search term as user types
            }}
            onChange={(event, newValue) => {
              setSelectedDid(newValue); // Set selected DID from dropdown
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search DID Number"
                variant="standard"
                placeholder="Start typing a DID number..."
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description..."
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-3">
        <Grid item xs={12} md={6}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default AssignNewDid;
