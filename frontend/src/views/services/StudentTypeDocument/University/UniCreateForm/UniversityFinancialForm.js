import Axios from "axios";
import React, { createRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Col,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";

const UniversityFinancialForm = () => {

  const [buttonStatus,setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const { univerId } = useParams();

  const history = useHistory();
  const myForm = createRef();

  const location = useLocation();

  let uniId;
  if (location.id) {
    uniId = location.id;
  } else {
    uniId = "";
  }

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    //  watch form data values
    for (var value of subdata.values()) {
    }

      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}FinancialInformation/Create`, subdata, {
        headers: {
          "authorization": AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        const uniID = res.data.result.universityId;

        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push({
              pathname: `/createUniversityFeatures/${univerId}`,
              id: uniID
          })
        } else {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
    
  };

  const redirectToNext = () => {
    history.push(`/createUniversityFeatures/${univerId}`);
  }
  

    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Financial Information</h3>
          {/* <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University
              List
            </span>
          </div> */}
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-4">
                {/* <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Financial Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                </div> */}

                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="UniversityId"
                    name="UniversityId"
                    value={univerId}
                  />
                  {/* <Input type="hidden" id="UniversityId" name="UniversityId" value={localStorage.getItem("editUniId")} /> */}
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Avg. Tution Fee <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="AvarageTutionFee"
                      id="AvarageTutionFee"
                      placeholder="Avarage Tution Fee"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Avg. Living Cost <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="AvarageLivingCost"
                      id="AvarageLivingCost"
                      placeholder="Avarage Living Cost"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Avg. Application Fee{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="AvarageApplicationFee"
                      id="AvarageApplicationFee"
                      placeholder="Avarage Application Fee"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Est. Total Cost <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="EstimatedTotalCost"
                      id="EstimatedTotalCost"
                      placeholder="Estimated Total Cost"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <div className='row mt-5'>
                        <div className='col-md-8 d-flex justify-content-end'>

                    <ButtonForFunction
                      func={redirectToNext}
                      className={"mt-3 badge-primary"}
                      name={"Skip & Next"}
                      // disable={buttonStatus}
                      permission={6}
                    />

                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
                      name={progress? <ButtonLoader/> :"Save & Next"}
                      disable={buttonStatus}
                      permission={6}
                    />
                  </div>
                </div>

              </Form>

              {/* <div className="d-flex justify-content-between">
                <Button color="warning" onClick={goFront}>
                  Next Page
                </Button>
              </div> */}
            
        </CardBody>
      </Card>
    </div>
    );
};

export default UniversityFinancialForm;