import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility"; // Import for showing password
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Import for hiding password
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";

const RetailPartnerModal = ({
  show,
  handleClose,
  formData,
  setModalOpen,
  fetchRetailPartners,
}) => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      firstName: formData?.firstName || "",
      lastName: formData?.lastName || "",
      userName: formData?.userName || "",
      password: formData?.password || "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  useEffect(() => {
    if (formData) {
      setValue("firstName", formData.firstName);
      setValue("lastName", formData.lastName);
      setValue("userName", formData.userName);
      setValue("password", formData.password);
      setValue("confirmPassword", "");
    }
  }, [formData, setValue]);

  const onFormSubmit = async (data) => {
    try {
      await retailPartnerServices.updateRetailPartner({
        id: formData.id,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: formData.userName, // Retain the original username
        password: data.password,
      });

      await fetchRetailPartners();

      reset({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });

      setModalOpen(false);
    } catch (error) {
      console.error("Error updating retail partner:", error);
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="retail-partner-modal-title"
      aria-describedby="retail-partner-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
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
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: "1rem" }}
          >
            Update Retail Partner
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

        <form onSubmit={onSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                variant="standard"
                fullWidth
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                variant="standard"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                variant="standard"
                fullWidth
                {...register("userName", {
                  required: "Username is required",
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                disabled // Username is disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                variant="standard"
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle between text and password
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                variant="standard"
                fullWidth
                type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Grid item xs={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1D94AB",
                  "&:hover": {
                    backgroundColor: "#123a5a",
                  },
                }}
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default RetailPartnerModal;
