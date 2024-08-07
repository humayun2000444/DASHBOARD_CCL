// import React from "react";
// import Modal from "@mui/material/Modal";
// import { TextField, Grid, Box, Typography } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
// import { Form } from "reactstrap";

// const RoutingModal = ({
//   open,
//   handleClose,
//   handleSubmit,
//   formData,
//   handleChange,
//   title,
//   buttonText,
// }) => {
//   const { prefix = "", profileName = "", ipAddress = "" } = formData || {};
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "90%",
//           maxWidth: 1000,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" component="h2">
//           {title}
//         </Typography>
//         <Form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 name="profileName"
//                 label="Profile Name"
//                 variant="standard"
//                 fullWidth
//                 value={profileName}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 name="prefix"
//                 label="Prefix"
//                 variant="standard"
//                 fullWidth
//                 value={prefix}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 name="ipAddress"
//                 label="IP Address"
//                 variant="standard"
//                 fullWidth
//                 value={ipAddress}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} className="mt-3">
//             <Grid item xs={2}>
//               <Button type="submit">{buttonText}</Button>
//             </Grid>
//           </Grid>
//         </Form>
//       </Box>
//     </Modal>
//   );
// };

// export default RoutingModal;

// /////////////////
import React from "react";
import Modal from "@mui/material/Modal";
import { TextField, Grid, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";

const RoutingModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
  const {
    prefix = "",
    profileName = "",
    ipAddress = "",
    context = "",
  } = formData || {};

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
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                name="context"
                label="Context"
                variant="standard"
                fullWidth
                value={context}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="prefix"
                label="Prefix"
                variant="standard"
                fullWidth
                value={prefix}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="profileName"
                label="Profile Name"
                variant="standard"
                fullWidth
                value={profileName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="ipAddress"
                label="IP Address"
                variant="standard"
                fullWidth
                value={ipAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button type="submit">{buttonText}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Modal>
  );
};

export default RoutingModal;
