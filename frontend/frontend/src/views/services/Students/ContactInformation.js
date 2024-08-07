import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";

const ContactInformation = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const { applicationStudentId, update } = useParams();

  const history = useHistory();
  const [activetab, setActivetab] = useState("3");
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);

  const [addressType, setAddressType] = useState([]);

  const [addressTypeValue, setAddressTypeValue] = useState(0);
  const [oneData, setOneData] = useState({});

  const [countryError, setCountryError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // useEffect(() => {
  //   get("CountryDD/index").then((res) => {

  //     setCountry(res);
  //   });

  //   get("AddressTypeDD/Index").then((res) => {

  //     setAddressType(res);
  //   });

  //   get(
  //     `StudentContactInformation/GetByStudentId/${applicationStudentId}`
  //   ).then((res) => {

  //     setOneData(res);
  //     setCountryLabel(
  //       res?.country?.name == null ? "Select Country" : res?.country?.name
  //     );
  //     setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);

  //     setAddressTypeValue(
  //       res?.addressType?.id == null ? 0 : res?.addressType?.id
  //     );
  //   });
  // }, [success]);

  const goForward = () => {
    history.push(
      `/AddStudentEducationalInformation/${applicationStudentId}/${1}`
    );
  };

  const goBackward = () => {
    history.push(`/AddStudentInformation/${applicationStudentId}/${1}`);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addStudentApplicationInformation/${applicationStudentId}`);
    }

    if (tab == "2") {
      history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "3") {
      history.push(`/addStudentContactInformation/${applicationStudentId}`);
    }

    if (tab == "4") {
      history.push(`/addStudentEducationalInformation/${applicationStudentId}`);
    }

    if (tab == "5") {
      history.push(`/addTestScore/${applicationStudentId}`);
    }

    if (tab == "6") {
      history.push(`/addExperience/${applicationStudentId}`);
    }

    if (tab == "7") {
      history.push(`/addReference/${applicationStudentId}`);
    }

    if (tab == "8") {
      history.push(`/addPersonalStatement/${applicationStudentId}`);
    }
    if (tab == "9") {
      history.push(`/addOtherInformation/${applicationStudentId}`);
    }
    if (tab == "10") {
      history.push(`/uploadDocument/${applicationStudentId}`);
    }
    if (tab == "11") {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  const backToStudentProfile = () => {
    history.push(`/studentProfile/${applicationStudentId}`);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (countryValue == 0) {
      setCountryError(true);
    } else if (addressTypeValue == 0) {
      setAddressError(true);
    } else {
      if (oneData?.id) {
        setButtonStatus(true);
        setProgress(true);
        put("StudentContactInformation/Update", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            history.push(
              `/addStudentEducationalInformation/${applicationStudentId}`
            );
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("StudentContactInformation/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(
              `/addStudentEducationalInformation/${applicationStudentId}`
            );
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Contact Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student
              Profile
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Application
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Personal
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Contact
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Educational
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Experience
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Reference
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Personal Statement
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                Others
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "10"} onClick={() => toggle("10")}>
                Documents
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "11"} onClick={() => toggle("11")}>
                Declaration
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form onSubmit={handleSubmit} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Contact Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
                </div>

                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />

                {oneData?.id ? (
                  <input type="hidden" name="id" id="id" value={oneData?.id} />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Address Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    {/* <Select
                      options={addressTypeName}
                      value={{
                        label: addressTypeLabel,
                        value: addressTypeValue,
                      }}
                      onChange={(opt) =>
                        selectAddressType(opt.label, opt.value)
                      }
                      name="addressTypeId"
                      id="addressTypeId"
                      required
                    /> */}

                    {addressType?.map((tt) => (
                      <>
                        <input
                          type="radio"
                          name="addressTypeId"
                          id="addressTypeId"
                          value={tt?.id}
                          onClick={() => setAddressTypeValue(tt?.id)}
                          checked={addressTypeValue == tt?.id ? true : false}
                        />

                        <label
                          className="mr-3"
                          style={{ fontWeight: 500, fontSize: "14px" }}
                        >
                          {tt?.name}
                        </label>
                      </>
                    ))}

                    {addressError && (
                      <span className="text-danger">
                        Address type is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Phone Number <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="cellPhoneNumber"
                      id="cellPhoneNumber"
                      placeholder="Enter Phone Number"
                      required
                      defaultValue={oneData?.cellPhoneNumber}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      House No. <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="string"
                      name="houseNo"
                      id="houseNo"
                      placeholder="Enter house no."
                      defaultValue={oneData?.houseNo}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Address Line <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="string"
                      name="addressLine"
                      id="addressLine"
                      placeholder="Enter Address Line"
                      required
                      defaultValue={oneData?.addressLine}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      City <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="string"
                      name="city"
                      id="city"
                      placeholder="Enter City"
                      required
                      defaultValue={oneData?.city}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      State <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="string"
                      name="state"
                      id="state"
                      placeholder="Enter State"
                      required
                      defaultValue={oneData?.state}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Zip Code <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="string"
                      name="zipCode"
                      id="zipCode"
                      placeholder="Enter Zip Code"
                      required
                      defaultValue={oneData?.zipCode}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={countryName}
                      value={{ label: countryLabel, value: countryValue }}
                      onChange={(opt) => selectCountry(opt.label, opt.value)}
                      name="countryId"
                      id="countryId"
                      required
                    />

                    {countryError && (
                      <span className="text-danger">Country is required</span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      name={progress ? <ButtonLoader /> : "Submit"}
                      className={"mr-1 mt-3 badge-primary"}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>
              <FormGroup
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ButtonForFunction
                  className={"mr-1 mt-3 btn-warning"}
                  func={goBackward}
                  name={"Previous"}
                  icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                />

                <Button.Ripple
                  onClick={goForward}
                  className="mr-1 mt-3 btn-warning"
                >
                  Next
                  <i className="fas fa-arrow-right-long ml-1"></i>
                </Button.Ripple>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactInformation;
