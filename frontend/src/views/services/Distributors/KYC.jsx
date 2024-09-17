import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FileUploader from "./FileUploader";

const KYC = () => {
  // Initialize form with default values
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: null,
    gender: "",
    country: "",
    documentType: "",
    cardNumber: "",
    cardExpiryDate: null,
  };

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <Controller
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="First Name"
              sx={{ width: "100%", ...getTextFieldStyles("firstName") }}
              error={!!errors.firstName}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Last Name - Surname"
              sx={{ width: "100%", ...getTextFieldStyles("lastName") }}
              error={!!errors.lastName}
            />
          )}
        />
      </div>
      <div className="d-flex" style={{ gap: "10px" }}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            },
          }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Email"
              sx={{ width: "100%", ...getTextFieldStyles("email") }}
              error={!!errors.email}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Phone Number"
              sx={{ width: "100%", ...getTextFieldStyles("phoneNumber") }}
              error={!!errors.phoneNumber}
            />
          )}
        />
      </div>
      <div className="d-flex" style={{ gap: "10px" }}>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: "0", overflow: "none" }}
            >
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    label="Birth Date"
                    slotProps={{ textField: { variant: "filled" } }}
                    {...field}
                    error={!!errors.birthDate}
                    sx={{
                      "& .MuiInputBase-root": {
                        background: "none",
                      },
                      "&:hover & .MuiInputBase-root": {
                        background: "none",
                      },
                      "& .MuiInputBase-root.MuiFilledInput-root::before": {
                        borderColor: errors["birthDate"] ? "red" : undefined,
                      },
                    }}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style={{ marginTop: "8px" }}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="standard"
                {...field}
                select
                label="Gender"
                sx={{ width: "27ch", ...getTextFieldStyles("gender") }}
                error={!!errors.gender}
              >
                {[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <div style={{ marginTop: "8px" }}>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="standard"
                {...field}
                select
                label="Country"
                sx={{ width: "35ch", ...getTextFieldStyles("country") }}
                error={!!errors.country}
              >
                {[
                  { value: "Bangladesh", label: "Bangladesh" },
                  { value: "USA", label: "USA" },
                  { value: "Canada", label: "Canada" },
                  { value: "UK", label: "UK" },
                  { value: "Australia", label: "Australia" },
                  { value: "India", label: "India" },
                  { value: "Germany", label: "Germany" },
                  { value: "France", label: "France" },
                  { value: "Japan", label: "Japan" },
                  { value: "Brazil", label: "Brazil" },
                  { value: "China", label: "China" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div style={{ marginTop: "8px" }}>
          <Controller
            name="documentType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="standard"
                {...field}
                select
                label="Document Type"
                sx={{ width: "30ch", ...getTextFieldStyles("documentType") }}
                error={!!errors.documentType}
              >
                {[
                  { value: "Identity Card", label: "Identity Card" },
                  { value: "Passport", label: "Passport" },
                  { value: "Driving License", label: "Driving License" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <div style={{ marginTop: "8px" }}>
          <Controller
            name="cardNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="standard"
                {...field}
                label="Card Number"
                sx={{ width: "30ch", ...getTextFieldStyles("cardNumber") }}
                error={!!errors.cardNumber}
              />
            )}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: "0", overflow: "none", width: "100%" }}
            >
              <Controller
                name="cardExpiryDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    label="Card expiry date"
                    slotProps={{ textField: { variant: "filled" } }}
                    {...field}
                    error={!!errors.cardExpiryDate}
                    sx={{
                      "& .MuiInputBase-root": {
                        background: "none",
                      },
                      "&:hover & .MuiInputBase-root": {
                        background: "none",
                      },
                      "& .MuiInputBase-root.MuiFilledInput-root::before": {
                        borderColor: errors["cardExpiryDate"]
                          ? "red"
                          : undefined,
                      },
                    }}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div className="d-flex" style={{ gap: "1rem" }}>
        <div
          className="d-flex flex-column"
          style={{ gap: "1rem", width: "100%" }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            Photos Of Documents
          </Typography>

          <div>
            <FileUploader dataType={"image"} />
          </div>
        </div>

        <div
          className="d-flex flex-column"
          style={{ gap: "1rem", width: "100%" }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            TIN Documents
          </Typography>

          <div>
            <FileUploader dataType={"image"} />
          </div>
        </div>
      </div>
      <div className="d-flex" style={{ gap: "1rem" }}>
        <div
          className="d-flex flex-column"
          style={{ gap: "1rem", width: "100%" }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            BIN Documents
          </Typography>

          <div>
            <FileUploader dataType={"image"} />
          </div>
        </div>

        <div
          className="d-flex flex-column"
          style={{ gap: "1rem", width: "100%" }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            Trade Liscense
          </Typography>

          <div>
            <FileUploader dataType={"image"} />
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        type="submit"
        sx={{ width: "100px", backgroundColor: "#164677" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default KYC;
