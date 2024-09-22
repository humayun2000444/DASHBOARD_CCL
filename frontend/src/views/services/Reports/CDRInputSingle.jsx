import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React from "react";

const CDRInputSingle = ({ text }) => {
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
            <TextField
              variant="outlined"
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

export default CDRInputSingle;
