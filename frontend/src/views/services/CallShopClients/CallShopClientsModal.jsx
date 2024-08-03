import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import {
  TextField,
  MenuItem,
  Switch,
  Select,
  FormControlLabel,
  InputLabel,
  FormControl,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CallShopClientsModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  title,
  buttonText,
}) => {
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
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
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Personal Data" {...a11yProps(1)} />
                <Tab label="Billing" {...a11yProps(2)} />
                <Tab label="Codecs" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleTabChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label="Login" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Reseller</InputLabel>
                      <Select defaultValue="- NONE -">
                        <MenuItem value="- NONE -">- NONE -</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select defaultValue="EUR">
                        <MenuItem value="EUR">EUR</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Tariff</InputLabel>
                      <Select>
                        <MenuItem value="Tariff 1">Tariff 1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Balance"
                      type="number"
                      variant="standard"
                      fullWidth
                      defaultValue="0"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Stir-Shaken attestation level</InputLabel>
                      <Select>
                        <MenuItem value="0">0</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Calls limit"
                      type="number"
                      variant="standard"
                      fullWidth
                      defaultValue="0"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="CPS limit"
                      type="number"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Dialing plan prefix"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Tariff prefix"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Caller ID prefix"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Record calls"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Charge for inbound calls"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Use SIP digest authentication"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Use PIN authorization"
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {/* Personal Data Content */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="First name"
                      variant="standard"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField label="Last name" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField label="Address" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField label="City" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField label="Zip" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select>
                        <MenuItem value="Country">Country</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField label="State" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select>
                        <MenuItem value="Language">Language</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Phone" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Mobile phone"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Email" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="TAX ID" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Client number"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Billing Content
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                {/* Codecs Content */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Audio codecs</Typography>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Primary codec</InputLabel>
                      <Select>
                        <MenuItem value="Codec1">Codec1</MenuItem>
                        <MenuItem value="Codec2">Codec2</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Allowed codecs"
                      variant="standard"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Video codecs</Typography>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Primary codec</InputLabel>
                      <Select>
                        <MenuItem value="H263 (1996)">H263 (1996)</MenuItem>
                        <MenuItem value="Codec2">Codec2</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Allowed codecs"
                      variant="standard"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Fax codecs</Typography>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Primary codec</InputLabel>
                      <Select>
                        <MenuItem value="Codec1">Codec1</MenuItem>
                        <MenuItem value="Codec2">Codec2</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Allowed codecs"
                      variant="standard"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Transcoding"
                      sx={{ mt: 4 }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{ backgroundColor: "#007b8f", borderColor: "#007b8f" }}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

CallShopClientsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default CallShopClientsModal;
