import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function ContactModal({
  handleEditContact,
  handleDeleteContact,
  handleAddContact,
  contact,
  type,
}) {
  const [formData, setFormData] = useState({ ...contact });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (type) => {
    if (type === "Edit") {
      handleEditContact(contact.id, formData);
    } else {
      handleAddContact(formData);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    handleDeleteContact(contact.id);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
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
        {type === "Add" ? (
          <i class="fa-solid fa-user-plus"></i>
        ) : (
          <i className="fa-regular fa-pen-to-square"></i>
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-contact-modal"
        aria-describedby="edit-contact-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: 0,
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 id="edit-contact-modal">{type === "Edit" ? "Edit" : "Add"}</h2>
            {type === "Edit" && (
              <Button sx={{ fontSize: "18px" }} onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            )}
          </div>
          <div>
            <TextField
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => handleSubmit(type)}
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
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
