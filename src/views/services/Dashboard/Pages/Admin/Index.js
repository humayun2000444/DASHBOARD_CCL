import React, { useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import cuser1 from "../../../../../assets/img/cuser1.svg";
import down from "../../../../../assets/img/down.svg";
import camera2 from "../../../../../assets/img/camera2.svg";
import Chart from "react-apexcharts";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([44, 55, 41, 17, 15]);
  const [Labels, setLabels] = useState(["A", "B", "C", "D", "E"]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img src={plusicon} className="img-fluid dashbard-img-style1" />
              <span className="std-dashboard-style3">Add Student</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
              />

              <Drawer placement="right" onClose={onClose} open={open}>
                <div className="">
                  <Card>
                    <CardBody>
                      <span className="consultant-news-feed-style">
                        NEWS FEED
                      </span>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user1} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you to our new
                              "Become an Education Consultant...
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                read more
                              </span>
                            </span>

                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <img src={capture} className="img-fluid" />
                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <div className="d-flex justify-content-around my-2">
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                            </div>

                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <div>
                    <Card>
                      <CardBody>
                        <span className="consultant-news-feed-style">
                          NOTICE
                        </span>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div className="">
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div>
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card>
                    <CardBody>
                      <div>
                        <img src={gift} className="img-fluid" />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      {/* Status reports start */}

      <div className="row">
        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">Total Application</span>
              <br />
              <span className="pvdadmin-span-style2">1451</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">
                Applications In Process
              </span>
              <br />
              <span className="pvdadmin-span-style2">500</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">Unconditional Offer</span>
              <br />
              <span className="pvdadmin-span-style2">50</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">Total Registered</span>
              <br />
              <span className="pvdadmin-span-style2">70</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">Rejected / Cancelled</span>
              <br />
              <span className="pvdadmin-span-style2">70</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">
                Withdrawn Application
              </span>
              <br />
              <span className="pvdadmin-span-style2">70</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">New Students</span>
              <br />
              <span className="pvdadmin-span-style2">70</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <CardBody>
              <span className="pvdadmin-span-style1">New Consultants</span>
              <br />
              <span className="pvdadmin-span-style2">70</span>
              <br />
              <br />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* status reports end */}

      {/* table start */}

      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">New Applications</span>

            <Table borderless responsive className="mt-3">
              <thead style={{ backgroundColor: "#EEF3F4" }}>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>University</th>
                  <th>Admission Officer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#STD002628 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mr Stephen Mason
                      </span>
                    </div>
                  </td>
                  <td>Anglia Ruskin University – Navitas....</td>
                  <td>@Syed Istiake</td>
                  <td>15 June 2022 </td>
                </tr>

                <tr>
                  <td>#STD002628 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mr Stephen Mason
                      </span>
                    </div>
                  </td>
                  <td>Anglia Ruskin University – Navitas....</td>
                  <td>@Syed Istiake</td>
                  <td>15 June 2022 </td>
                </tr>

                <tr>
                  <td>#STD002628 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mr Stephen Mason
                      </span>
                    </div>
                  </td>
                  <td>Anglia Ruskin University – Navitas....</td>
                  <td>@Syed Istiake</td>
                  <td>15 June 2022 </td>
                </tr>

                <tr>
                  <td>#STD002628 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mr Stephen Mason
                      </span>
                    </div>
                  </td>
                  <td>Anglia Ruskin University – Navitas....</td>
                  <td>@Syed Istiake</td>
                  <td>15 June 2022 </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* table end */}

      {/* progress report start

<Card>
      <CardBody>
        <div className='d-flex flex-wrap justify-content-between'>
          <span className='const-target-style'>Progress Report</span>
          <div className='d-flex flex-wrap justify-content-between'>
            <div style={{cursor: 'pointer'}}>
              <span>Intake</span>
              <img className='img-fluid ml-2' src={down} />
            </div>
            <div className='ml-3' style={{cursor: 'pointer'}}>
              <span>Monthly</span>
              <img className='img-fluid ml-2' src={down} />
            </div>
            <div className='ml-3' style={{cursor: 'pointer'}}>
              <span>Daily</span>
              <img className='img-fluid ml-2' src={down} />
            </div>
          </div>
        </div>
        <hr/>

        <div>
          <span className='application-count-style'>Intake July 2022-October 2022</span>
        </div>

        <div className='row my-4'>

          <div className='col-md-3'>



    <div className='d-flex justify-content-between'>


    <div className='d-flex'>
    <div className='custom-conslt-div1'></div>
    <p style={{fontWeight: '500', position: 'relative', top: '4px'}}>Total Application</p>
    
    </div>

    <div>
      <span style={{ position: 'relative', top: '4px'}}>22</span>
    </div>


    </div>

    <div className='d-flex justify-content-between'>


    <div className='d-flex'>
    <div className='custom-conslt-div2'></div>
    <p style={{fontWeight: '500', position: 'relative', top: '4px'}}>Submitted To University </p>
    
    </div>

    <div>
      <span style={{ position: 'relative', top: '4px'}}>22</span>
    </div>


    </div>

    <div className='d-flex justify-content-between'>


    <div className='d-flex'>
    <div className='custom-conslt-div3'></div>
    <p style={{fontWeight: '500', position: 'relative', top: '4px'}}>Unconditional Offer</p>
    
    </div>

    <div>
      <span style={{ position: 'relative', top: '4px'}}>22</span>
    </div>


    </div>

    <div className='d-flex justify-content-between'>


    <div className='d-flex'>
    <div className='custom-conslt-div4'></div>
    <p style={{fontWeight: '500', position: 'relative', top: '4px'}}>Total Registered</p>
    
    </div>

    <div>
      <span style={{ position: 'relative', top: '4px'}}>22</span>
    </div>


    </div>

    <div className='d-flex justify-content-between'>


    <div className='d-flex'>
    <div className='custom-conslt-div5'></div>
    <p style={{fontWeight: '500', position: 'relative', top: '4px'}}>Total Rejected</p>
    
    </div>

    <div>
      <span style={{ position: 'relative', top: '4px'}}>22</span>
    </div>


    </div>

          </div>

      

       <div className='col-md-5'>

       <Chart options={options} series={series} type="donut" width="100%" height='100%' />


        </div>

      
        dropdown section

          <div className='col-md-4'>

          

          </div>

        </div>

      </CardBody>
     </Card>

progress report end */}

      {/* consultant transaction list table start */}

      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">Consultant Transaction List</span>

            <Table borderless responsive className="mt-3">
              <thead style={{ backgroundColor: "#EEF3F4" }}>
                <tr>
                  <th>Consultant ID</th>
                  <th>Consultant Name</th>
                  <th>Total In Flow</th>
                  <th>Total Out Flow</th>
                  <th>Total Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#AG009 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mirela-Gabriela Porcisteanu
                      </span>
                    </div>
                  </td>
                  <td>20472.5</td>
                  <td>1448</td>
                  <td>5985</td>
                  <td
                    style={{
                      textDecoration: "underline",
                      color: "#164677",
                      textDecorationColor: "#164677",
                    }}
                  >
                    Details
                  </td>
                </tr>
                <tr>
                  <td>#AG00955 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mirela-Gabriela Porcisteanu
                      </span>
                    </div>
                  </td>
                  <td>20472.5</td>
                  <td>1448</td>
                  <td>5985</td>
                  <td
                    style={{
                      textDecoration: "underline",
                      color: "#164677",
                      textDecorationColor: "#164677",
                    }}
                  >
                    Details
                  </td>
                </tr>
                <tr>
                  <td>#AG009 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mirela-Gabriela Porcisteanu
                      </span>
                    </div>
                  </td>
                  <td>20472.5</td>
                  <td>1448</td>
                  <td>5985</td>
                  <td
                    style={{
                      textDecoration: "underline",
                      color: "#164677",
                      textDecorationColor: "#164677",
                    }}
                  >
                    Details
                  </td>
                </tr>
                <tr>
                  <td>#AG009 </td>
                  <td>
                    <div>
                      <img
                        src={cuser1}
                        style={{ height: "28px", width: "28px" }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Mirela-Gabriela Porcisteanu
                      </span>
                    </div>
                  </td>
                  <td>20472.5</td>
                  <td>1448</td>
                  <td>5985</td>
                  <td
                    style={{
                      textDecoration: "underline",
                      color: "#164677",
                      textDecorationColor: "#164677",
                    }}
                  >
                    Details
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* consultant transaction list table end */}
    </React.Fragment>
  );
};

export default Admin;
