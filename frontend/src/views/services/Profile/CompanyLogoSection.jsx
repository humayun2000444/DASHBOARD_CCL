// CompanyLogoSection.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

const CompanyLogoSection = () => {
  const [logo, setLogo] = useState('/current-logo.jpg'); // Default logo

  // Inline styles
  const styles = {
    container: {
      padding: '16px',
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      textAlign: 'center',
    },
    logo: {
      width: '100px',
      height: '100px',
      marginBottom: '16px',
    },
    button: {
      marginTop: '8px',
    },
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h6">Company Logo</Typography>
      <Avatar style={styles.logo} src={logo} alt="Company Logo" />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="logo-upload"
        type="file"
        onChange={handleLogoUpload}
      />
      <label htmlFor="logo-upload">
        <Button variant="contained" component="span" style={styles.button}>
          Upload Logo
        </Button>
      </label>
      <Typography variant="caption">Current Logo: {logo}</Typography>
    </Box>
  );
};

export default CompanyLogoSection;
