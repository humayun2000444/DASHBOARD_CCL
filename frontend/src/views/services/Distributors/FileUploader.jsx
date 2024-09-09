import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";

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

const FileUploader = ({ dataType }) => {
  const classes = useStyles();

  // Set accepted file formats based on dataType
  const acceptedFiles =
    dataType === "csv"
      ? ["text/csv"] // CSV only
      : dataType === "image"
      ? ["image/jpeg", "image/png", "image/gif", "image/jpg"] // Image formats
      : []; // Allow any files for other types (can be customized further)

  // Set max file size based on dataType
  const maxFileSize = dataType === "csv" ? Infinity : 2000000; // 2MB for non-CSV

  return (
    <DropzoneArea
      showPreviewsInDropzone={true}
      useChipsForPreview
      filesLimit={2}
      acceptedFiles={acceptedFiles} // Dynamic file type restriction
      maxFileSize={maxFileSize} // Dynamic size limit
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
    />
  );
};

export default FileUploader;
