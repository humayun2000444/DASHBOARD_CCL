import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import NidInfo from "./NidInfo";

const NidModal = ({ openNidModal, handleCloseNidModal }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={openNidModal}
      onClose={handleCloseNidModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "500" }}
        >
          Personal Details
        </Typography>
        <NidInfo />
      </Box>
    </Modal>
  );
};

export default NidModal;
