import React from "react";
import Select from "react-select";
import { Card, CardBody } from "reactstrap";
const PaymentEntry = () => {
  return (
    <div>
      {/* breadcrumb section */}

      <span className="mr-2">Dashboard</span>
      <span>
        <i class="fas fa-chevron-right"></i>
      </span>
      <span className="ml-2">Payment Entry</span>

      <h1 className="mt-3">Payment Entry</h1>
      <Card className="mt-3">
        <CardBody>
          <div className="row">
            <div className="col-6">
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Payment For
                </span>
                <Select className="w-50" placeholder="Select" />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Payment Type
                </span>
                <Select className="w-50" placeholder="Select" />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Carrier
                </span>
                <Select className="w-50" placeholder="Select" />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Deposite Amount
                </span>
                <input
                  className="w-50"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "38px",
                  }}
                  type="text"
                />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Deposite Date
                </span>
                <input
                  type="date"
                  className="mr-3 pl-2 w-50"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "38px",
                  }}
                />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Reference
                </span>
                <input
                  className="w-50"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "38px",
                  }}
                  type="text"
                />
              </div>
              <div className="mb-3 d-flex">
                <span
                  className="mr-4 mt-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    width: "160px",
                    textAlign: "right",
                  }}
                >
                  Transaction Details
                </span>
                <textarea
                  className="w-50"
                  style={{
                    border: "1px solid rgba(0,0,0,.125)",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "400",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentEntry;
