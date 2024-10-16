import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Card, CardBody } from "reactstrap";

const RechargeBalance = () => {
  const tableHeaders = [
    "DID Numbers",
    "Last Balance",
    "Current Balance",
    "Account Type",
    "Recharge Now",
  ];

  const tableBody = [
    {
      didNumber: "09646699607",
      lastBalance: "4500",
      currentBalance: "320",
      accountType: "Prepaid",
      rechargeNow: "Add Balane",
    },
    {
      didNumber: "09646699608",
      lastBalance: "4500",
      currentBalance: "320",
      accountType: "Postpaid",
      rechargeNow: "Add Credit",
    },
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
          <div>
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
                    <td>{item?.didNumber}</td>
                    <td>{item?.lastBalance}</td>
                    <td>{item?.currentBalance}</td>
                    <td>{item?.accountType}</td>
                    <td>
                      <Button>Add Balance</Button>
                    </td>
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

export default RechargeBalance;
