// PartnerPrefix.js
import React, { useState } from "react";
import FileUploader from "./FileUploader";
import PartnerPrefixForm from "./PartnerPrefixForm";

const PartnerPrefix = ({setOpenToaster}) => {
  const [allPartnerPrefixes, setAllPartnerPrefixes] = useState([]);

  const handleDelete = (index) => {
    setAllPartnerPrefixes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* {allPartnerPrefixes.length > 0 && (
        <PartnerPrefixTable
          allPartnerPrefixes={allPartnerPrefixes}
          handleDelete={handleDelete}
        />
      )} */}
      <PartnerPrefixForm setAllPartnerPrefixes={setAllPartnerPrefixes} setOpenToaster={setOpenToaster} />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <FileUploader dataType="csv" />
      </div>
    </div>
  );
};

export default PartnerPrefix;
