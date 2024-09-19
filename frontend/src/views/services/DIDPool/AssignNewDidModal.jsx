import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";

// Sample list of DID numbers (can be fetched or passed via props)
const didNumbersList = [
  { id: 1, number: "09646699601" },
  { id: 2, number: "09646699602" },
  { id: 3, number: "09646699603" },
  { id: 4, number: "09646699607" },
];

const AssignNewDidModal = ({ show, handleClose, onSave }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDid, setSelectedDid] = useState(null);
  const [description, setDescription] = useState("");

  // Handle Save logic
  const handleSave = (e) => {
    e.preventDefault();
    if (selectedDid && description) {
      const newEntry = {
        assignedDid: selectedDid.number,
        description,
      };
      onSave(newEntry); // Save the DID and description
      handleClose(); // Close the modal
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="assign-did-modal-title"
      aria-describedby="assign-did-modal-description"
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
        {/* Header with title and close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3, // Add margin-bottom to ensure spacing
          }}
        >
          <Typography variant="h6" component="h2">
            Assign New DID
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

        {/* Form */}
        <form onSubmit={handleSave}>
          <Grid container spacing={3}>
            {/* DID Number Autocomplete */}
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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

          {/* Save Button */}
          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#164677",
                  "&:hover": {
                    backgroundColor: "#123a5a",
                  },
                }}
                type="submit"
                disabled={!selectedDid || !description} // Disable if no DID or description
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AssignNewDidModal;
