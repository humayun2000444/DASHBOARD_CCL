// ProfileDetails.jsx
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const ProfileDetails = () => {
  // Inline styles
  const styles = {
    container: {
      padding: '16px',
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    textField: {
      marginBottom: '16px',
    },
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h6" style={styles.title}>Profile Details</Typography>
      <TextField style={styles.textField} label="First Name" variant="outlined" fullWidth />
      <TextField style={styles.textField} label="Last Name" variant="outlined" fullWidth />
      <TextField style={styles.textField} label="Email" variant="outlined" fullWidth />
      <TextField style={styles.textField} label="Password" variant="outlined" type="password" fullWidth />
      <TextField style={styles.textField} label="Address" variant="outlined" fullWidth />
      <TextField style={styles.textField} label="Registration No" variant="outlined" fullWidth />
    </Box>
  );
};

export default ProfileDetails;
