import React from "react";
import Button from "@mui/material/Button";

const CommonHeader = ({ title, subtitle, buttonText, onButtonClick }) => {
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    titleWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "16px",
      lineHeight: "22px",
      letterSpacing:"-0.5px",
      fontWeight: 600,
      color: "#09090B",
      margin: 0,
    },
    subtitle: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "400",
      color: "#71717A",
      margin: 0,
    },
    button: {
      backgroundColor: "#18181b",
      color: "#fafafa",
      border: "1px solid #E0E0E0",
      borderRadius:"6px",
      fontSize: "14px",
      lineHeight: "20px",
      padding:"8px 12px",
      textTransform: "capitalize",
    },
  };

  return (
    <div style={styles.header}>
      <div style={styles.titleWrapper}>
        <h4 style={styles.title}>{title}</h4>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>
      {buttonText && (
        <Button
          variant="outlined"
          style={styles.button}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default CommonHeader;
