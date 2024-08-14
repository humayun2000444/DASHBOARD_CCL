import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactModal({
  handleEditContact,
  handleDeleteContact,
  contact,
}) {
  const [formData, setFormData] = useState({ ...contact });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    if (action === "delete") {
      handleDeleteContact(contact.id);
    } else if (action === "submit") {
      handleEditContact(contact.id, formData);
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          border: "none",
          padding: 0,
          minWidth: "28px",
          "&:hover": {
            border: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{"Edit"}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => handleClose("delete")}
              sx={{ fontSize: "18px" }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </DialogActions>
        </div>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              margin="dense"
              id="number"
              name="id"
              label="id"
              type="text"
              fullWidth
              variant="standard"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose("submit")}
            sx={{
              backgroundColor: "#164677",
              padding: "6px 12px 4px 12px",
              color: "#fff",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: "#164677",
                color: "#fff",
              },
            }}
          >
            <span>Submit</span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
