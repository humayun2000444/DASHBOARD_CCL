import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: "120px",
      maxWidth: "120px",
    },
    dropzoneContainer: {
      minHeight: "50px",
      padding: "5px",
      "& .MuiDropzoneArea-text": {
        margin: "0",
        fontWeight: "400",
      },
    },
    dropzoneTextWithIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing(1),
    },
  })
);

const FileUploader = ({ dataType, onFileUpload }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
    // onFileUpload(newFiles); // Pass the files back to the parent component
  };

  // Set accepted file formats based on dataType
  const acceptedFiles =
    dataType === "csv"
      ? ["text/csv"]
      : dataType === "image"
      ? ["image/jpeg", "image/png", "image/gif", "image/jpg"]
      : [];

  const maxFileSize = dataType === "csv" ? Infinity : 2000000; // 2MB for non-CSV

  return (
    <DropzoneArea
      showPreviewsInDropzone={true}
      useChipsForPreview
      filesLimit={2}
      acceptedFiles={acceptedFiles}
      maxFileSize={maxFileSize}
      dropzoneClass={classes.dropzoneContainer}
      dropzoneText={
        <span
          className={classes.dropzoneTextWithIcon}
          style={{ fontWeight: "400", fontSize: "14px", color: "gray" }}
        >
          <CloudUploadIcon />{" "}
          {dataType === "csv"
            ? "Select CSV file"
            : dataType === "image"
            ? "Upload image files (Max 2MB)"
            : "Upload your files (Max 2MB)"}
        </span>
      }
      Icon={() => null}
      onChange={handleFileChange} // Call this when files are changed
    />
  );
};

export default FileUploader;
