import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import FileUploader from "./FileUploader";

const KYC = () => {
  // Initialize form with default values
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    idPartner: "",
    phoneNumber: "",
    birthDate: null,
    gender: "",
    country: "",
    documentType: "",
    cardNumber: "",
    cardExpiryDate: null,
    address1: "",
    address2: "",
    address3: "",
    address4: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
  });

  // State to store the uploaded files
  const [docFiles, setDocFiles] = useState([]);
  const [tinFiles, setTinFiles] = useState([]);
  const [binFiles, setBinFiles] = useState([]);
  const [tradeFiles, setTradeFiles] = useState([]);

  const handleFileUpload = (setFiles) => (files) => {
    setFiles(files);
  };

  const onSubmit = async (data) => {
    // Create FormData object to send the form and file data
    const formData = new FormData();
    console.log(data);

    console.log(docFiles);
    console.log(tinFiles);
    console.log(binFiles);
    console.log(tradeFiles);

    // Add the form data fields
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("birthDate", data.birthDate);
    formData.append("gender", data.gender);
    formData.append("country", data.country);
    formData.append("documentType", data.documentType);
    formData.append("cardNumber", data.cardNumber);
    formData.append("cardExpiryDate", data.cardExpiryDate);
    formData.append("address1", data.address1);
    formData.append("address2", data.address2);
    formData.append("address3", data.address3);
    formData.append("address4", data.address4);

    // Add the uploaded files
    docFiles.forEach((file) => formData.append("doc", file));
    tinFiles.forEach((file) => formData.append("tincertificate", file));
    binFiles.forEach((file) => formData.append("bincertificate", file));
    tradeFiles.forEach((file) => formData.append("tradeliscense", file));

    // try {
    //   // Make the API call using axios
    //   const response = await axios.post(
    //     "http://<serverIp>:5070/api/partnerdetails/add",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("Response: ", response.data);
    // } catch (error) {
    //   console.error("Error uploading files: ", error);
    // }
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

  const selectedDocumentType = watch("documentType");

  const applyDocumentTypeLogic = () => {
    // Apply your logic based on the document type selected
    if (selectedDocumentType === "Identity Card") {
      console.log("Identity Card selected");
      // Do something specific for identity card
    } else if (selectedDocumentType === "Passport") {
      console.log("Passport selected");
      // Do something specific for passport
    } else if (selectedDocumentType === "Driving License") {
      console.log("Driving License selected");
      // Do something specific for driving license
    }
  };

  useEffect(() => {
    applyDocumentTypeLogic();
  }, [selectedDocumentType]);

  const fetchPartners = async () => {
    try {
      const data = await partnerServices.fetchPartners();
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

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
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Last Name - Surname"
              sx={{ width: "100%" }}
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
          name="idPartner"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              select
              label="ID Partner"
              sx={{ width: "100%", ...getTextFieldStyles("idPartner") }}
              error={!!errors.idPartner}
            >
              {[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
                sx={{ width: "42ch", ...getTextFieldStyles("gender") }}
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
                sx={{ width: "42ch", ...getTextFieldStyles("country") }}
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
      <div className="d-flex" style={{ gap: "10px" }}>
        <Controller
          name="address1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Address 1"
              sx={{ width: "100%", ...getTextFieldStyles("address1") }}
              error={!!errors.address1}
            />
          )}
        />
        <Controller
          name="address2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Address 2"
              sx={{ width: "100%" }}
            />
          )}
        />
        <Controller
          name="address3"
          control={control}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Address 3"
              sx={{ width: "100%" }}
            />
          )}
        />
        <Controller
          name="address4"
          control={control}
          render={({ field }) => (
            <TextField
              variant="standard"
              {...field}
              label="Address 4"
              sx={{ width: "100%" }}
            />
          )}
        />
      </div>
      <div className="d-flex" style={{ gap: "10px" }}>
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
                sx={{ width: "32ch", ...getTextFieldStyles("documentType") }}
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
                sx={{ width: "32ch", ...getTextFieldStyles("cardNumber") }}
                error={!!errors.cardNumber}
              />
            )}
          />
        </div>
        {selectedDocumentType !== "Identity Card" && (
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
        )}
      </div>

      {selectedDocumentType && (
        <div className="d-flex" style={{ gap: "1rem" }}>
          <div
            className="d-flex flex-column"
            style={{ gap: "1rem", width: "100%" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Photos Of {selectedDocumentType}*
            </Typography>
            <FileUploader
              dataType="image"
              onFileUpload={handleFileUpload(setDocFiles)}
            />
          </div>
          <div
            className="d-flex flex-column"
            style={{ gap: "1rem", width: "100%" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TIN Certificates
            </Typography>
            <FileUploader
              dataType="image"
              onFileUpload={handleFileUpload(setTinFiles)}
            />
          </div>
        </div>
      )}

      {selectedDocumentType && (
        <div className="d-flex" style={{ gap: "1rem" }}>
          <div
            className="d-flex flex-column"
            style={{ gap: "1rem", width: "100%" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              BIN Certificates
            </Typography>
            <FileUploader
              dataType="image"
              onFileUpload={handleFileUpload(setBinFiles)}
            />
          </div>
          <div
            className="d-flex flex-column"
            style={{ gap: "1rem", width: "100%" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Trade License
            </Typography>
            <FileUploader
              dataType="image"
              onFileUpload={handleFileUpload(setTradeFiles)}
            />
          </div>
        </div>
      )}

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
