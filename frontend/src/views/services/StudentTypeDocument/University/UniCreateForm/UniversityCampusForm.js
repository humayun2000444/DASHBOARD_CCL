import Axios from "axios";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import Select from "react-select";
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

import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";

const UniversityCampusForm = () => {
  const [universityCampusList, setuniversityCampusList] = useState([]);
  const [universityCampusObject, setuniversityCampusObject] = useState({});
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const [loading, setLoading] = useState(false);
  const myForm = createRef();
  const [uniStateLabel, setUniStateLabel] = useState("Select Campus State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Campus Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);

  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select Campus City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);

  const [radioHomeVal, setRadioHomeVal] = useState(false);
  const [radioEuUkVal, setRadioEuUkVal] = useState(false);
  const [radioInternationalVal, setRadioInternationalVal] = useState(false);

  const [activetab, setActivetab] = useState("2");
  const [submitData, setSubmitData] = useState(false);
  const history = useHistory();
  const { univerId } = useParams();
  const [universityId, setuniversityId] = useState(0);
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [universityCampus, setUniversityCampus] = useState([]);
  const [campusId, setCampusId] = useState(0);
  const [UniversityCampusName, setUniversityCampusName] = useState("");
  const [UniversityCampusId, setUniversityCampusId] = useState(0);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  let uniId;
  // let uniId = "10019";
  if (location.id) {
    uniId = location.id;
  } else {
    uniId = "";
  }

  // useEffect(()=>{
  //   get(`UniversityCountryDD/Index`)
  //   .then(res => {

  //     setUniverSityCountries(res);
  //   })
  // },[])

  // useEffect(() => {
  //   setuniversityId(uniId);
  //   //  localStorage.setItem('uniCampNId', universityId);
  //   // const universityId = "10019";
  //   get(`UniversityCampus/GetByUniversity/${univerId}`).then(
  //     (action) => {
  //       //  get(`UniversityCampus/GetByUniversity/${localStorage.getItem('editUniId')}`).then((action) => {
  //       // get(`UniversityCampus/GetByUniversity/${universityId}`).then((action) => {
  //       setuniversityCampusList(action);
  //       if (action.length > 0) {
  //         setShowForm(true);
  //       } else {
  //         setShowForm(false);
  //         setSelectedId(0);
  //       }

  //     }
  //   );
  // }, [success, uniId, universityId, univerId]);

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    get(`UniversityStateDD/Index/${value}`).then((res) => {
      setUniversityStates(res);
    });
    setUniStateLabel("Select Campus State");
    setUniStateValue(0);
    get(`UniversityCityDD/Index/${value}`).then((res) => {
      setCity(res);
    });
    setCityLabel("Select Campus City");
    setCityValue(0);
  };

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const selectCampusCity = (label, value) => {
    setCityError(false);
    setCityLabel(label);
    setCityValue(value);
  };

  const AuthStr = localStorage.getItem("token");

  //   on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    //  for (var value of subdata.values()) {
    //
    //  }

    if (uniCountryValue == 0) {
      setUniCountryError(true);
    } else if (unistateValue === 0) {
      setUniStateError(true);
    } else if (cityValue === 0) {
      setCityError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}UniversityCampus/Create`, subdata, {
        headers: {
          "Content-Type": "application/json",
          authorization: AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        setuniversityId(res.data.result.universityId);
        if (res.status === 200 && res.data.isSuccess === true) {
          setSubmitData(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setUniCountryLabel("Select Campus Country");
          setUniCountryValue(0);
          setUniStateLabel("Select Campus State");
          setUniStateValue(0);
          setSuccess(!success);
          history.push({
            pathname: `/createUniversityFinancial/${univerId}`,
            id: univerId,
          });
        }
      });
    }
  };

  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  const cityOptions = city?.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  //   const cancel = () => {
  //     setShowForm(true);
  //     setSelectedId(0);
  //     setuniversityCampusObject({});
  //     setUniCountryLabel("Select Campus Country");
  //     setUniCountryValue(0);
  //     setUniStateLabel("Select Campus State");
  //     setUniStateValue(0);
  //   };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Campus Information</h3>
          {/* <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {
                location.uniCampId != undefined ?
                "Back to Campus Details"
                :
                "Back to University List"
              }
            </span>
          </div> */}
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-4">
            {/* <div className="hedding-titel d-flex justify-content-between mb-3">
                      <div>
                        <h5> <b>Campus Information</b> </h5>

                        <div className="bg-h"></div>
                      </div>

                    </div> */}

            <FormGroup row className="has-icon-left position-relative">
              <Input
                type="hidden"
                id="universityId"
                name="universityId"
                value={univerId}
              />
              <Input type="hidden" id="Id" name="Id" value={selectedId} />
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Campus Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="Name"
                  id="Name"
                  defaultValue={universityCampusObject?.name}
                  placeholder="Write The Campus Name"
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
                  Campus Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={universityCountryName}
                  value={{
                    label: uniCountryLabel,
                    value: uniCountryValue,
                  }}
                  required
                  onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                  name="CampusCountryId"
                  id="CampusCountryId"
                />

                {uniCountryError && (
                  <span className="text-danger">
                    Campus country is required
                  </span>
                )}

                {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Campus State <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={universityStateName}
                  value={{ label: uniStateLabel, value: unistateValue }}
                  required
                  onChange={(opt) => selectUniState(opt.label, opt.value)}
                  name="CampusStateId"
                  id="CampusStateId"
                />

                {uniStateError && (
                  <span className="text-danger">Campus state is required</span>
                )}

                {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Campus City <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={cityOptions}
                  value={{ label: cityLabel, value: cityValue }}
                  onChange={(opt) => selectCampusCity(opt.label, opt.value)}
                  name="campusCityId"
                  id="campusCityId"
                />

                {cityError && (
                  <span className="text-danger">Campus city is required</span>
                )}

                {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Address Line<span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="AddressLine"
                  id="AddressLine"
                  defaultValue={universityCampusObject?.addressLine}
                  placeholder="Write Address Line"
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
                  Total Student <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="TotalStudent"
                  id="TotalStudent"
                  min="0"
                  defaultValue={universityCampusObject?.totalStudent}
                  placeholder="Write Total Student in Number"
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
                  International Student <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  min="0"
                  name="InternationalStudent"
                  id="InternationalStudent"
                  defaultValue={universityCampusObject?.internationalStudent}
                  placeholder="Write International Student in Number"
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
                  Average Tution Fee <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  min="0"
                  name="AvarageTutionFee"
                  id="AvarageTutionFee"
                  defaultValue={universityCampusObject?.avarageTutionFee}
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
                  Average Living Cost <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  min="0"
                  name="AvarageLivingCost"
                  id="AvarageLivingCost"
                  defaultValue={universityCampusObject?.avarageLivingCost}
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
                  Average Application Fee <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  min="0"
                  name="AvarageApplicationFee"
                  id="AvarageApplicationFee"
                  defaultValue={universityCampusObject?.avarageApplicationFee}
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
                  Estimated Total Cost <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  min="0"
                  name="EstimatedTotalCost"
                  id="EstimatedTotalCost"
                  defaultValue={universityCampusObject?.estimatedTotalCost}
                  placeholder="Estimated Total Cost"
                  required
                />
                {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Campus on Map </span>
              </Col>
              <Col md="6">
                <Input
                  // type="textarea"
                  type="url"
                  rows="4"
                  name="EmbededMap"
                  id="EmbededMap"
                  defaultValue={universityCampusObject?.embededMap}
                  // placeholder="Embeded A Map"
                  placeholder="https://example.com"
                />
                <span className="text-danger">
                  Note: Please type the "src" link only from the embed map
                </span>
                {/* <div className="form-control-position">
                              <User size={15} />
                          </div> */}
              </Col>
            </FormGroup>

            <div className="row mt-5">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  color={"primary"}
                  type={"submit"}
                  className={"ml-lg-3 ml-sm-1 mt-3"}
                  name={progress ? <ButtonLoader /> : "Save & Next"}
                  disable={buttonStatus}
                  permission={6}
                />

                {/* <div>
                                <ButtonForFunction
                                  func={cancel}
                                  color={"danger uapp-form-button float-right"}
                                  name={"Cancel"}
                                  permission={6}
                                />
                            </div> */}
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityCampusForm;
