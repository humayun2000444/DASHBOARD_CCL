import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload"; // Example icon
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

const FileUploader = () => {
  const classes = useStyles();

  return (
    <DropzoneArea
      showPreviewsInDropzone={true}
      useChipsForPreview
      filesLimit={2}
      dropzoneClass={classes.dropzoneContainer}
      dropzoneText={
        <span className={classes.dropzoneTextWithIcon}>
          <CloudUploadIcon /> Upload your files
        </span>
      }
      Icon={() => null}
    />
  );
};

export default FileUploader;
