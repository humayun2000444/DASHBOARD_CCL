import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CDRServices from "../../../apiServices/CDRServices/CDRServices";
import CircularProgress from "@mui/material/CircularProgress";

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

  const filterLabelStyle = {
    width: "150px",
    height: "43px",
    backgroundColor: "#174678",
    color: "white",
    padding: "7px 8px",
    textAlign: "end",
    borderRadius: "4px",
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

  const tableHeaders = [
    // "Ext.",
    "Caller Name",
    "Caller Number",
    "Caller Destination",
    "Destination",
    "Recording",
    "Date",
    "Time",
    "Direction",
    // "TTA",
    // "PDD",
    // "MOS",
    "Duration",
    "Status",
    "Hangup Cause",
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCDRData = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const data = await CDRServices.fetchAllCDRData();
        console.log(data);
        setTableData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    fetchCDRData();
  }, []);

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${day}/${month}/${year}`;
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds}${ampm}`;
  };

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes}min `;
    }
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedDuration += `${seconds}s`;
    }
    return formattedDuration.trim();
  };

  return (
    <div>
      <Card>
        <CardBody>
          {/* Menu Section */}

          <div className="d-flex justify-content-between mb-3">
            <div>
              <h3 style={pageTitleStyle}>Call Detail Records</h3>
            </div>

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

          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Direction</p>
                </div>
                <select
                  class="form-select mt-2 mr-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected></option>
                  {directionArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>

                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "57px",
                  }}
                >
                  <option selected></option>
                  <option value="a-leg">a-leg</option>
                  <option value="b-leg">b-leg</option>
                </select>
              </div>

              <div className="mb-1 d-flex">
                <div className="mr-2" style={filterLabelStyle}>
                  <p>Start Range</p>
                </div>

                <input
                  className="mt-2 mr-2"
                  type="date"
                  style={{
                    width: "103px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                />

                <input
                  className="mt-2"
                  type="date"
                  style={{
                    width: "103px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                />
              </div>

              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>TTA (Sec)</p>
                </div>
                <input
                  type="text"
                  placeholder="Minimun"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mr-2 mt-2"
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mt-2"
                />
              </div>

              <div className="mb-1 d-flex">
                <div className="mr-2" style={filterLabelStyle}>
                  <p>Call Center Queue</p>
                </div>
                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "26px",
                  }}
                >
                  <option selected></option>
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Status</p>
                </div>
                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected></option>
                  {statusArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-1 d-flex">
                <div className="mr-2" style={filterLabelStyle}>
                  <p>Duration (Sec)</p>
                </div>
                <input
                  type="text"
                  placeholder="Minimun"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mr-2 mt-2"
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mt-2"
                />
              </div>

              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Hangup Cause</p>
                </div>
                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected></option>
                  {hangupCauseArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Extension</p>
                </div>
                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected></option>
                  {extensionArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-1 d-flex">
                <div className="mr-2" style={filterLabelStyle}>
                  <p>Caller Destination</p>
                </div>
                <input
                  type="text"
                  style={{
                    width: "164px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mr-2 mt-2"
                />
              </div>

              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Recording</p>
                </div>
                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "100px",
                    height: "28px",
                    width: "57px",
                  }}
                >
                  <option selected></option>
                  {recordingArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Caller ID</p>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mr-2 mt-2"
                />
                <input
                  type="text"
                  placeholder="Number"
                  style={{
                    width: "75px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mt-2"
                />
              </div>

              <div className="mb-1 d-flex">
                <div className="mr-2" style={filterLabelStyle}>
                  <p>Destination (Sec)</p>
                </div>
                <input
                  type="text"
                  style={{
                    width: "164px",
                    height: "28px",
                    padding: "4px 6px",
                    borderRadius: "100px",
                  }}
                  className="mt-2"
                />
              </div>

              <div className="mb-1 d-flex">
                <div style={filterLabelStyle} className="mr-2">
                  <p>Order</p>
                </div>
                <select
                  class="form-select mt-2 mr-2"
                  style={{
                    borderRadius: "134px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected>Start</option>
                  {orderStartArray?.map((singleElement, index) => (
                    <option value={singleElement} key={index}>
                      {singleElement}
                    </option>
                  ))}
                </select>

                <select
                  class="form-select mt-2"
                  style={{
                    borderRadius: "97px",
                    height: "28px",
                    width: "86px",
                  }}
                >
                  <option selected>Descending</option>

                  <option>Ascending</option>
                </select>
              </div>
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

          {/* Call Record Details Table Section */}

          {/* <div className="mt-4">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  {tableHeaders?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.callerIdName}</TableCell>
                    <TableCell>{row.callerIdNumber}</TableCell>
                    <TableCell>{row.callerDestination}</TableCell>
                    <TableCell>{row.destinationNumber}</TableCell>
                    <TableCell>
                      {row.recordName === null ? "no" : row.recordName}
                    </TableCell>
                    <TableCell>{getDate(row.startStamp)}</TableCell>
                    <TableCell>{getTime(row.startStamp)}</TableCell>
                    <TableCell>{row.direction}</TableCell>
                    <TableCell>{formatDuration(row.duration)}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.hangupCause}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div> */}

          {loading ? (
            <div className="d-flex justify-content-center">
              <CircularProgress />
            </div>
          ) : (
            // Table Section when not loading
            <div className="mt-4">
              <Table id="table-to-xls" className="table-sm table-bordered">
                <TableHead className="thead-uapp-bg">
                  <TableRow style={{ textAlign: "center" }}>
                    <th>Caller Name</th>
                    <th>Caller Number</th>
                    <th>Caller Destination</th>
                    <th>Destination</th>
                    <th>Recording</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Direction</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Hangup Cause</th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.callerIdName}</TableCell>
                      <TableCell>{row.callerIdNumber}</TableCell>
                      <TableCell>{row.callerDestination}</TableCell>
                      <TableCell>{row.destinationNumber}</TableCell>
                      <TableCell>
                        {row.recordName === null ? "no" : row.recordName}
                      </TableCell>
                      <TableCell>{getDate(row.startStamp)}</TableCell>
                      <TableCell>{getTime(row.startStamp)}</TableCell>
                      <TableCell>{row.direction}</TableCell>
                      <TableCell>{formatDuration(row.duration)}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.hangupCause}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CDR;
