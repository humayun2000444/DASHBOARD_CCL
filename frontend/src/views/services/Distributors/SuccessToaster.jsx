import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const SuccessToaster = ({ open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const vertical = "bottom";
  const horizontal = "center";

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          New Sip account added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessToaster;
