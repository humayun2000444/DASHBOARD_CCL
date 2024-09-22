import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const CDRSelectSingle = ({ text, selectArr1 }) => {
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
              minWidth: "120px",
              textAlign: "right",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              minWidth: "150px",
              maxWidth: "150px",
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
                  border: "1px solid gray",
                },
                "&.Mui-focused": {
                  boxShadow: "none",
                },
              }}
              inputProps={{ sx: { padding: "8px" } }}
            >
              {selectArr1.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default CDRSelectSingle;
