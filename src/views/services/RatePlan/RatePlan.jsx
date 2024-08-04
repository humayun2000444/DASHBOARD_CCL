import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";

import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import AddRatePlan from "./AddRatePlan";
import UpdateRatePlan from "./UpdateRatePlan";

const RatePlan = () => {
  const [serviceList, setServiceLIst] = useState([
    {
      name: "[Select]",
      id: 0,
    },
    {
      name: "A2Z",
      id: 1,
    },
  ]);
  const [serviceLabel, setServiceLabel] = useState("[Select]");
  const [serviceValue, setServiceValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const selectServiceFamily = (label, value) => {
    setServiceLabel(label);
    setServiceValue(value);
  };

  const serviceFamilyOption = serviceList?.map((srv) => ({
    label: srv?.name,
    value: srv?.id,
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 900,
    backgroundColor: "background.paper",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    padding: 4,
    overflowY: "scroll",
    maxHeight: "98%",
  };

  const initialFormData = {
    planName: "",
    serviceFamily: "",
    currency: "",
    timeZone: "",
    createdOn: "",
    techPrefix: "",
    description: "",
    defaultPulse: "",
    defaultRoundDigitsAfterDecimalForRateAmount: "",
    minDurationSec: "",
    referenceRatePlanforLCR: "",
    ambiguousDateHandlingBy: "",
    defaultFixedChargeDurationSec: "",
    defaultFixedChargeAmount: "",
    defaultBillingSpan: "",
    defaultCategory: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [ratePlanData, setRatePlanData] = useState(initialFormData);

  const initalData = (data) => {
    const newData = {
      planName: data.planName,
      serviceFamily: data.serviceFamily,
      currency: data.currency,
      timeZone: data.timeZone,
      createdOn: data.createdOn,
      techPrefix: data.techPrefix,
      description: data.description,
      defaultPulse: data.defaultPulse,
      defaultRoundDigitsAfterDecimalForRateAmount:
        data.defaultRoundDigitsAfterDecimalForRateAmount,
      minDurationSec: data.minDurationSec,
      referenceRatePlanforLCR: data.referenceRatePlanforLCR,
      ambiguousDateHandlingBy: data.ambiguousDateHandlingBy,
      defaultFixedChargeDurationSec: data.defaultFixedChargeDurationSec,
      defaultFixedChargeAmount: data.defaultFixedChargeAmount,
      defaultBillingSpan: data.defaultBillingSpan,
      defaultCategory: data.defaultCategory,
    };
    return newData;
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = initalData(formData);
    console.log(data);
    handleClose();
    // try {
    //   await userServices.createUser(userData, userInfo.token);
    //   handleClose();
    //   fetchUsers();
    // } catch (error) {
    //   console.error("Error adding user:", error);
    //   // Handle error
    // }
  };
  // update
  const handleUpdateOpen = async (id) => {
    // setUserId(id);
    setUpdateOpen(true);
    // await fetchUserData(id);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setRatePlanData(initialFormData);
  };

  const updateHandleChange = (e) => {
    const { name, value } = e.target;
    setRatePlanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    const updateRatePlanData = initalData(ratePlanData);
    console.log(updateRatePlanData);
    handleClose();
    //  try {
    //    await userServices.updateUser(id, updateUserData, userInfo.token);
    //    handleClose();
    //    fetchUsers();
    //  } catch (error) {
    //    console.error("Error updating user:", error);
    //    // Handle error
    //  }
  };
  return (
    <div>
      {/* Modal add user*/}
      <AddRatePlan
        open={open}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        formData={formData}
        style={style}
        setFormData={setFormData}
      />
      {/* end */}

      {/* update modal */}
      <UpdateRatePlan
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        style={style}
        handleUpdateSubmit={handleUpdateSubmit}
        ratePlanData={ratePlanData}
        updateHandleChange={updateHandleChange}
        setRatePlanData={setRatePlanData}
      />
      {/* update modal end */}
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Role Management</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Service : </h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  {/* <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Find User"
                ></FloatingLabel> */}
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div className="col-md-4">
                <h6>Rate Plan Name Having : </h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div
                className="col-md-4 d-flex justify-content-end"
                style={{ marginTop: "23px" }}
              >
                <Button style={{ padding: "7px 30px" }} onClick={handleOpen}>
                  Add Rate Plan
                </Button>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>Plan Name</th>
                  <th style={{ minWidth: "350px" }}>Service Family</th>
                  <th>Currency</th>
                  <th>TimeZone</th>
                  <th>Created On</th>
                  <th>
                    Tech
                    <br />
                    Prefix
                  </th>
                  <th>Description</th>
                  <th>
                    Default <br /> Pulse
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Round Digits <br /> after Decimal for <br /> Rate
                    Amount
                  </th>
                  <th>Min Duration (Sec)</th>
                  <th>
                    Reference Rate Plan <br></br> for LCR
                  </th>
                  <th style={{ minWidth: "220px" }}>
                    Ambiguous Date Handling by
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Fixed Charge <br /> Duration (Sec)
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Fixed Charge <br /> Amount
                  </th>
                  <th style={{ minWidth: "150px" }}>
                    Default <br /> Billing Span
                  </th>
                  <th style={{ minWidth: "150px" }}>Default Category</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Domestic</td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td>BDT</td>
                  <td>GMT + 6</td>
                  <td>Dummy Data</td>
                  <td>00</td>
                  <td>Dummy Data</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0.1</td>
                  <td>No</td>
                  <td>Month First, Then Day</td>
                  <td>0</td>
                  <td>0.000000</td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleUpdateOpen}
                  >
                    Edit
                  </td>
                  <td>Delete</td>
                  <td>Task</td>
                  <td>Rates</td>
                </tr>
                <tr>
                  <td>Domestic</td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td>BDT</td>
                  <td>GMT + 6</td>
                  <td>Dummy Data</td>
                  <td>00</td>
                  <td>Dummy Data</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0.1</td>
                  <td>No</td>
                  <td>Month First, Then Day</td>
                  <td>0</td>
                  <td>0.000000</td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td>
                    <Select
                      options={serviceFamilyOption}
                      value={{ label: serviceLabel, value: serviceValue }}
                      onChange={(opt) =>
                        selectServiceFamily(opt.label, opt.value)
                      }
                      name="serviceFamily"
                      id="serviceFamily"
                      isDisabled={!editMode}
                    />
                  </td>
                  <td
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleUpdateOpen}
                  >
                    Edit
                  </td>
                  <td>Delete</td>
                  <td>Task</td>
                  <td>Rates</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RatePlan;
