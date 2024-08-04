import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import SelfFunded from "./SourceOfFunds/SelfFunded";
import FamilyFunded from "./SourceOfFunds/FamilyFunded";
import StudentLoanCompany from "./SourceOfFunds/StudentLoanCompany";
import BankLoan from "./SourceOfFunds/BankLoan";
import Scholarship from "./SourceOfFunds/Scholarship";
import GovernmentLoan from "./SourceOfFunds/GovernmentLoan";
import { getExtension } from "../../../helpers/checkFileType";

const ApplicationInformation = () => {
  const history = useHistory();
  const { applicationStudentId, update } = useParams();

  const [applicationInformation, setApplicationInformation] = useState({});
  const [activetab, setActivetab] = useState("1");
  const [appliedStudentFinance, setIsAppliedStudentFinance] = useState("false");
  const [applyingFromInside, setIsApplyingFromInside] = useState("false");
  const [
    isStayedOutsideUKInLastThreeYears,
    setIsStayedOutsideUkInLastThreeYears,
  ] = useState("false");
  const [preSettlementStatus, setPresettlementStatus] = useState("false");
  const [studentType, setStudentType] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Student Type"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [dateOfMoveToUk, setDateOfMoveToUk] = useState("");
  const [financeDetails, setFinanceDetails] = useState("");

  const [success, setSuccess] = useState(false);

  const [visaStatus, setVisaStatus] = useState([]);
  const [visaStatusLabel, setVisaStatusLabel] = useState("Select Visa Status");
  const [visaStatusValue, setVisaStatusValue] = useState(0);
  const [code, setCode] = useState("");

  const [visaError, setVisaError] = useState(false);
  const [fund, setFund] = useState([]);
  const [fundLabel, setFundLabel] = useState("Select Fund Type");
  const [fundValue, setFundValue] = useState(0);
  const [selfError, setSelfError] = useState("");
  const [familyError, setFamilyError] = useState("");
  const [sLoanError, setSLoanError] = useState("");
  const [bLoanError, setBLoanError] = useState("");
  const [scholarshipError, setScholarshipError] = useState("");
  const [govtError, setGovtError] = useState("");
  const [ploading, setLoading] = useState(true);

  const [applicationId, setApplicationId] = useState(0);

  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [fundError, setFundError] = useState("");

  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);

  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewImage4, setPreviewImage4] = useState("");
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState([]);

  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewImage5, setPreviewImage5] = useState("");
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState([]);

  const [selfFunding, setSelfFunding] = useState({});
  const [familyFunding, setFamilyFunding] = useState({});
  const [studentFunding, setStudentFunding] = useState({});
  const [bankFunding, setBankFunding] = useState({});
  const [govtFunding, setGovtFunding] = useState({});
  const [scholarshipFunding, setScholarshipFunding] = useState({});

  const [selfAttachment, setSelfAttachment] = useState("");
  const [familyAttachment, setFamilyAttachment] = useState("");
  const [studentAttachment, setStudentAttachment] = useState("");
  const [bankAttachment, setBankAttachment] = useState("");
  const [govtAttachment, setGovtAttachment] = useState("");
  const [scholarshipAttachment, setScholarshipAttachment] = useState("");

  // useEffect(()=>{

  //   get('StudentTypeDD/Index')
  //   .then(res => {

  //     setStudentType(res);
  //   })

  //   get('VisaTypeDD/Index')
  //   .then(res => {

  //     setVisaStatus(res);
  //   })

  //   get(`SourceOfFundDD/Index`)
  //   .then(res =>{

  //     setFund(res);
  //   })

  //   // get(`StudentType/Get/${applicationStudentTypeId}`)
  //   // .then(res => {
  //   //
  //   //   setStudentTypeValue(res?.id);
  //   //   setStudentTypeLabel(res?.name);
  //   // })

  //   get(`ApplicationInfo/GetByStudentId/${applicationStudentId}`)
  //   .then(res => {

  //     console.log(res);
  //     setApplicationInformation(res);
  //     setStudentTypeLabel(res?.student?.studentType?.name);
  //     setStudentTypeValue(res?.student?.studentType?.id);

  //     setIsStayedOutsideUkInLastThreeYears(`${res?.isStayedOutsideEU_UkinLast3Years}`);
  //     setPresettlementStatus(`${res?.isHavePre_Settlementstatus}`);
  //     setIsAppliedStudentFinance(`${res?.isAppliedStudentFinance}`);
  //     setFinanceDetails(res?.financeApplicationDetails);
  //     setCode(res?.code);

  //     setIsApplyingFromInside(`${res?.isApplyingFromInside}`);
  //     setVisaStatusLabel(res?.visaStatus?.name ? res?.visaStatus?.name : 'Select Visa Status');
  //     setVisaStatusValue(res?.visaStatusId ? res?.visaStatusId : 0);
  //     setApplicationId(res?.id);
  //     setFundLabel(res?.sourceOfFundName ? res?.sourceOfFundName : 'Select Source of Fund');
  //     setFundValue(res?.sourceOfFundId ? res?.sourceOfFundId : 0);

  //     var datee =res?.dateOfMoveToUk;
  //     var utcDate = new Date(datee);
  //     var localeDte = utcDate.toLocaleString("en-CA");
  //     var localeDte2 = localeDte.split(",")[0];
  //     var localeDte3 = localeDte2.replace('/', '-');

  //     setDateOfMoveToUk(localeDte3.replace('/', '-'));
  //     res?.sourceOfFundId == 1 ?
  //     get(`SelfFunded/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setSelfFunding(res);
  //       setSelfAttachment(getExtension(res?.attachement));

  //     })
  //     :
  //     res?.sourceOfFundId == 2 ?
  //     get(`FamilyFunded/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setFamilyFunding(res);
  //       setFamilyAttachment(getExtension(res?.attachement));
  //       console.log(getExtension(res?.attachement));
  //     })
  //     :
  //     res?.sourceOfFundId == 3 ?
  //     get(`StudentLoanCompany/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setStudentFunding(res);
  //       setStudentAttachment(getExtension(res?.attachement));
  //     })
  //     :
  //     res?.sourceOfFundId == 4 ?
  //     get(`BankLoan/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setBankFunding(res);
  //       setBankAttachment(getExtension(res?.attachement));
  //     })
  //     :
  //     res?.sourceOfFundId == 5 ?
  //     get(`GovernmentLoanFund/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setGovtFunding(res);

  //     })
  //     :
  //     res?.sourceOfFundId == 6 ?
  //     get(`Scholarship/GetByStudentId/${applicationStudentId}`)
  //     .then(res => {
  //       console.log(res);
  //       setScholarshipFunding(res);
  //       setScholarshipAttachment(getExtension(res?.attachement));
  //     })
  //     :
  //     setLoading(false);

  //   })

  // },[])

  //  Dynamic1  COde Start

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setSelfError("");
  };

  // Dynamic1  code end

  //  Dynamic2  COde Start

  function getBase642(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase642(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setSelfError("");
  };

  // Dynamic2  code end

  //  Dynamic3  COde Start

  function getBase643(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase643(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setSLoanError("");
  };

  // Dynamic3  code end

  //  Dynamic4  COde Start

  function getBase644(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel4 = () => {
    setPreviewVisible4(false);
  };

  const handlePreview4 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase644(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage4(file.url || file.preview);
    setPreviewVisible4(true);
    setPreviewTitle4(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setBLoanError("");
  };

  // Dynamic4  code end

  //  Dynamic5  COde Start

  function getBase645(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel5 = () => {
    setPreviewVisible5(false);
  };

  const handlePreview5 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase645(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage5(file.url || file.preview);
    setPreviewVisible5(true);
    setPreviewTitle5(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setScholarshipError("");
  };

  // Dynamic5  code end

  const backToStudentProfile = () => {
    history.push(`/studentProfile/${applicationStudentId}`);
  };

  const styleLabelBold = {
    // fontWeight: "bold"
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addStudentApplicationInformation/${applicationStudentId}`);
    }

    if (tab == "2") {
      history.push(`/addStudentInformation/${applicationStudentId}`);
    }

    if (tab == "3") {
      history.push(`/addStudentContactInformation/${applicationStudentId}`);
    }

    if (tab == "4") {
      history.push(`/addStudentEducationalInformation/${applicationStudentId}`);
    }

    if (tab == "5") {
      history.push(`/addTestScore/${applicationStudentId}`);
    }

    if (tab == "6") {
      history.push(`/addExperience/${applicationStudentId}`);
    }

    if (tab == "7") {
      history.push(`/addReference/${applicationStudentId}`);
    }

    if (tab == "8") {
      history.push(`/addPersonalStatement/${applicationStudentId}`);
    }
    if (tab == "9") {
      history.push(`/addOtherInformation/${applicationStudentId}`);
    }
    if (tab == "10") {
      history.push(`/uploadDocument/${applicationStudentId}`);
    }
    if (tab == "11") {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  // on change radio button

  const handleChangeIsAppliedStudentFinance = (event) => {
    setIsAppliedStudentFinance(event.target.value);
  };

  const handleChangeIsApplyingFromInside = (event) => {
    setIsApplyingFromInside(event.target.value);
  };

  const handleChangeIsStayedoutsideUkInLastThreeYears = (event) => {
    setIsStayedOutsideUkInLastThreeYears(event.target.value);
  };

  const handlePreSettlementStatus = (event) => {
    setPresettlementStatus(event.target.value);
  };

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const fundOptions = fund?.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const selectFund = (label, value) => {
    setFundError("");
    setFundLabel(label);
    setFundValue(value);
  };

  // select  Student type
  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  const visaStatusName = visaStatus?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const selectVisaStatus = (label, value) => {
    setVisaStatusLabel(label);
    setVisaStatusValue(value);
    setVisaError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (fundValue == 1) {
      subData.append("selfFundedFile", FileList1[0]?.originFileObj);
    } else if (fundValue == 2) {
      subData.append("familyFundedFile", FileList2[0]?.originFileObj);
    } else if (fundValue == 3) {
      subData.append("studentLoanCompanyFile", FileList3[0]?.originFileObj);
    } else if (fundValue == 4) {
      subData.append("bankLoanFile", FileList4[0]?.originFileObj);
    } else if (fundValue == 6) {
      subData.append("scholarshipFile", FileList5[0]?.originFileObj);

      console.log(FileList5);
    }

    if (studentTypeValue == 3 && visaStatusValue == 0) {
      setVisaError(true);
    } else if (studentTypeValue == 3 && fundValue == 0) {
      setFundError("Source of fund is requied");
    } else if (fundValue == 1 && FileList1?.length < 1) {
      setSelfError("Attachment is required");
    } else if (fundValue == 2 && FileList2?.length < 1) {
      setFamilyError("Attachment is required");
    } else if (fundValue == 3 && FileList3?.length < 1) {
      setSLoanError("Attachment is required");
    } else if (fundValue == 4 && FileList4?.length < 1) {
      setBLoanError("Attachment is required");
    } else if (fundValue == 6 && FileList5?.length < 1) {
      setScholarshipError("Attachment is required");
    }

    // else if(fundValue == 1 )
    else if (update) {
      setButtonStatus(true);
      setProgress(true);
      if (fundValue == 1) {
        post(`SelfFunded/Create`, subData);
      } else if (fundValue == 2) {
        post(`FamilyFunded/Create`, subData);
      } else if (fundValue == 3) {
        post(`StudentLoanCompany/Create`, subData);
      } else if (fundValue == 4) {
        post(`BankLoan/Create`, subData);
      } else if (fundValue == 5) {
        post(`GovernmentLoanFund/Create`, subData);
      } else if (fundValue == 6) {
        post(`Scholarship/Create`, subData);
      }
      put(`ApplicationInfo/Update`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);

        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          history.push(`/addStudentinformation/${applicationStudentId}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const cancelForm = () => {
    history.push("/studentList");
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Application Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student
              Profile
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Application
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Personal
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={() => toggle("3")}>Contact</NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Educational
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Experience
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Reference
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Personal Statement
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                Others
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "10"} onClick={() => toggle("10")}>
                Documents
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "11"} onClick={() => toggle("11")}>
                Declaration
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form onSubmit={handleSubmit} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Application Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
                </div>

                <input type="hidden" name="id" id="id" value={applicationId} />

                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Student Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={studentTypeName}
                      value={{
                        label: studentTypeLabel,
                        value: studentTypeValue,
                      }}
                      onChange={(opt) =>
                        selectStudentType(opt.label, opt.value)
                      }
                      name="studentTypeId"
                      id="studentTypeId"
                      required
                    />
                  </Col>
                </FormGroup>

                {studentTypeLabel == "Home" ? (
                  <>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Applied Student Finance?{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAppliedStudentFinance"
                            onChange={handleChangeIsAppliedStudentFinance}
                            name="isAppliedStudentFinance"
                            value="true"
                            checked={appliedStudentFinance == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAppliedStudentFinance"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAppliedStudentFinance"
                            onChange={handleChangeIsAppliedStudentFinance}
                            name="isAppliedStudentFinance"
                            value="false"
                            checked={appliedStudentFinance == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAppliedStudentFinance"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Finance Application Details{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="textarea"
                          name="financeApplicationDetails"
                          id="financeApplicationDetails"
                          placeholder="Enter Finance Application Details"
                          required
                          defaultValue={financeDetails}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Code <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="code"
                          id="code"
                          placeholder="Enter Code"
                          required
                          defaultValue={code}
                        />
                      </Col>
                    </FormGroup>
                  </>
                ) : null}

                {studentTypeLabel == "International" ? (
                  <>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Applying From Inside?{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isApplyingFromInside"
                            onChange={handleChangeIsApplyingFromInside}
                            name="isApplyingFromInside"
                            value="true"
                            checked={applyingFromInside == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isApplyingFromInside"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isApplyingFromInside"
                            onChange={handleChangeIsApplyingFromInside}
                            name="isApplyingFromInside"
                            value="false"
                            checked={applyingFromInside == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isApplyingFromInside"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Visa Status <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={visaStatusName}
                          value={{
                            label: visaStatusLabel,
                            value: visaStatusValue,
                          }}
                          onChange={(opt) =>
                            selectVisaStatus(opt.label, opt.value)
                          }
                          name="visaStatusId"
                          id="visaStatusId"
                          required
                        />

                        {visaError ? (
                          <span className="text-danger">
                            Visa status is required.
                          </span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Source Of Fund <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={fundOptions}
                          value={{ label: fundLabel, value: fundValue }}
                          onChange={(opt) => selectFund(opt.label, opt.value)}
                          name="sourceOfFundId"
                          id="sourceOfFundId"
                          required
                        />
                        <span className="text-danger">{fundError}</span>
                      </Col>
                    </FormGroup>

                    {fundValue == 1 && (
                      <SelfFunded
                        previewVisible1={previewVisible1}
                        setPreviewVisible1={setPreviewVisible1}
                        previewTitle1={previewTitle1}
                        setPreviewTitle1={setPreviewTitle1}
                        previewImage1={previewImage1}
                        setPreviewImage1={setPreviewImage1}
                        FileList1={FileList1}
                        setFileList1={setFileList1}
                        handleCancel1={handleCancel1}
                        handlePreview1={handlePreview1}
                        getBase641={getBase641}
                        handleChange1={handleChange1}
                        selfError={selfError}
                        setSelfError={setSelfError}
                        selfFunding={selfFunding}
                        selfAttachment={selfAttachment}
                      />
                    )}

                    {fundValue == 2 && (
                      <FamilyFunded
                        previewVisible2={previewVisible2}
                        setPreviewVisible2={setPreviewVisible2}
                        previewTitle2={previewTitle2}
                        setPreviewTitle2={setPreviewTitle2}
                        previewImage2={previewImage2}
                        setPreviewImage2={setPreviewImage2}
                        FileList2={FileList2}
                        setFileList2={setFileList2}
                        handleCancel2={handleCancel2}
                        handlePreview2={handlePreview2}
                        getBase642={getBase642}
                        handleChange2={handleChange2}
                        familyError={familyError}
                        setFamilyError={setFamilyError}
                        familyFunding={familyFunding}
                        familyAttachment={familyAttachment}
                      />
                    )}

                    {fundValue == 3 && (
                      <StudentLoanCompany
                        previewVisible3={previewVisible3}
                        setPreviewVisible3={setPreviewVisible3}
                        previewTitle3={previewTitle3}
                        setPreviewTitle3={setPreviewTitle3}
                        previewImage3={previewImage3}
                        setPreviewImage3={setPreviewImage3}
                        FileList3={FileList3}
                        setFileList3={setFileList3}
                        handleCancel3={handleCancel3}
                        handlePreview3={handlePreview3}
                        getBase643={getBase643}
                        handleChange3={handleChange3}
                        sLoanError={sLoanError}
                        setSLoanError={setSLoanError}
                        studentFunding={studentFunding}
                        studentAttachment={studentAttachment}
                      />
                    )}

                    {fundValue == 4 && (
                      <BankLoan
                        previewVisible4={previewVisible4}
                        setPreviewVisible4={setPreviewVisible4}
                        previewTitle4={previewTitle4}
                        setPreviewTitle4={setPreviewTitle4}
                        previewImage4={previewImage4}
                        setPreviewImage4={setPreviewImage4}
                        FileList4={FileList4}
                        setFileList4={setFileList4}
                        handleCancel4={handleCancel4}
                        handlePreview4={handlePreview4}
                        getBase644={getBase644}
                        handleChange4={handleChange4}
                        bLoanError={bLoanError}
                        setBLoanError={setBLoanError}
                        bankFunding={bankFunding}
                        bankAttachment={bankAttachment}
                      />
                    )}
                    {fundValue == 6 && (
                      <Scholarship
                        previewVisible5={previewVisible5}
                        setPreviewVisible5={setPreviewVisible5}
                        previewTitle5={previewTitle5}
                        setPreviewTitle5={setPreviewTitle5}
                        previewImage5={previewImage5}
                        setPreviewImage5={setPreviewImage5}
                        FileList5={FileList5}
                        setFileList5={setFileList5}
                        handleCancel5={handleCancel5}
                        handlePreview5={handlePreview5}
                        getBase645={getBase645}
                        handleChange5={handleChange5}
                        scholarshipError={scholarshipError}
                        setScholarshipError={setScholarshipError}
                        scholarshipFunding={scholarshipFunding}
                        scholarshipAttachment={scholarshipAttachment}
                      />
                    )}
                    {fundValue == 5 && (
                      <GovernmentLoan govtFunding={govtFunding} />
                    )}
                  </>
                ) : null}

                {studentTypeLabel == "EU/EEA" ? (
                  <>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Date Of Move To UK{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="date"
                          name="DateOfMoveToUk"
                          id="DateOfMoveToUk"
                          defaultValue={dateOfMoveToUk}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Stayed Outside EU/UK In Last 3 Years?{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id=" isStayedOutsideEU_UkinLast3Years"
                            onChange={
                              handleChangeIsStayedoutsideUkInLastThreeYears
                            }
                            name="isStayedOutsideEU_UkinLast3Years"
                            value="true"
                            checked={
                              isStayedOutsideUKInLastThreeYears == "true"
                            }
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isStayedOutsideEU_UkinLast3Years"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isStayedOutsideEU_UkinLast3Years"
                            onChange={
                              handleChangeIsStayedoutsideUkInLastThreeYears
                            }
                            name="isStayedOutsideEU_UkinLast3Years"
                            value="false"
                            checked={
                              isStayedOutsideUKInLastThreeYears == "false"
                            }
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isStayedOutsideEU_UkinLast3Years"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Have Pre-Settlement Status?{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id=" isHavePre_Settlementstatus"
                            onChange={handlePreSettlementStatus}
                            name="isHavePre_Settlementstatus"
                            value="true"
                            checked={preSettlementStatus == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isHavePre_Settlementstatus"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isHavePre_Settlementstatus"
                            onChange={handlePreSettlementStatus}
                            name="isHavePre_Settlementstatus"
                            value="false"
                            checked={preSettlementStatus == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isHavePre_Settlementstatus"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </>
                ) : null}

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      name={progress ? <ButtonLoader /> : "Submit"}
                      type={"submit"}
                      className="mr-1 mt-3 badge-primary"
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  {/* <ButtonForFunction
            className={"mr-1 mt-3 btn-warning"}
            func={cancelForm}
            name={"Cancel"}

            /> */}

                  <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 btn-warning"
                  >
                    Next
                    <i className="fas fa-arrow-right-long ml-1"></i>
                  </Button.Ripple>
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApplicationInformation;
