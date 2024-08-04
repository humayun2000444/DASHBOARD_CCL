import React, { useState } from "react";
import Select from "react-select";
import { Button, Form, Col, Row } from "react-bootstrap";

const options = [
  { label: "Canada", value: "Canada" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Japan", value: "Japan" },
  { label: "Nepal", value: "Nepal" },
  { label: "Bhutan", value: "Bhutan" },
];

const CallPackages = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [pricing, setPricing] = useState("");
  const [active, setActive] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    // Add your form submission logic here
  };

  return (
    <div className="bg-white mb-5 ">
      <p className="text-info ml-3 pt-2">Country</p>
      <div className="ml-3 mr-3 ">
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          isMulti={true}
        />
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 pt-3">
          <Col>
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Calling Minutes</Form.Label>
              <Form.Control className="mr-5" type="text" name="firstName" />
              <Form.Control.Feedback tooltip>Example: 30</Form.Control.Feedback>
            </Form.Group>
            <div class="form-check ml-3 mt-4">
              <Form.Check
                type="checkbox"
                id="unlimitedMinutes"
                label="Unlimited minutes"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </div>
          </Col>
          <Col>
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Active Days</Form.Label>
              <Form.Control type="text" name="lastName" />
              <Form.Control.Feedback tooltip>
                Example: 100
              </Form.Control.Feedback>
            </Form.Group>
            <div class="form-check ml-3 mt-4">
              <Form.Check
                type="checkbox"
                id="noExpiration"
                label="A package without expiration"
                checked={isTop}
                onChange={(e) => setIsTop(e.target.checked)}
              />
            </div>
          </Col>
        </Row>

        <hr />
        <p className="font-weight-bold ml-3 ">Pricing</p>

        <Row className="mb-3 pt-3">
          <Col>
            <Form.Group as={Col} md="4">
              <Form.Label>Package price in BDT</Form.Label>
              <Form.Control
                className="mr-5"
                type="text"
                name="pricing"
                onChange={(e) => setPricing(e.target.value)}
              />
              <p>Example: 4.99</p>
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <div>
          <Row className="ml-2">
            <Col className="ml-1">
              <Row>
                <div class="form-check ml-2 mt-2">
                  <Form.Check
                    type="checkbox"
                    id="active"
                    label="Active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                </div>
                <div class="form-check ml-3 mt-2">
                  <Form.Check
                    type="checkbox"
                    id="isTop"
                    label="Is top"
                    checked={isTop}
                    onChange={(e) => setIsTop(e.target.checked)}
                  />
                </div>
              </Row>
            </Col>

            <Col md={{ span: 2, offset: 1 }}>
              <Button
                style={{ border: "solid 2px", borderColor: "wheat" }}
                variant="white"
                className="ml-5"
              >
                Cencel
              </Button>
              <Button type="submit" variant="info" className="ml-2">
                Create
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      <div className="pb-3"></div>
    </div>
  );
};

export default CallPackages;
