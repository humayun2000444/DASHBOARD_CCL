import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import get from "../../../helpers/get";
import Loader from "../Search/Loader/Loader";

const Details = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  // useEffect(()=>{

  //     get(`WithdrawTransaction/Get/${id}`)
  //     .then(res =>{

  //         setData(res);
  //         setLoading(false);
  //     })

  // },[loading])

  const backToDashboard = () => {
    history.push(`/`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Withdraw Transaction Details</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToDashboard}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardBody>
              <Table className="table-bordered mt-4">
                <tbody>
                  <tr>
                    <td width="40%">
                      <b>Consultant:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.consultantName}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Transaction Code:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionCode}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Transaction Date:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionDate}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Transaction Note:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionNote}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Payment Type:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.paymentType}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Amount:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.amount}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Reference:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.reference}</>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default Details;
