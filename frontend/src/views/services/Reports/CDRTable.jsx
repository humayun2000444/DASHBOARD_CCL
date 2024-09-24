import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import CDRServices from "../../../apiServices/CDRServices/CDRServices";

const CDRTable = ({ dashboardCDR }) => {
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

  const token = JSON.parse(localStorage.getItem("userInfo"));
  const role = token.authRoles[0].name;
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCDRData = async () => {
      setLoading(true);
      try {
        if (role === "ROLE_ADMIN") {
          const data = await CDRServices.fetchAllCDRData();
          setTableData(data);
        } else if (role === "ROLE_USER") {
          const data = await CDRServices.fetchPartnerPrefixes(username);
          const allPrefixArr = data.map((item) => {
            return item.prefix;
          });

          const userCallsHistory = await CDRServices.fetchUserCallHistory({
            callerIdNumber: [...allPrefixArr],
            startStamp: null,
            endStamp: null,
            limit: 30,
            page: 1,
          });
          setTableData(userCallsHistory);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <Table id="table-to-xls" className="table-sm table-bordered">
          <TableHead className="thead-uapp-bg">
            <TableRow style={{ textAlign: "center", borderRadius:"10px" }}>
              <th>Caller Name</th>
              <th>Caller Number</th>
              <th>Caller Destination</th>
              {!dashboardCDR && <th>Destination</th>}
              {!dashboardCDR && <th>Recording</th>}
              <th>Date</th>
              <th>Time</th>
              {!dashboardCDR && <th>Direction</th>}
              <th>Duration</th>
              <th>Status</th>
              {!dashboardCDR && <th>Hangup Cause</th>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row, i) =>
              dashboardCDR ? (
                i <= 9 && (
                  <TableRow key={i}>
                    <TableCell>{row.callerIdName}</TableCell>
                    <TableCell>{row.callerIdNumber}</TableCell>
                    <TableCell>{row.callerDestination}</TableCell>

                    <TableCell>{getDate(row.startStamp)}</TableCell>
                    <TableCell>{getTime(row.startStamp)}</TableCell>
                    <TableCell>{formatDuration(row.duration)}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow key={i}>
                  <TableCell>{row.callerIdName}</TableCell>
                  <TableCell>{row.callerIdNumber}</TableCell>
                  <TableCell>{row.callerDestination}</TableCell>
                  {!dashboardCDR && (
                    <TableCell>{row.destinationNumber}</TableCell>
                  )}
                  {!dashboardCDR && (
                    <TableCell>
                      {row.recordName === null ? "no" : row.recordName}
                    </TableCell>
                  )}
                  <TableCell>{getDate(row.startStamp)}</TableCell>
                  <TableCell>{getTime(row.startStamp)}</TableCell>
                  {!dashboardCDR && <TableCell>{row.direction}</TableCell>}
                  <TableCell>{formatDuration(row.duration)}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  {!dashboardCDR && <TableCell>{row.hangupCause}</TableCell>}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CDRTable;
