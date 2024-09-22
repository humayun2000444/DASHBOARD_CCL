import { Box, FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";

const CustomDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiBox-root": {
          gap: "10px",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Start Date Picker */}
          <DatePicker
            placeholder="Start"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                padding: "9px ",
              },
            }}
          />

          {/* End Date Picker */}
          <DatePicker
            placeholder="End"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            sx={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                padding: "9px",
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDateRangePicker;
