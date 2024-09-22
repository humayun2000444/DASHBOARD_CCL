import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const CDRSelectDouble = ({ text, selectArr1, selectArr2 }) => {
  const handleChange = (event) => {
    // setAge(event.target.value);
  };

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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              sx={{
                flex: "1",
                overflow: "hidden",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid gray", // Remove focus border color
                },
                "&.Mui-focused": {
                  boxShadow: "none", // Remove box-shadow on focus
                },
              }}
              inputProps={{ sx: { padding: "8px" } }}
            >
              {selectArr1.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <Select
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
            </Select>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default CDRSelectDouble;
