import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { Form } from "reactstrap";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Grid, TextField } from "@mui/material";
const NewDidPoolModal = ({
  open,
  handleClose,
  title,
  formData,
  handleChangeDetail,
  handleSubmit,
}) => {
  const { name = "", description = "" } = formData || {};
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
            {title} Pool
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
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="name"
                label="Pool Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={handleChangeDetail}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="description"
                label="Description"
                variant="standard"
                fullWidth
                value={description}
                onChange={handleChangeDetail}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Modal>
  );
};

export default NewDidPoolModal;
