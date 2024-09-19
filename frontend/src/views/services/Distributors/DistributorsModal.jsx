import CloseIcon from "@mui/icons-material/Close";
<<<<<<< HEAD
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
=======
import { Box, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import PartnerDetailsForm from "./PartnerDetailsForm";
>>>>>>> a69d4749914421150e8b3ead0eceeb5d5cd59763

const DistributorsModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
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

        <PartnerDetailsForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Box>
    </Modal>
  );
};

export default DistributorsModal;
