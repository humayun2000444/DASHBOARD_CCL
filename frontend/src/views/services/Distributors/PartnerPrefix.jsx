import Button from "@mui/material/Button";
import React, { useState } from "react";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";
import FileUploader from "./FileUploader";
import PartnerPrefixForm from "./PartnerPrefixForm";

const PartnerPrefix = ({ setOpenToaster }) => {
  // State to store the uploaded files
  const [docFiles, setDocFiles] = useState([]);

  // Handle file upload and update state
  const handleFileUpload = (setFiles) => (files) => {
    setFiles(files);
  };

  // API call to upload the file
  const handleUploadClick = async () => {
    if (docFiles.length === 0) {
      console.error("No file selected.");
      return;
    }

    const file = docFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await retailPartnerServices.createRetailPartnerFromFile(
        formData
      );
      console.log("File uploaded successfully:", response);
      // Optionally, show a toaster message for success
      setOpenToaster(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, handle the error with toaster or other feedback
    }
  };

  return (
    <div>
      <PartnerPrefixForm setOpenToaster={setOpenToaster} />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <FileUploader
          dataType="csv"
          onFileUpload={handleFileUpload(setDocFiles)}
        />
        <Button
          variant="contained"
          type="button"
          sx={{ width: "200px", backgroundColor: "#1D94AB", marginTop: "1rem" }}
          onClick={handleUploadClick} // Call the function when button is clicked
        >
          Upload csv/excel
        </Button>
      </div>
    </div>
  );
};

export default PartnerPrefix;
