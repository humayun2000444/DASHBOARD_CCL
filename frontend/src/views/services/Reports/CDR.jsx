import React from "react";
import { Card, CardBody } from "reactstrap";
import CDRDateSelect from "./CDRDateSelect";
import CDRInputDouble from "./CDRInputDouble";
import CDRInputSingle from "./CDRInputSingle";
import CDRSelectDouble from "./CDRSelectDouble";
import CDRSelectSingle from "./CDRSelectSingle";
import CDRTable from "./CDRTable";

const CDR = () => {
  const pageTitleStyle = {
    fontSize: "17px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
  };

  const buttonStyle = {
    padding: "7px 20px",
  };

  const paragraphStyle = {
    fontSize: "12px",
    color: "#5f5f5f",
    fontFamily: "Inter, sans-serif",
  };

  const directionArray = ["Inbound", "Outbound", "Local"];

  const statusArray = [
    "Answered",
    "Answer",
    "Busy",
    "Missed",
    "Voicemail",
    "Cancelled",
    "Failed",
  ];

  const hangupCauseArray = [
    "Allotted Timeout",
    "Attended Transfer",
    "Blind Transfer",
    "Call Rejected",
    "Chan Not Implemented",
    "Destination Out Of Order",
    "Exchange Routing Error",
    "Incompatible Destination",
    "Invalid Number Format",
    "Lose Race",
    "Manager Request",
    "Mandatory Ie Missing",
    "Media Timeout",
    "Network Out Of Order",
    "None",
    "Normal Clearing",
    "Normal Temporary Failure",
    "Normal Unspecified",
    "No Answer",
    "No Route Destination",
    "No User Response",
    "Originator Cancel",
    "Picked Off",
    "Recovery On Timer Expire",
    "Requested Chan Unavail",
    "Subscriber Absent",
    "System Shutdown",
    "Unallocated Number",
    "User Busy",
    "User Not Registered",
  ];

  const extensionArray = [
    "09646400100",
    "09646400101",
    "09646400102",
    "09646400103",
    "09646400104",
    "09646400105",
    "09646400106",
    "09646400107",
    "09646699607",
    "09646710720",
    "09646801850",
    "09646896378",
    "09646999999",
    "501",
  ];

  const recordingArray = ["True", "False"];

  const orderStartArray = [
    "Extension",
    "Domain",
    "Caller Name",
    "Caller Number",
    "Caller Destination",
    "Destination",
    "TTA",
    "Duration",
    "PDD",
    "MOS",
    "Hangup Cause",
  ];

  return (
    <div>
      <Card
        style={{
          borderRadius: "0",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <CardBody>
          {/* Menu Section */}
          <div className="d-flex justify-content-between mb-3">
            <div>
              <button className="btn btn-primary mr-4 mb-2" style={buttonStyle}>
                <span className="fas fa-chart-area fa-fw mr-1"></span>{" "}
                STATISTICS
              </button>
              <button className="btn btn-primary mr-2 mb-2" style={buttonStyle}>
                <span className="fas fa-sync-alt fa-fw mr-1"></span> REFRESH
              </button>
              <button className="btn btn-primary mr-2 mb-2" style={buttonStyle}>
                {" "}
                <span className="fas fa-file-export fa-fw mr-1"></span> EXPORT
              </button>
              <button className="btn btn-primary mr-4 mb-2" style={buttonStyle}>
                {" "}
                <span className="fas fa-globe fa-fw mr-1"></span> SHOW ALL
              </button>
              <button className="btn btn-primary mr-2 mb-2" style={buttonStyle}>
                {" "}
                <span className="fas fa-chevron-left fa-fw mr-1"></span> BACK
              </button>
              <button className="btn btn-primary mb-2" style={buttonStyle}>
                {" "}
                <span className="fas fa-chevron-right fa-fw mr-1"></span> NEXT
              </button>
            </div>
          </div>

          <p style={paragraphStyle}>
            Call Detail Records (CDRs) are detailed information on the calls.
            The information contains source, destination, duration, and other
            useful call details. Use the fields to filter the information for
            the specific call records that are desired. Records in the call list
            can be saved locally using the Export button.
          </p>

          {/* Filter Section */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBlock: "1rem 2rem",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <CDRSelectDouble
                text={"direction"}
                selectArr1={directionArray}
                selectArr2={["a-leg", "b-leg"]}
              />
              <CDRSelectDouble
                text={"order"}
                selectArr1={orderStartArray}
                selectArr2={["Ascending", "Descending"]}
              />
              <CDRDateSelect text={"start range"} />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <CDRSelectSingle text={"status"} selectArr1={statusArray} />
              <CDRSelectSingle
                text={"hangup cause"}
                selectArr1={hangupCauseArray}
              />
              <CDRSelectSingle
                text={"Call center queue"}
                selectArr1={["Option 1", "Option 2"]}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <CDRSelectSingle text={"Extension"} selectArr1={extensionArray} />
              <CDRSelectSingle text={"recording"} selectArr1={recordingArray} />
              <CDRInputSingle text={"Destination (Sec)"} />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <CDRInputDouble
                text={"Caller Id"}
                placeholder1={"Name"}
                placeholder2={"Number"}
              />
              <CDRInputDouble
                text={"Duration (Sec)"}
                placeholder1={"Minimum"}
                placeholder2={"Maximum"}
              />
              <CDRInputSingle text={"Caller Destination"} />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mr-4" style={buttonStyle}>
              <span className="fas fa-tools fa-fw mr-1"></span>ADVANCED
            </button>
            <button className="btn btn-primary mr-2" style={buttonStyle}>
              <span className="fas fa-undo-alt fa-fw mr-1"></span>RESET
            </button>
            <button className="btn btn-primary" style={buttonStyle}>
              <span className="fas fa-search fa-fw mr-1"></span>SEARCH
            </button>
          </div>
          <div className="mt-4">
            <CDRTable dashboardCDR={false} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CDR;
