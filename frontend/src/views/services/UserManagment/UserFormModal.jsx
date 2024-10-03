import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Autocomplete from "@mui/material/Autocomplete";

const UserFormModal = ({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  formData,
  style,
  adminRole,
  partners,
  isUpdate = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone Number is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.userStatus) {
      newErrors.userStatus = "Status is required";
    }
    if (!formData.authRoles || formData.authRoles.length === 0) {
      newErrors.authRoles = "Role is required";
    }
    if (!formData.partnerId) {
      newErrors.partnerId = "Partner is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    handleChange(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit(event);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {isUpdate ? "Update User" : "Add User"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                fullWidth
                value={formData.firstName}
                onChange={handleFieldChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                fullWidth
                value={formData.lastName}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phoneNo"
                label="Phone Number"
                variant="standard"
                fullWidth
                value={formData.phoneNo}
                onChange={handleFieldChange}
                error={!!errors.phoneNo}
                helperText={errors.phoneNo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                value={formData.email}
                onChange={handleFieldChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            {/* Status Field */}
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
                variant="standard"
                error={!!errors.userStatus}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  name="userStatus"
                  value={formData.userStatus}
                  onChange={handleFieldChange}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
                </Select>
                {errors.userStatus && (
                  <Typography variant="body2" color="error">
                    {errors.userStatus}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Role Field */}
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
                variant="standard"
                error={!!errors.authRoles}
              >
                <InputLabel>Role</InputLabel>
                <Select
                  name="authRoles"
                  multiple
                  value={formData.authRoles.map((role) => role.name)}
                  onChange={(event) =>
                    handleFieldChange({
                      target: {
                        name: "authRoles",
                        value: event.target.value.map((roleName) => ({
                          name: roleName,
                        })),
                      },
                    })
                  }
                >
                  {adminRole.map((role) => (
                    <MenuItem key={role.name} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.authRoles && (
                  <Typography variant="body2" color="error">
                    {errors.authRoles}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={[...partners].sort((a, b) =>
                  a.partnerName.localeCompare(b.partnerName)
                )}
                getOptionLabel={(option) => option.partnerName}
                value={
                  partners.find((p) => p.idPartner === formData.partnerId) ||
                  null
                }
                onChange={(event, newValue) => {
                  handleFieldChange({
                    target: {
                      name: "partnerId",
                      value: newValue?.idPartner || "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Partner"
                    variant="standard"
                    error={!!errors.partnerId}
                    helperText={errors.partnerId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                fullWidth
                value={formData.password}
                onChange={handleFieldChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="standard"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleFieldChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

export default UserFormModal;
