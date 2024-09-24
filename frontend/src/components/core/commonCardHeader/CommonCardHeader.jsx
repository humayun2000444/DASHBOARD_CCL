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
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: 600,
      color: "#333333",
      margin: 0,
    },
    subtitle: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "normal",
      color: "#555555",
      margin: 0,
    },
    button: {
      backgroundColor: "#F5F5F5",
      color: "#555555",
      border: "1px solid #E0E0E0",
      fontSize: "16px",
      textTransform: "none", // To avoid uppercase text
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
