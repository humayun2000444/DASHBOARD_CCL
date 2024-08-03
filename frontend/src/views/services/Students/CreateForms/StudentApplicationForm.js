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

import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";

import get from "../../../../helpers/get";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import SelfFunded from "../SourceOfFunds/SelfFunded";
import FamilyFunded from "../SourceOfFunds/FamilyFunded";
import StudentLoanCompany from "../SourceOfFunds/StudentLoanCompany";
import BankLoan from "../SourceOfFunds/BankLoan";
import Scholarship from "../SourceOfFunds/Scholarship";
import GovernmentLoan from "../SourceOfFunds/GovernmentLoan";

const StudentApplicationForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [progress, setProgress] = useState(false);

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

  const [applicationId, setApplicationId] = useState(0);

  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);

  // Update NEw Infos
  const [fund, setFund] = useState([]);
  const [fundLabel, setFundLabel] = useState("Select Fund Type");
  const [fundValue, setFundValue] = useState(0);
  const [selfError, setSelfError] = useState("");
  const [familyError, setFamilyError] = useState("");
  const [sLoanError, setSLoanError] = useState("");
  const [bLoanError, setBLoanError] = useState("");
  const [scholarshipError, setScholarshipError] = useState("");
  const [govtError, setGovtError] = useState("");

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

  // useEffect(()=>{

  //   get('StudentTypeDD/Index')
  //   .then(res => {

  //     setStudentType(res);
  //   })

  //   get(`SourceOfFundDD/Index`)
  //   .then(res =>{

  //     setFund(res);
  //   })

  //   get('VisaTypeDD/Index')
  //   .then(res => {

  //     setVisaStatus(res);
  //   })

  //   get(`ApplicationInfo/GetByStudentId/${id}`)
  //   .then(res => {

  //     setApplicationInformation(res);
  //     setStudentTypeLabel(res?.student?.studentType?.name);
  //     setStudentTypeValue(res?.student?.studentType?.id);

  //   })

  // },[])

  const styleLabelBold = {
    // fontWeight: "bold"
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

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const selectFund = (label, value) => {
    setFundError("");
    setSelfError("");
    setFamilyError("");
    setSLoanError("");
    setBLoanError("");
    setScholarshipError("");
    setGovtError("");
    setFundLabel(label);
    setFundValue(value);
  };

  const fundOptions = fund?.map((f) => ({
    label: f.name,
    value: f.id,
  }));

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
      subData.append("bankLoanFile", FileList5[0]?.originFileObj);
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
    } else {
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
      post("ApplicationInfo/Create", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res?.status == 200) {
          if (res?.data?.isSuccess == true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentPersonal/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      });
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Application Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white"> 12% Completed</span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-5">
            <input type="hidden" name="studentId" id="studentId" value={id} />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Student Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={studentTypeName}
                  value={{ label: studentTypeLabel, value: studentTypeValue }}
                  onChange={(opt) => selectStudentType(opt.label, opt.value)}
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
                    <span>Applied Student Finance?</span>
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
                    <span>Finance Application Details</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="financeApplicationDetails"
                      id="financeApplicationDetails"
                      placeholder="Enter Finance Application Details"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Code</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Enter Code"
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
                      value={{ label: visaStatusLabel, value: visaStatusValue }}
                      onChange={(opt) => selectVisaStatus(opt.label, opt.value)}
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
                  />
                )}
                {fundValue == 5 && <GovernmentLoan />}
              </>
            ) : null}

            {studentTypeLabel == "EU/EEA" ? (
              <>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Date Of Move To UK</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="date"
                      name="DateOfMoveToUk"
                      id="DateOfMoveToUk"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Stayed Outside EU/UK In Last 3 Years?</span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id=" isStayedOutsideEU_UkinLast3Years"
                        onChange={handleChangeIsStayedoutsideUkInLastThreeYears}
                        name="isStayedOutsideEU_UkinLast3Years"
                        value="true"
                        checked={isStayedOutsideUKInLastThreeYears == "true"}
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
                        onChange={handleChangeIsStayedoutsideUkInLastThreeYears}
                        name="isStayedOutsideEU_UkinLast3Years"
                        value="false"
                        checked={isStayedOutsideUKInLastThreeYears == "false"}
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
                    <span>Have Pre-Settlement Status?</span>
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

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  name={progress ? <ButtonLoader /> : "Save & Next"}
                  type={"submit"}
                  className=" mt-3 badge-primary"
                  disable={buttonStatus}
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentApplicationForm;
