import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import get from "../../../helpers/get";
import Loader from "../Search/Loader/Loader";

const ComissionTransactionDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  // useEffect(()=>{

  //     get(`AccountTransaction/Details/${id}`)
  //     .then(res => {

  //         setData(res);
  //         setLoading(false);
  //     })

  // },[loading])

  const backToDashboard = () => {
    history.push("/accountTransaction");
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Comission Details</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToDashboard}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to
                  Transaction List
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
                        <>
                          {data?.consultant?.firstName}{" "}
                          {data?.consultant?.lastName}
                        </>
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
                        <>{handleDate(data?.transactionDate)}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Transaction Details:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.details}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Inflow/Credit:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.credit}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Outflow/Debit:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.debit}</>
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

export default ComissionTransactionDetails;
