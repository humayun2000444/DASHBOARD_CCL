import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import ManageDidPool from "./ManageDidPool";
import AssignNewDid from "./AssignNewDid";

const DidPoolModal = ({ show, handleClose, onSave }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setValue(index);
  };

  // Determine the title based on the selected tab (value)
  const getTitle = () => {
    if (value === 0) {
      return "Edit DID Pool";
    } else if (value === 1) {
      return "Assign DID";
    }
    return "Manage DID Pool"; // Fallback or default title
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="did-pool-modal-title"
      aria-describedby="did-pool-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header with dynamic title and close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            {getTitle()}
          </Typography>
          <IconButton
            onClick={handleClose}
            style={{
              transition: "color 0.3s ease",
              color: "inherit",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "red")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{
                ".MuiTabs-indicator": {
                  backgroundColor: "#007b8f",
                },
              }}
            >
              <Tab label="Edit Pool" {...a11yProps(0)} />
              <Tab label="Assign DID" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          {/* Swipeable Views */}
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleTabChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <ManageDidPool />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <AssignNewDid />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </Modal>
  );
};

export default DidPoolModal;

// Function to provide accessibility props
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// TabPanel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
