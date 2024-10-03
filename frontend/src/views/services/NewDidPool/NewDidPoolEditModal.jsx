import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import NewEditPoolForm from "./NewEditPoolForm";

const NewDidPoolEditModal = ({ open, handleClose, title, buttonText, handleChange }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 1000,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton
            onClick={handleClose}
            style={{
              transition: "color 0.3s ease",
              color: "inherit",
              position: "relative",
              right: "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "red")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box sx={{ bgcolor: "background.paper", width: "100%", mt: 2 }}>
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
                  backgroundColor: "#007b8f", // Same color as the button
                },
              }}
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Route" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleTabChangeIndex}
            handleChange = {handleChange}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/*<PartnerDetailsForm />*/}
              <NewEditPoolForm/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {/*<SmsRouting />*/}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {/*<PartnerPrefix />*/}
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              {/*<KYC />*/}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewDidPoolEditModal;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
