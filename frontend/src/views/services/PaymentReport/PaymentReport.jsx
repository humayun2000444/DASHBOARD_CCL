import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import Select from "react-select";
import { Card, CardBody } from "reactstrap";

const PaymentReport = () => {
  const [apiData, setApiData] = useState([]);

  const tableHeaders = [
    "Payment From",
    "Payment Type",
    "Payment Amount",
    "Payment Date",
    "Payment REference",
    "Payment Details",
    "Inserted By",
  ];
  const tableBody = [
    {
      company: "Telstra International Limited",
      serviceType: "Carrier Payment",
      transactionId: 168656,
      date: "12 May, 2024",
      additionalInfo: "NA",
      notes: "",
      user: "Md. Sazzad Islam",
    },
    {
      company: "Telstra International Limited",
      serviceType: "Carrier Payment",
      transactionId: 268656,
      date: "12 May, 2024",
      additionalInfo: "NA",
      notes: "",
      user: "Md. Sazzad Islam",
    },
  ];

  return (
    <div>
      {/* breadcrumb section */}

      <span className="mr-2">Dashboard</span>
      <span>
        <i class="fas fa-chevron-right"></i>
      </span>
      <span className="ml-2">Payment Report</span>

      <h1 className="mt-3">Payment Report</h1>

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
                  Payment For
                </span>
                <Select className="w-50" placeholder="Select" />
              </div>

              <div className="mt-4" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  All
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Carrier Outbound Invoice Amount
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Credit Note Adjustment{" "}
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Debit Adjustment For Transit Carrier
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  OB Balance Adjustment
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Credit Adjustment
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Debit Adjustment
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Carrier payment
                </span>
              </div>

              <div className="mt-2" style={{ marginLeft: "95px" }}>
                <input
                  type="checkbox"
                  className=""
                  style={{ border: "1px solid rgba(0,0,0,.125)" }}
                />
                <span
                  className="ml-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Security Deposite
                </span>
              </div>

              <div className="mb-3 mt-4 d-flex">
                <span
                  className="mr-5 mt-2"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Carrier
                </span>
                <Select className="w-50 ml-4" placeholder="Select" />
              </div>

              <div className="mt-4">
                <span
                  className="mr-4"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Date Range
                </span>
                <input
                  type="date"
                  className="mr-3 ml-1 pl-2"
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
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary mr-3">Show Report</button>
                <button className="btn btn-danger">Reset</button>
              </div>
            </div>
          </div>

          {/* data show section */}

          <h1 className="mt-5">Customer Payment List</h1>

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
                  <>
                    <tr>
                      <td>{item?.company}</td>
                      <td>{item?.serviceType}</td>
                      <td>{item?.transactionId}</td>
                      <td>{item?.date}</td>
                      <td>{item?.additionalInfo}</td>
                      <td>{item?.notes}</td>
                      <td>{item?.user}</td>
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

export default PaymentReport;
