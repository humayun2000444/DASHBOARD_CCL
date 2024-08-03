import Axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
// import { useDropzone } from "react-dropzone"
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";

const UniversityFeaturesForm = () => {

    const history = useHistory();
  const [activetab, setActivetab] = useState("4");
  const [radioPracticalTraining, setRadioPracticalTraining] = useState("false");
  const [radioIntershipParticipation, setRadioIntershipParticipation] =
    useState("false");
  const [radioWorkWhileStudying, setRadioWorkWhileStudying] = useState("false");
  const [radioConditionalOfferLetter, setRadioConditionalOfferLetter] =
    useState("false");
  const [radioAccommodations, setRadioAccommodations] = useState("false");

  const [features, setFeatures] = useState({});
  const [featureId, setFeatureId] = useState(undefined);

  const [buttonStatus,setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const myForm = createRef();
  const location = useLocation();

  const { addToast } = useToasts();
  const { univerId } = useParams();

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
      setProgress(false);
      Axios.post(`${rootUrl}UniversityFeatures/Create`, subdata, {
        headers: {
          "authorization": AuthStr,
        },
      }).then((res) => {
        const uniID = res.data.result.universityId;
        setButtonStatus(false);
        setProgress(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          // setSubmitData(true);
          history.push({
            pathname: `/createUniversityTestScore/${univerId}`,
            id: uniID,
          });

          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
 
  };
  

  // on change radio button

  // onValueChangePracticalTraining
  const onValueChangePracticalTraining = (event) => {
    setRadioPracticalTraining(event.target.value);
  };

  // onValueChangeIntershipParticipation
  const onValueChangeIntershipParticipation = (event) => {
    setRadioIntershipParticipation(event.target.value);
  };

  // onValueChangeWorkWhileStudying
  const onValueChangeWorkWhileStudying = (event) => {
    setRadioWorkWhileStudying(event.target.value);
  };

  // onValueChangeConditionalOfferLetter
  const onValueChangeConditionalOfferLetter = (event) => {
    setRadioConditionalOfferLetter(event.target.value);
  };

  // onValueChangeAccommodations
  const onValueChangeAccommodations = (event) => {
    setRadioAccommodations(event.target.value);
  };

  const goFront = () => {
    history.push(`/addUniversityGallery/${univerId}`);
  };

    return (
        <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Features Information</h3>
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
                      <b>Features Information</b>{" "}
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

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Practical Training</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="PracticalTraining"
                        value="true"
                        onChange={onValueChangePracticalTraining}
                        name="PracticalTraining"
                        checked={radioPracticalTraining == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="PracticalTraining"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="PracticalTraining"
                        onChange={onValueChangePracticalTraining}
                        name="PracticalTraining"
                        value="false"
                        checked={radioPracticalTraining == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="PracticalTraining"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Internship Participation</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="IntershipParticipation"
                        onChange={onValueChangeIntershipParticipation}
                        name="IntershipParticipation"
                        value="true"
                        checked={radioIntershipParticipation == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="IntershipParticipation"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="IntershipParticipation"
                        onChange={onValueChangeIntershipParticipation}
                        name="IntershipParticipation"
                        value="false"
                        checked={radioIntershipParticipation == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="IntershipParticipation"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Work While Studying</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="WorkWhileStudying"
                        onChange={onValueChangeWorkWhileStudying}
                        name="WorkWhileStudying"
                        value="true"
                        checked={radioWorkWhileStudying == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="WorkWhileStudying"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="WorkWhileStudying"
                        onChange={onValueChangeWorkWhileStudying}
                        name="WorkWhileStudying"
                        value="false"
                        checked={radioWorkWhileStudying == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="WorkWhileStudying"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Conditional Offer Letter</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="ConditionalOfferLetter"
                        onChange={onValueChangeConditionalOfferLetter}
                        name="ConditionalOfferLetter"
                        value="true"
                        checked={radioConditionalOfferLetter == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="ConditionalOfferLetter"
                        onChange={onValueChangeConditionalOfferLetter}
                        name="ConditionalOfferLetter"
                        value="false"
                        checked={radioConditionalOfferLetter == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="pt-3">
                  <Col md="2">
                    <span>Accommodations</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="Accommodations"
                        onChange={onValueChangeAccommodations}
                        name="Accommodations"
                        value="true"
                        checked={radioAccommodations == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="ConditionalOfferLetter"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="Accommodations"
                        onChange={onValueChangeAccommodations}
                        name="Accommodations"
                        value="false"
                        checked={radioAccommodations == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="Accommodations"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <div className='row mt-5'>
                  <div className='col-md-8 d-flex justify-content-end'>
                    <ButtonForFunction
                      type={"submit"}
                      className={"mr-1 mt-3 badge-primary"}
                      name={progress? <ButtonLoader/> :"Save & Next"}
                      disable={buttonStatus}
                      permission={6}
                    />
                 </div>
                </div>

              </Form>

        </CardBody>
      </Card>
    </div>
    );
};

export default UniversityFeaturesForm;