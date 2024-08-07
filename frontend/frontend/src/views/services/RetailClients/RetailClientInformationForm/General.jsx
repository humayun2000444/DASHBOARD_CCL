import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff, Settings, Edit } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const General = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  return (
    <Container fluid>
      <Row className="my-3">
        <Col md={8}>
          <Row>
            <Col md={6}>
              <TextField label="Login" variant="standard" fullWidth required />
            </Col>
            <Col md={6}>
              <TextField
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel>Reseller</InputLabel>
            <Select defaultValue="">
              <MenuItem value="NONE">NONE</MenuItem>
              {/* Add more items as needed */}
            </Select>
          </FormControl>
        </Col>
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select defaultValue="EUR">
              <MenuItem value="EUR">EUR</MenuItem>
              {/* Add more items as needed */}
            </Select>
          </FormControl>
        </Col>
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel>Tariff</InputLabel>
            <Select defaultValue="">{/* Add items as needed */}</Select>
          </FormControl>
        </Col>
        {/* <Col md={3} className="d-flex align-items-center">
          <Settings />
        </Col> */}
        <Col md={3}>
          <TextField
            label="Calls limit"
            type="number"
            variant="standard"
            fullWidth
          />
        </Col>
      </Row>
      <Row className="my-3"></Row>
      <Row className="my-3">
        <Col md={6}>
          <TextField label="Ring timeout" variant="standard" fullWidth />
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <TextField
            label="Dialing plan prefix"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Col>
        <Col md={6}>
          <TextField
            label="Caller ID prefix"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6} className="d-flex align-items-center">
          <Settings />
          <span className="ml-2">Outbound calls filtering rule</span>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={3}>
          <FormControlLabel control={<Switch />} label="Record calls" />
        </Col>
        <Col md={3}>
          <FormControlLabel control={<Switch />} label="Blocked caller id" />
        </Col>
        <Col md={3}>
          <FormControlLabel control={<Switch />} label="Trusted" />
        </Col>

        <Col md={3}>
          <TextField label="PIN" variant="standard" fullWidth />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default General;
