import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const UserCallHistory = () => {
  const tableHeaders = [
    "DID Number",
    "Total Calls",
    "Missed Calls",
    "Incoming Calls",
    "Outgoing Calls",
  ];

  const tableBody = [
    {
      didNumber: "09646699607",
      totalCalls: "4500",
      missedCalls: "320",
      incomingCalls: "2458",
      outgoingCalls: "1247",
    },
    {
      didNumber: "09646699678",
      totalCalls: "2500",
      missedCalls: "320",
      incomingCalls: "2458",
      outgoingCalls: "1247",
    },
  ];

  return (
    <div>
      <Card className="mt-3">
        <CardBody>
          <h3 className="">User Call History</h3>

          <div className="mt-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  {tableHeaders?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody?.map((item, index) => (
                  <TableRow key={index}>
                    <td>
                      {/* Pass tableHeaders and tableBody (individual item) via the 'state' prop */}
                      <Link
                        to={{
                          pathname: `/userCDRSummery/${item.didNumber}`,
                          state: { tableHeaders, item }, // Passing data here
                        }}
                      >
                        {item?.didNumber}
                      </Link>
                    </td>
                    <td>{item?.totalCalls}</td>
                    <td>{item?.missedCalls}</td>
                    <td>{item?.incomingCalls}</td>
                    <td>{item?.outgoingCalls}</td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCallHistory;
