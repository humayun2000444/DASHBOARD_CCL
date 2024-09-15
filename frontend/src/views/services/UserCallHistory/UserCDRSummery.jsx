// UserCDRSummery.js
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const UserCDRSummery = () => {
  // Extract didNumber from the URL
  const { didNumber } = useParams();
  // Use useLocation to access the state passed from the UserCallHistory component
  const location = useLocation();
  const { tableHeaders, item } = location.state || {};

  return (
    <div>
      <Card className="mt-3">
        <CardBody>
          <h3>User CDR Summary for DID: {didNumber}</h3>

          <div className="mt-3">
            {item ? (
              <Table id="table-to-xls" className="table-sm table-bordered">
                <TableHead className="thead-uapp-bg">
                  <TableRow style={{ textAlign: "center" }}>
                    {tableHeaders?.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <td>{item?.didNumber}</td>
                    <td>{item?.totalCalls}</td>
                    <td>{item?.missedCalls}</td>
                    <td>{item?.incomingCalls}</td>
                    <td>{item?.outgoingCalls}</td>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <p>No data available for this DID number.</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCDRSummery;
