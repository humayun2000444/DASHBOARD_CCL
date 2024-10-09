import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";

const PartnerPrefixForm = ({ setOpenToaster }) => {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      // Sort partners by name in ascending order
      const sortedPartners = data.sort((a, b) =>
        a.partnerName.localeCompare(b.partnerName)
      );
      setPartners(sortedPartners);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Initialize form with default values
  const defaultValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    idPartner: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    watch, // Watch for password changes
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // Get the password field value to compare with confirmPassword
  const passwordValue = watch("password");

  const onSubmit = (data) => {
    retailPartnerServices.createRetailPartner({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      idpartner: data.idPartner,
    });
    setOpenToaster(true);
    console.log({ ...data });
    // setAllPartnerPrefixes((prev) => [...prev, data]);
    reset(); // Reset form fields after submission
  };

  // Conditional styling for validation errors
  const getTextFieldStyles = (name) => {
    return {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: errors[name] ? "red" : undefined,
        },
        "&:hover fieldset": {
          borderColor: errors[name] ? "red" : undefined,
        },
        "&.Mui-focused fieldset": {
          borderColor: errors[name] ? "red" : undefined,
        },
      },
    };
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
      >
        <div>
          <div className="d-flex" style={{ gap: "10px", marginBottom: "1rem" }}>
            {/* First Name Field with Validation */}
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="First name"
                  sx={{ width: "100%", ...getTextFieldStyles("firstName") }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            {/* Last Name Field without Validation */}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="Last name"
                  sx={{ width: "100%", ...getTextFieldStyles("lastName") }}
                  error={!!errors.lastName}
                />
              )}
            />
            <Controller
              name="userName"
              control={control}
              rules={{
                required: "User name is required",
                pattern: {
                  value: /^\d+$/, // Only allow digits
                  message: "User name must be numeric", // Error message
                },
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="User name"
                  sx={{ width: "100%", ...getTextFieldStyles("userName") }}
                  error={!!errors.userName}
                  helperText={errors.userName ? errors.userName.message : ""}
                />
              )}
            />
          </div>
          <div className="d-flex" style={{ gap: "10px" }}>
            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  type="password"
                  {...field}
                  label="Password"
                  sx={{ width: "100%", ...getTextFieldStyles("password") }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            {/* Confirm Password Field with Matching Validation */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  type="password"
                  {...field}
                  label="Confirm Password"
                  sx={{
                    width: "100%",
                    ...getTextFieldStyles("confirmPassword"),
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />

            {/* Select Partner with Validation */}
            <Controller
              name="idPartner"
              control={control}
              rules={{ required: "Partner selection is required" }}
              render={({ field }) => (
                <Autocomplete
                  options={partners}
                  getOptionLabel={(partner) => partner.partnerName}
                  value={
                    partners.find(
                      (partner) => partner.idPartner === field.value
                    ) || null
                  }
                  onChange={(event, value) => field.onChange(value?.idPartner)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Partner"
                      variant="standard"
                      fullWidth
                      error={!!errors.idPartner}
                      sx={{ width: "37ch" }}
                      helperText={errors.idPartner && "Partner is required"}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          style={{
            backgroundColor: "#1D94AB",
            marginTop: "1rem",
            border: "none",
            outline: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            color: "#fff",
            width: "100px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PartnerPrefixForm;
