import React, { useState } from "react";
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
import Axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";
import { useEffect } from "react";
import get from "../../../helpers/get";
import put from "../../../helpers/put";
import ButtonLoader from "../Components/ButtonLoader";

const AddSubjectFee = () => {
  const [activetab, setActivetab] = useState("2");
  const [localTutionFee, setLocalTutionFee] = useState("");
  const [intTutionFee, setIntTutionFee] = useState("");
  const [euTutionFee, setEuTutionFee] = useState("");
  const [sId, setSId] = useState("");
  const [id1, setId] = useState(undefined);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [addLocalTutionFee, setAddLocalTutionFee] = useState(undefined);
  const [addIntTutionFee, setAddIntTutionFee] = useState(undefined);
  const [addEUTutionFee, setAddEUTutionFee] = useState(undefined);
  const [averageFee, setAverageFee] = useState(undefined);

  const history = useHistory();
  const { addToast } = useToasts();
  const { id } = useParams();
  const location = useLocation();

  // redirect to dashboard
  const backToSubjectList = () => {
    if (location.subjectId != undefined) {
      history.push(`/subjectProfile/${location.subjectId}`);
    } else {
      // history.push("/subjectList");
      history.push(`/subjectProfile/${id}`);
    }
  };

  // useEffect(()=>{

  //       get(`SubjectFeeStructure/GetBySubject/${id}`)
  //     .then(res=>{

  //       // setLocalTutionFee(res?.localTutionFee);
  //       // setIntTutionFee(res?.internationalTutionFee);
  //       // setEuTutionFee(res?.eU_TutionFee);

  //       setAddLocalTutionFee(res?.localTutionFee);
  //       setAddIntTutionFee(res?.internationalTutionFee);
  //       setAddEUTutionFee(res?.eU_TutionFee);

  //       setSId(res?.subjectId);
  //       setId(res?.id);
  //       setAverageFee(res?.averageApplicationFee);
  //     })

  // },[id,id1])

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push({
        pathname: `/addSubject/${id}`,
        subjectId: location.subjectId,
      });
    }
    if (tab == "2") {
      history.push({
        pathname: `/addSubjectFee/${id}`,
        subjectId: location.subjectId,
      });
    }
    if (tab == "3") {
      history.push({
        pathname: `/addSubjectDeliveryPattern/${id}`,
        subjectId: location.subjectId,
      });
    }
    if (tab == "4") {
      history.push({
        pathname: `/addSubjectRequirements/${id}`,
        subjectId: location.subjectId,
      });
    }
    if (tab == "5") {
      history.push({
        pathname: `/addSubjectDocumentRequirement/${id}`,
        subjectId: location.subjectId,
      });
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    const postdata = {
      subjectId: id,
      localTutionFee: addLocalTutionFee == undefined ? 0 : addLocalTutionFee,
      internationalTutionFee:
        addIntTutionFee == undefined ? 0 : addIntTutionFee,
      eU_TutionFee: addEUTutionFee == undefined ? 0 : addEUTutionFee,
    };

    for (var value of subdata.values()) {
    }

    if (id1 != undefined) {
      setButtonStatus(true);
      setProgress(true);
      put("SubjectFeeStructure/Update", subdata).then((res) => {
        setButtonStatus(false);
        setProgress(true);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push({
            pathname: `/addSubjectDeliveryPattern/${id}`,
            subjectId: location.subjectId,
          });
        }
      });
    } else {
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}SubjectFeeStructure/Create`, postdata, {
        headers: {
          "Content-Type": "application/json",
          authorization: AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        setProgress(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push({
            pathname: `/addSubjectDeliveryPattern/${id}`,
            subjectId: location.subjectId,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
    }
  };

  // redirect to Next Page
  const onNextPage = () => {
    history.push({
      pathname: `/addSubjectDeliveryPattern/${id}`,
      subjectId: location.subjectId,
    });
  };

  const onPreviousPage = () => {
    history.push({
      pathname: `/addSubject/${id}`,
      subjectId: location.subjectId,
    });
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Subject Fee Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToSubjectList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.subjectId != undefined
                ? "Back to Subject Details"
                : "Back to Subject Details"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Subject Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Subject Fee Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Delivery Pattern
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Document Requirement
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <Form onSubmit={handleSubmit} className="mt-5">
                {id1 != undefined ? (
                  <input type="hidden" name="id" id="id" value={id1} />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  {/* <Input type="hidden" id="subjectId" name="subjectId" value={localStorage.getItem("subjectId")} /> */}
                  <Input
                    type="hidden"
                    id="subjectId"
                    name="subjectId"
                    value={id}
                  />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Local Tution Fee
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      onChange={(e) => setAddLocalTutionFee(e.target.value)}
                      // defaultValue={localTutionFee}
                      defaultValue={addLocalTutionFee}
                      name="localTutionFee"
                      id="localTutionFee"
                      placeholder="Enter Local Tution Fee"
                      // required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Int. Tution Fee
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      onChange={(e) => setAddIntTutionFee(e.target.value)}
                      // defaultValue={intTutionFee}
                      defaultValue={addIntTutionFee}
                      placeholder="Enter International Tution Fee "
                      // required
                      name="internationalTutionFee"
                      id="internationalTutionFee"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      EU Tution Fee
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="eU_TutionFee"
                      id="eU_TutionFee"
                      onChange={(e) => setAddEUTutionFee(e.target.value)}
                      // defaultValue={euTutionFee}
                      defaultValue={addEUTutionFee}
                      placeholder="Enter EU Tution Fee"
                      // required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Average Application Fee
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="averageApplicationFee"
                      id="averageApplicationFee"
                      onChange={(e) => setAverageFee(e.target.value)}
                      // defaultValue={euTutionFee}
                      defaultValue={averageFee}
                      placeholder="Enter Average Application Fee"
                      // required
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-3 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      permission={6}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />
                <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddSubjectFee;
