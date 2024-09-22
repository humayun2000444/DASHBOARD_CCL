import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const PartnerPrefixForm = ({ setAllPartnerPrefixes }) => {
  // Initialize form with default values
  const defaultValues = {
    partnerName: "",
    priority: "",
    DIDNo: "",
  };

  const {
    handleSubmit,
    control,
    reset, // Added reset
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    setAllPartnerPrefixes((prev) => {
      return [...prev, data];
    });
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
    >
      <div className="d-flex" style={{ gap: "10px" }}>
        {/* Partner Name Field with Validation */}
        <Controller
          name="partnerName"
          control={control}
          rules={{ required: "Partner name is required" }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Partner name"
              sx={{ width: "100%", ...getTextFieldStyles("partnerName") }}
              error={!!errors.partnerName}
            />
          )}
        />

        {/* Priority Field with Validation */}
        <Controller
          name="priority"
          control={control}
          rules={{ required: "Priority is required" }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Priority"
              sx={{ width: "100%", ...getTextFieldStyles("priority") }}
              error={!!errors.priority}
            />
          )}
        />

        {/* DIDNo Field with Validation */}
        <Controller
          name="DIDNo"
          control={control}
          rules={{ required: "DID number is required" }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="DID number"
              sx={{ width: "100%", ...getTextFieldStyles("DIDNo") }}
              error={!!errors.DIDNo}
            />
          )}
        />
      </div>
      {/* Submit Button */}
      <Button
        variant="contained"
        type="submit"
        sx={{ width: "130px", backgroundColor: "#1D94AB" }}
      >
        Add Prefix
      </Button>
    </form>
  );
};

export default PartnerPrefixForm;
