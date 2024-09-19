import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

const RetailPartnerModal = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
}) => {
  const {
    firstName = "",
    lastName = "",
    username = "",
    password = "",
    partnerName = "",
  } = formData || {};

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="retail-partner-modal-title"
      aria-describedby="retail-partner-modal-description"
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
            {formData.id ? "Update Retail Partner" : "Add Retail Partner"}
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                variant="standard"
                fullWidth
                value={firstName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="lastName"
                variant="standard"
                fullWidth
                value={lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                name="username"
                variant="standard"
                fullWidth
                value={username}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                variant="standard"
                fullWidth
                type="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Partner Name"
                name="partnerName"
                variant="standard"
                fullWidth
                value={partnerName}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

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
              >
                {formData.id ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default RetailPartnerModal;
