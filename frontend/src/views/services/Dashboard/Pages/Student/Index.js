import React, { useEffect, useState } from "react";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import banner from "../../../../../assets/img/banner.svg";
import arrowright from "../../../../../assets/img/arrowright.svg";
import tick from "../../../../../assets/img/tick.svg";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import axios from "axios";
import { rootUrl } from "../../../../../constants/constants";

const Student = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  const { addToast } = useToasts();
  const history = useHistory();
  const [info, setInfo] = useState(false);
  const [applicationinfo, setApplicationInfo] = useState([]);

  // useEffect(()=>{

  //     get(`Student/CheckIfStudentIsConsultant/${currentUser?.displayEmail}`)
  //     .then(res => {

  //       setInfo(res);
  //     })

  //     get(`StudentApplication/Index/${referenceId}`).then((res) => {

  //       setApplicationInfo(res);
  //     });
  // },[])

  const makeStudentConsultant = () => {
    history.push(`/becomeConsultant/${referenceId}`);
  };

  const goToStudentProfile = () => {
    history.push(`/studentProfile/${referenceId}`);
  };

  return (
    <React.Fragment>
      <div></div>

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
          {/* 

             <div style={{cursor: 'pointer'}}>

              <div className='std-dashboard-style4'>


              </div>

               <div className='std-dashboard-style5'>
               <img src={plusicon} className='img-fluid dashbard-img-style1' />
               <span className='std-dashboard-style3'>Add Student</span>
               </div>
             </div> */}

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div>
              <img src={Vectorbeat} className="img-fluid dashbard-img-style2" />
            </div>
          </div>
        </div>
      </div>

      {/* Student Profile Redirect Section Start*/}

      <div style={{ position: "relative", top: "-20px" }}>
        <div className="px-4 progress-card-style-std-dashboard">
          <div class="stepper-wrapper">
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Application Information</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Student Profile</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Education and Qualifications</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">English Language</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Employeement History</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Reference</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Personal Statement</div>
            </div>
            <div class="stepper-item">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Other Information</div>
            </div>
            <div class="stepper-item">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Upload Document</div>
            </div>
            <div class="stepper-item">
              <div class="step-counter">
                <img src={tick} className="img-fluid" />
              </div>
              <div className="text-center">Declaration</div>
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <div className="row" style={{ height: "105px", marginTop: "30px" }}>
              <div className="col-md-2">
                <span className="std-dashboard-style7">APP ID</span>

                <div className="mt-2">
                  <span
                    className="std-dashboard-style8"
                    onClick={goToStudentProfile}
                    style={{ cursor: "pointer" }}
                  >
                    #{currentUser?.userViewId}
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <span className="std-dashboard-style7">Subject</span>

                <div className="mt-2">
                  <span className="std-dashboard-style9">
                    Business Management (including foundation year) BA (Hons)
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <span className="std-dashboard-style7">University</span>

                <div className="mt-2">
                  <span className="std-dashboard-style9">
                    London Metropolitan University
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <span className="std-dashboard-style7">Intake</span>

                <div className="mt-2">
                  <span className="std-dashboard-style9">January 2023</span>
                </div>
              </div>

              <div className="col-md-2">
                <span className="std-dashboard-style7">Status</span>

                <div className="mt-2"></div>
                <span className="std-dashboard-style9">
                  Application In Process
                </span>
              </div>

              <div className="col-md-2">
                <div className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    style={{ position: "relative", top: "21px" }}
                  >
                    Check and Submit
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Student Profile Redirect Section End*/}

      {/* Banner Image and Consultant Section Start */}

      <div className="row">
        <div className="col-md-8">
          {info ? null : (
            <>
              <img src={banner} className="w-100" />

              <Card style={{ marginTop: "24px" }}>
                <CardBody>
                  <div
                    style={{ height: "60px" }}
                    className="d-flex flex-wrap align-items-center justify-content-between px-4"
                  >
                    <span className="std-dashboard-style8">
                      Why you waiting for?
                    </span>

                    <Button color="primary" onClick={makeStudentConsultant}>
                      Become Consultant
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
        <div className="col-md-4">
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="cosultant-image-style-std-dashboard"></div>

                <div>
                  <div className="consultant-info-style-std-dashboard">
                    <span className="consultant-name-style-student-dashboard">
                      Roxana-Andreea Beleag
                    </span>
                    <br />
                    <span className="consultant-role-student-dashboard">
                      Consultant
                    </span>
                  </div>

                  <div className="necessary-link-student-dashboard">
                    <Link style={{ textDecorationColor: "#164677" }}>
                      <span className="consultant-role-student-dashboard2">
                        beleagroxana@yahoo.com
                      </span>
                    </Link>
                    <br />
                    <Link style={{ textDecorationColor: "#164677" }}>
                      <span className="consultant-role-student-dashboard2">
                        07340 543526
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <iframe
                className="w-100"
                height="177"
                src="https://www.youtube.com/embed/V685_4XUz2Q"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style={{ marginBottom: "19px" }}
              ></iframe>

              <div>
                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#164677" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      FAQ
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#164677" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      BLOG
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#164677" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      CONTACT
                    </span>
                  </Link>
                </li>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Banner Image and Consultant Section End */}
    </React.Fragment>
  );
};

export default Student;
