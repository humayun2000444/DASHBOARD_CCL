import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const DidPoolModal = ({ show, handleClose, poolData, onSave }) => {
  const [poolName, setPoolName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (poolData) {
      setPoolName(poolData.poolName);
      setDescription(poolData.description);
    } else {
      // Reset form for new entries
      setPoolName("");
      setDescription("");
    }
  }, [poolData]);

  const handleSave = (e) => {
    e.preventDefault();
    if (poolName && description) {
      const newPool = {
        poolName,
        description,
      };
      onSave(newPool); // Save the pool data
      handleClose(); // Close the modal
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="did-pool-modal-title"
      aria-describedby="did-pool-modal-description"
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
            {poolData ? "Edit DID Pool" : "Add DID Pool"}
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
            {/* Pool Name */}
            <Grid item xs={12}>
              <TextField
                label="Pool Name"
                variant="standard"
                fullWidth
                value={poolName}
                onChange={(e) => setPoolName(e.target.value)}
                placeholder="Enter pool name..."
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
                placeholder="Enter description..."
              />
            </Grid>
          </Grid>

          {/* Save Button */}
          <Grid container spacing={3} className="mt-3">
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1D94AB",
                  "&:hover": {
                    backgroundColor: "#123a5a",
                  },
                }}
                type="submit"
                disabled={!poolName || !description} // Disable if no pool name or description
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

export default DidPoolModal;
