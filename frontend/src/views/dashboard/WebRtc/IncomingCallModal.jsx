import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Avatar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Call, CallEnd, Close } from "@mui/icons-material";

function IncomingCallModal({ open, onClose, onAccept, caller }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "black",
          width: 320,
          borderRadius: 3,
          color: "white",
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
        }}
      >
        <Close />
      </IconButton>

      {/* Modal content */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 16px",
        }}
      >
        {/* Caller Avatar */}
        <Avatar
          src={caller.image}
          alt={caller.name}
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            border: "3px solid gray",
          }}
        />

        {/* Caller Name */}
        <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
          {caller.name} is calling you
        </Typography>
        <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
          {caller.number}
        </Typography>
        {/* End-to-end encrypted */}
        <Typography variant="body2" sx={{ color: "grey" }}>
          End-to-end encrypted
        </Typography>
      </DialogContent>

      {/* Decline and Accept Buttons */}
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<CallEnd />}
          onClick={onClose}
          sx={{ width: "120px" }}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Call />}
          onClick={onAccept}
          sx={{ width: "120px" }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncomingCallModal;
