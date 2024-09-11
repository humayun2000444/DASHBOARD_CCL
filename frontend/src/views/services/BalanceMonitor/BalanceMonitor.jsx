import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import Select from "react-select";
import { Card, CardBody } from "reactstrap";

const BalanceMonitor = () => {
  const [apiData, setApiData] = useState([]);

  const tableHeaders = [
    "Balance Date",
    "Application Name",
    "Initial Balance",
    "Payment Amount",
    "Total Min",
    "Total Cost",
    "Current Balance",
  ];
  const tableData = [
    {
      date: "12 Aug, 2024",
      company: "Telstra International Limited",
      totalAmount: -808100.868,
      discount: 0,
      taxAmount: 104153.02,
      taxRate: 1041.53,
      finalAmount: -809142.398,
    },
    {
      date: "13 Aug, 2024",
      company: "Telstra International Limited",
      totalAmount: -808100.868,
      discount: 2,
      taxAmount: 104153.02,
      taxRate: 3041.53,
      finalAmount: -809142.398,
    },
  ];

  return (
    <div>
      {/* breadcrumb section */}

      <span className="mr-2">Dashboard</span>
      <span>
        <i class="fas fa-chevron-right"></i>
      </span>
      <span className="ml-2">Balance Monitoring Report</span>

      <h1 className="mt-3">Balance Monitoring Report</h1>

      <Card className="mt-3">
        <CardBody>
          {/* filter section */}

          <div className="row">
            <div className="col-6">
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Application
                </span>
                <Select className="w-50" placeholder="Select" />
              </div>

              <div>
                <span
                  className="mr-3"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Date Range
                </span>
                <input
                  type="date"
                  className="mr-3 pl-2"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "38px",
                  }}
                />
                <input
                  type="date"
                  className="pl-2"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "38px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-primary mr-3">Show Report</button>
              </div>
            </div>
          </div>

          {/* data show section */}

          <div className="mt-5">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  {tableHeaders?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((item, index) => (
                  <>
                    <tr>
                      <td>{item?.date}</td>
                      <td>{item?.company}</td>
                      <td>{item?.totalAmount}</td>
                      <td>{item?.discount}</td>
                      <td>{item?.taxAmount}</td>
                      <td>{item?.taxRate}</td>
                      <td>{item?.finalAmount}</td>
                    </tr>
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BalanceMonitor;
