import React, { useState } from "react";
import Select from "react-select";
import { Card, CardBody } from "reactstrap";

const DialplanDetails = () => {
  const [planName, setPlanName] = useState("Bundle");
  const [priority, setPriority] = useState("10");

  const weightInput = 33;

  return (
    <div>
      {/* breadcrumb section */}

      <span className="mr-2">Dashboard</span>
      <span>
        <i class="fas fa-chevron-right"></i>
      </span>
      <span className="ml-2">Dialplan Details</span>

      <h1 className="mt-3">Dialplan Details</h1>

      {/* card title section */}

      <div
        className="d-flex justify-content-center align-items-center text-white mt-3"
        style={{
          height: "48px",
          backgroundColor: "#1D94AB",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "400" }}>
          Dialplan management based on Call Source:
        </span>
        <span
          className="bg-dark text-white px-3 py-1 ml-2"
          style={{ fontSize: "18px", fontWeight: "600" }}
        >
          10.39.0.10
        </span>
      </div>

      <Card className=" pb-3 pt-2">
        <CardBody>
          {/* buttons section */}

          <div className="d-flex justify-content-between">
            <p style={{ fontSie: "16px", fontWeight: "600" }}>
              Add/Manage Dialplan
            </p>

            <div>
              <button className="btn btn-primary px-4">
                <i class="fa-solid fa-plus"></i>
                <span className="ml-2">Add plan</span>
              </button>
              <button className="btn btn-danger px-4 ml-3">Save Changes</button>
            </div>
          </div>

          {/* filter section */}

          <div className="row mt-2">
            <div className="col-3 d-flex">
              <div
                className="w-50 d-flex justify-content-center align-items-center"
                style={{
                  height: "38px",
                  backgroundColor: "#1D94AB",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Plan Name
                </span>
              </div>
              <input
                value={planName}
                className="w-50 text-center"
                style={{
                  border: "1px solid rgba(0,0,0,.125)",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>

            <div className="col-3 d-flex">
              <div
                className="w-50 d-flex justify-content-center align-items-center"
                style={{
                  height: "38px",
                  backgroundColor: "#1D94AB",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Priority
                </span>
              </div>
              <input
                value={priority}
                className="w-50 text-center"
                style={{
                  border: "1px solid rgba(0,0,0,.125)",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>

            <div className="col-3 d-flex">
              <div
                className="w-50 d-flex justify-content-center align-items-center"
                style={{
                  height: "38px",
                  backgroundColor: "#1D94AB",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Dialplan Type
                </span>
              </div>
              <Select className="w-50 text-center" placeholder="Weighted" />
            </div>
          </div>

          {/* data show with modification section */}

          <div
            className=" ml-2 mt-4 p-3"
            style={{ backgroundColor: "#F8F8F8" }}
          >
            <div className="row">
              <div className="col-3 d-flex">
                <div
                  className="w-50 d-flex justify-content-center align-items-center"
                  style={{
                    height: "38px",
                    backgroundColor: "#1D94AB",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    PREFIX
                  </span>
                </div>
                <input
                  value="09649"
                  className="w-50 text-center"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                />
              </div>

              <div className="col-3  d-flex">
                <div
                  className="w-50 d-flex justify-content-center align-items-center"
                  style={{
                    height: "38px",
                    backgroundColor: "#1D94AB",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    GATEWAY
                  </span>
                </div>
                <input
                  value="09649"
                  className="w-50 text-center"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                />
              </div>

              <div className="col-3  d-flex">
                <div
                  className="w-50 d-flex justify-content-center align-items-center"
                  style={{
                    height: "38px",
                    backgroundColor: "#1D94AB",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    WEIGHT
                  </span>
                </div>
                <input
                  value={`${weightInput}%`}
                  className="w-50 text-center"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                />
              </div>
            </div>

            {/* add row button section */}

            <div className="row mt-3">
              <div className="col-3"></div>

              <div className="col-3">
                <button className="btn btn-primary px-4">
                  <i class="fa-solid fa-plus"></i>
                  <span className="ml-2">Add Row</span>
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DialplanDetails;
