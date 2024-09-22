import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React from "react";

const CDRInputDouble = ({ text, placeholder1, placeholder2 }) => {
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
              minWidth: "310px",
              maxWidth: "310px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder={placeholder1}
              //   value={firstName}
              //   onChange={(e) => setFirstName(e.target.value)}
              inputProps={{ style: { fontSize: 15, padding: "8px" } }}
            />
            <TextField
              variant="outlined"
              placeholder={placeholder2}
              //   value={firstName}
              //   onChange={(e) => setFirstName(e.target.value)}
              inputProps={{ style: { fontSize: 15, padding: "8px" } }}
            />
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default CDRInputDouble;
