// UserCDRSummery.js
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import CDRServices from "../../../apiServices/CDRServices/CDRServices";
import { TableCell } from "@mui/material";

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
                  <TableCell>{row?.startStamp}</TableCell>
                  <TableCell> {row?.duration}</TableCell>
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
