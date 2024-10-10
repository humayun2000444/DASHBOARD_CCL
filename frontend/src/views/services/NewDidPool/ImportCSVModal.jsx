import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";
import FileUploader from "../Distributors/FileUploader.jsx";
import DidPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";

const ImportCSVModal = ({ open, handleClose, setModalOpen }) => {
  // State to store the uploaded files
  const [docFiles, setDocFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle file upload and update state
  const handleFileUpload = (setFiles) => (files) => {
    setFiles(files);
  };

  const handleUploadClick = async () => {
    if (docFiles.length === 0) {
      console.error("No file selected.");
      return;
    }

    setIsSubmitted(!isSubmitted);

    const file = docFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await DidPoolServices.importDidPoolFromFile(
        formData
      );
      // Optionally, show a toaster message for success
      toast.success("File uploaded successfully!");
      setModalOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, handle the error with toaster or other feedback
    }
  };
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="h2">
            Import CSV/Excel Files
          </Typography>
          <IconButton
            onClick={handleClose}
            style={{
              transition: "color 0.3s ease",
              color: "inherit",
              position: "relative",
              right: "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "red")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <FileUploader
          dataType="csv"
          onFileUpload={handleFileUpload(setDocFiles)}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
        <button
          style={{
            backgroundColor: "#1D94AB",
            marginTop: "1rem",
            border: "none",
            outline: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            color: "#fff",
          }}
          onClick={handleUploadClick}
        >
          Upload csv/excel
        </button>
      </Box>
    </Modal>
  );
};

export default ImportCSVModal;
