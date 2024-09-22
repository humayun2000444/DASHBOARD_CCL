import FormControl from "@mui/material/FormControl";
import React from "react";
import CustomDateRangePicker from "./CustomDateRangePicker";

const CDRDateSelect = ({ text }) => {
  return (
    <div>
      <FormControl style={{}}>
        <div style={{ display: "flex" }}>
          <p
            style={{
              textTransform: "capitalize",
              fontWeight: "500",
              marginRight: "10px",
              minWidth: "80px",
              maxWidth: "80px",
              textAlign: "right",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              minWidth: "310px",
              maxWidth: "310px",
            }}
          >
            <CustomDateRangePicker />

            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              sx={{
                flex: "1",
                overflow: "hidden",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid gray",
                },
                "&.Mui-focused": {
                  boxShadow: "none",
                },
              }}
              inputProps={{ sx: { padding: "8px" } }}
            >
              {selectArr2.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select> */}
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default CDRDateSelect;
