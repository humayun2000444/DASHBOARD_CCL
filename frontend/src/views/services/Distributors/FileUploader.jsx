import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: "120px",
      maxWidth: "120px", // Keep the preview chips at a fixed size
    },
    dropzoneContainer: {
      minHeight: "50px", // Set a higher min-height to accommodate file preview
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
    setTimeout(() => {
      setFiles(newFiles);
      onFileUpload(newFiles);
    }, 100);
  };

  // Set accepted file formats based on dataType
  const acceptedFiles =
    dataType === "csv"
      ? [
          "text/csv", // CSV files
          "application/vnd.ms-excel", // Excel .xls
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlsx
        ]
      : dataType === "image"
      ? ["image/jpeg", "image/png", "image/gif", "image/jpg"]
      : [];

  // Set file limit conditionally based on dataType
  const filesLimit = dataType === "csv" ? 1 : 2;

  const maxFileSize = dataType === "csv" ? Infinity : 2000000; // 2MB for non-CSV

  return (
    <>
      <DropzoneArea
        showPreviewsInDropzone={true}
        useChipsForPreview
        filesLimit={filesLimit} // Limit to 1 file for CSV
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
              ? "Select CSV or Excel file"
              : dataType === "image"
              ? "Upload image files (Max 2MB)"
              : "Upload your files (Max 2MB)"}
          </span>
        }
        Icon={() => null}
        onChange={handleFileChange} // Call this when files are changed
      />
    </>
  );
};

export default FileUploader;
