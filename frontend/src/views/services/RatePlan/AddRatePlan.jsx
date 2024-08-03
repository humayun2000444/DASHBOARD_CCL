import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

const AddRatePlan = ({
  open,
  style,
  handleSubmit,
  handleChange,
  handleClose,
  formData,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Rate Plan
          </Typography>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="planName">
                  <Form.Label>Plan Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="planName"
                    placeholder="Enter Plan Name"
                    value={formData.planName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* dropdown */}
                <Form.Group controlId="serviceFamily">
                  <Form.Label>Service Family:</Form.Label>
                  <Form.Control
                    as="select"
                    name="userStatus"
                    //   value={formData.userStatus}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="currency">
                  <Form.Label>Enter Currency:</Form.Label>
                  <Form.Control
                    type="text"
                    name="currency"
                    placeholder="Enter Currency"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="timeZone">
                  <Form.Label>Time Zone:</Form.Label>
                  <Form.Control
                    type="text"
                    name="timeZone"
                    placeholder="Enter Time Zone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="createdOn">
                  <Form.Label>Create On:</Form.Label>
                  <Form.Control
                    type="text"
                    name="createdOn"
                    placeholder="Create On"
                    value={formData.createdOn}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="techPrefix">
                  <Form.Label>Tech Prefix:</Form.Label>
                  <Form.Control
                    type="text"
                    name="techPrefix"
                    placeholder="Enter techPrefix"
                    value={formData.techPrefix}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="defaultPulse">
                  <Form.Label>DefaultPulse:</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultPulse"
                    placeholder="Enter DefaultPulse"
                    value={formData.defaultPulse}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="defaultRoundDigitsAfterDecimalForRateAmount">
                  <Form.Label>
                    Default Round Digits After Decimal ForRate Amount:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultRoundDigitsAfterDecimalForRateAmount"
                    placeholder="Enter Default Round Digits After Decimal For Rate Amount"
                    value={formData.defaultRoundDigitsAfterDecimalForRateAmount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="minDurationSec">
                  <Form.Label>Min Duration Sec:</Form.Label>
                  <Form.Control
                    type="text"
                    name="minDurationSec"
                    placeholder="Enter Min Duration Sec"
                    value={formData.minDurationSec}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="referenceRatePlanforLCR">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="text"
                    name="referenceRatePlanforLCR"
                    placeholder="Enter Reference RatePlan for LCR"
                    value={formData.referenceRatePlanforLCR}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="ambiguousDateHandlingBy">
                  <Form.Label>Ambiguous Date Handling By :</Form.Label>
                  <Form.Control
                    type="text"
                    name="ambiguousDateHandlingBy"
                    placeholder="Enter Ambiguous Date Handling By"
                    value={formData.ambiguousDateHandlingBy}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="defaultFixedChargeDurationSec">
                  <Form.Label>Default Fixed Charge Duration Sec:</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultFixedChargeDurationSec"
                    placeholder="Enter Default Fixed Charge Duration Sec"
                    value={formData.defaultFixedChargeDurationSec}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="defaultFixedChargeAmount">
                  <Form.Label>Default Fixed Charge Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultFixedChargeAmount"
                    placeholder="Enter Default Fixed Charge Amount"
                    value={formData.defaultFixedChargeAmount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="defaultBillingSpan">
                  <Form.Label>Default Billing Span:</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultBillingSpan"
                    placeholder="Enter Default Billing Span"
                    value={formData.defaultBillingSpan}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="defaultCategory">
                  <Form.Label>Default Category:</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultCategory"
                    placeholder="Enter Default Category"
                    value={formData.defaultCategory}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddRatePlan;
