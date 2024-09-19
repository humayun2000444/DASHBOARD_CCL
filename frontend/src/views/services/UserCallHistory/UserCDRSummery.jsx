// UserCDRSummery.js
import { TableCell } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import CDRServices from "../../../apiServices/CDRServices/CDRServices";

const UserCDRSummery = () => {
  // Extract didNumber from the URL
  const { didNumber } = useParams();
  const [callHistory, setCallHistory] = useState([]);
  console.log(callHistory);
  useEffect(() => {
    const fetchData = async () => {
      const data = await CDRServices.fetchUserCallHistory({
        callerIdNumber: [didNumber],
        startStamp: "2023-07-21T18:50:16Z",
        endStamp: "2026-09-01T18:50:16Z",
        limit: 50,
        page: 1,
      });
      setCallHistory(data);
    };

    fetchData();
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
      <Card className="mt-3">
        <CardBody>
          <h3>User CDR Summary for DID: {didNumber}</h3>

          {/* <div className="mt-3">
            {callHistory ? (
              <Table id="table-to-xls" className="table-sm table-bordered">
                <TableHead className="thead-uapp-bg">
                  <TableRow style={{ textAlign: "center" }}>
                    {tableHeaders?.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {callHistory.map((history) => {
                    <TableRow>
                      <td>{history?.callerIdNumber}</td>
                      <td>{history?.totalCalls}</td>
                      <td>{history?.missedCalls}</td>
                      <td>{history?.incomingCalls}</td>
                      <td>{history?.outgoingCalls}</td>
                    </TableRow>;
                  })}
                </TableBody>
              </Table>
            ) : (
              <p>No data available for this DID number.</p>
            )}
          </div> */}

          <Table id="table-to-xls" className="table-sm table-bordered">
            <TableHead className="thead-uapp-bg">
              <TableRow style={{ textAlign: "center" }}>
                {/* <th>Caller Number</th> */}
                <th align="right">Destination Number</th>
                <th align="right">Date</th>
                <th align="right">Time</th>
                <th align="right">Duration</th>
                <th align="right">Direction</th>
                <th align="right">Status</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {callHistory.map((row, i) => (
                <TableRow key={row?.callerIdNumber}>
                  {/* <TableCell>{row?.callerIdNumber}</TableCell> */}
                  <TableCell>{row?.callerDestination}</TableCell>
                  <TableCell>{getDate(row?.startStamp)}</TableCell>
                  <TableCell>{getTime(row?.startStamp)}</TableCell>
                  <TableCell>{formatDuration(row?.duration)}</TableCell>
                  <TableCell> {row?.direction}</TableCell>
                  <TableCell> {row?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCDRSummery;
