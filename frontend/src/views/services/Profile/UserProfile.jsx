// UserProfile.jsx
import React from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import ProfileOverview from './ProfileOverview.jsx';
import ProfileDetails from './ProfileDetails.jsx';
import CompanyLogoSection from './CompanyLogoSection.jsx';

const UserProfile = () => {
  const styles = {
    root: {
      padding: '16px',
    },
    coverImage: {
      height: '200px',
      // backgroundImage: 'url("../\assets\\img\\pages\\vuesax-login-bg.jpg")',
      backgroundColor: "#222",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginBottom: '20px',
    },
    profileContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    avatar: {
      width: '100px',
      height: '100px',
      marginRight: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    profileContent: {
      marginBottom: '20px',
    },
    button: {
      margin: '0 8px',
    },
  };

  return (
    // <Box style={styles.root}>
    //   <Box style={styles.coverImage}></Box>
    //   <Box style={styles.profileContainer}>
    //     <Avatar style={styles.avatar} alt="Profile Picture" src="/profile-pic.jpg" />
    //     <Box>
    //       <Typography variant="h5">John Doe</Typography>
    //       <Typography variant="body1">john.doe@email.com</Typography>
    //     </Box>
    //   </Box>
    //   <Box style={styles.header}>
    //     <Typography variant="h6">User Profile</Typography>
    //     <Box>
    //       <Button variant="contained" style={styles.button}>Save</Button>
    //       <Button variant="outlined" style={styles.button}>Cancel</Button>
    //     </Box>
    //   </Box>
    //   <Grid container spacing={4} style={styles.profileContent}>
    //     <Grid item xs={12} sm={4}>
    //       <ProfileOverview />
    //     </Grid>
    //     <Grid item xs={12} sm={8}>
    //       <ProfileDetails />
    //     </Grid>
    //   </Grid>
    //   <CompanyLogoSection />
    // </Box>

    <>
      <h3>Account Settings</h3>

      {/*Profile Overview */}
      <div
        className="profileContainer"
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "20px 24px",
        }}
      >
        <div className="profileWrapper">
          <h4>My Profile</h4>
          <div
            className="profileOverview"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              border: "1px solid #888888",
              borderRadius: "16px",
            }}
          >
            <Avatar
              style={styles.avatar}
              alt="Profile Picture"
              src="/profile-pic.jpg"
            />
            <div className="profileOverviewDetails">
              <h4>John Doe</h4>
              <p>john.doe@email.com</p>
            </div>
          </div>

          {/*Personal Information */}
          <div
            className="profilePersonalInformation"
            style={{
              padding: "20px",
              border: "1px solid #888888",
              borderRadius: "16px",
              marginTop: "20px",
            }}
          >
            <h5>Personal Information</h5>
            <div style={{
              display: "flex",
              alignItems: "center",
            }}>
              <Avatar
                style={styles.avatar}
                alt="Profile Picture"
                src="/profile-pic.jpg"
              />
              <div className="personalInformation">
                <h4>John Doe</h4>
                <p>john.doe@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
