// ProfileOverview.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const ProfileOverview = () => {
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
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h6" style={styles.title}>Profile Overview</Typography>
      <Typography variant="body1">User Role: Admin</Typography>
      <Typography variant="body1">User Type: Prepaid</Typography>
    </Box>
  );
};

export default ProfileOverview;
