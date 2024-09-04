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

const NidInfo = () => {
  // Initialize form with default values
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: null,
    gender: "Male",
    country: "Bangladesh",
    documentType: "Identity Card",
    cardNumber: "",
    cardExpiryDate: null,
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // Object to store form data
  const [formData, setFormData] = React.useState(defaultValues);

  // Watch form values and update formData state
  React.useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
              {...field}
              label="First Name"
              sx={{ width: "100%", ...getTextFieldStyles("firstName") }}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name - Surname"
              sx={{ width: "100%", ...getTextFieldStyles("lastName") }}
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
              {...field}
              label="Email"
              sx={{ width: "100%", ...getTextFieldStyles("email") }}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              sx={{ width: "100%", ...getTextFieldStyles("phoneNumber") }}
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
                    {...field}
                    label="Birth Date"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ ...getTextFieldStyles("birthDate") }}
                      />
                    )}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Gender"
                sx={{ width: "27ch", ...getTextFieldStyles("gender") }}
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
        <div>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Country"
                sx={{ width: "35ch", ...getTextFieldStyles("country") }}
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
      <div className="d-flex" style={{ gap: "10px" }}>
        <div>
          <Controller
            name="documentType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Document Type"
                sx={{ width: "27ch", ...getTextFieldStyles("documentType") }}
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
        <Controller
          name="cardNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Card Number"
              sx={{ width: "100%", ...getTextFieldStyles("cardNumber") }}
            />
          )}
        />
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: "0", overflow: "none" }}
            >
              <Controller
                name="cardExpiryDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Card Expiry Date"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ ...getTextFieldStyles("cardExpiryDate") }}
                      />
                    )}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      <div className="d-flex flex-column" style={{ gap: "1rem" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontSize: "1.2rem", fontWeight: "500" }}
        >
          Photos Of Documents
        </Typography>
        <div
          className="d-flex align-items-center justify-content-between px-3"
          style={{ border: "2px solid #164677", borderRadius: "5px" }}
        >
          <div className="d-flex align-items-center" style={{ gap: ".8rem" }}>
            <div style={{ fontSize: "2.8rem" }}>
              <i class="fa-solid fa-id-card"></i>
            </div>
            <div>
              <p className="mb-0" style={{ fontSize: "1.3rem" }}>
                Photo of Id Card
              </p>
              <p className="mb-0">
                Please upload the photo of front page of your card.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center" style={{ gap: ".8rem" }}>
            <i
              class="fa-solid fa-cloud-arrow-up"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <button
              style={{
                fontSize: "1.3rem",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              Upload
            </button>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-between px-3"
          style={{ border: "2px solid #164677", borderRadius: "5px" }}
        >
          <div className="d-flex align-items-center" style={{ gap: ".8rem" }}>
            <div style={{ fontSize: "2.8rem" }}>
              <i class="fa-solid fa-id-card"></i>
            </div>
            <div>
              <p className="mb-0" style={{ fontSize: "1.3rem" }}>
                Photo of Id Card
              </p>
              <p className="mb-0">
                Please upload the photo of back page of your card.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center" style={{ gap: ".8rem" }}>
            <i
              class="fa-solid fa-cloud-arrow-up"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <button
              className="mb-0"
              style={{
                fontSize: "1.3rem",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              Upload
            </button>
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

export default NidInfo;
