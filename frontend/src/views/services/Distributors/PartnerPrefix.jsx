// PartnerPrefix.js
import Button from "@mui/material/Button";
import React, { useState } from "react";
import FileUploader from "./FileUploader";
import PartnerPrefixForm from "./PartnerPrefixForm";
import PartnerPrefixTable from "./PartnerPrefixTable";

const PartnerPrefix = () => {
  const [allPartnerPrefixes, setAllPartnerPrefixes] = useState([]);

  const handleDelete = (index) => {
    setAllPartnerPrefixes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {allPartnerPrefixes.length > 0 && (
        <PartnerPrefixTable
          allPartnerPrefixes={allPartnerPrefixes}
          handleDelete={handleDelete}
        />
      )}
      <PartnerPrefixForm setAllPartnerPrefixes={setAllPartnerPrefixes} />
      <div
        style={{
          display: "flex",
          gap: "200px",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "130px",
            backgroundColor: "#164677",
            marginTop: "10px",
            height: "40px",
          }}
        >
          Submit
        </Button>
        <FileUploader dataType="csv"/>
      </div>
    </div>
  );
};

export default PartnerPrefix;
