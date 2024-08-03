import React, { createRef, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Upload, Modal } from 'antd';

import * as Icon from 'react-feather';
import { Image } from 'antd';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useHistory } from "react-router";
import Select from "react-select";
import { useParams } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Axios from "axios";

import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import ProfilePicturesWall from "./EmployeeProfileImage";
import CoverPicturesWall from "./EmployeeCoverImage";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";

const EmployeeGeneralInfo = (props) => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});


  const myForm = createRef();
  const history = useHistory();
  const [activetab, setActivetab] = useState("1");
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeType, setEmployeeType] = useState("Select Staff Type");
  const [employeeValue, setEmployeeValue] = useState(0);
  const [employeeError, setEmployeeError] = useState("");
  const [nationality, setNationality] = useState([]);
  const [nationalityType, setNationalityType] = useState(
    "Select Nationality"
  );
  const [nationalityValue, setNationalityValue] = useState(0);
  const [nationalityError, setNationalityError] = useState("");
  const { addToast } = useToasts();
  const [files, setFiles] = useState([]);
  const [exactFile, setExactFile] = useState({});
  const [dropzoneError, setDropzoneError] = useState("");
  const [buttonStatus,setButtonStatus] = useState(false);
  const [error,setError] = useState('');
  const [error2,setError2] = useState('');

  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [progress,setProgress] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  const result = useSelector(
    (state) => state.employeeProfileImageReducer.employeeProfileImage
  );

  const result1 = useSelector(
    (state) => state.employeeCoverDataReducer.employeeCoverImage
  );

  useEffect(() => {
    get(`Employee/Details/${id}`).then((res) => {
      
      setBranchLabel(res?.branch?.name != null ? res?.branch?.name : 'Select Branch')
      setBranchValue(res?.branch?.id != null ? res?.branch?.id : 0);
      setEmployeeType(res.employeeType.name);
      setEmployeeValue(res.employeeType.id);
      setNationalityType(res.nationality.name);
      setNationalityValue(res.nationality.id);

      setUserInfo(res);
    });

    get(`EmployeeTypeDD/Index`).then((action) => {
      setEmployeeList(action);
    });

    get(`NationalityDD/Index`).then((action) => {
      setNationality(action);
    });

    get("BranchDD/index").then((res) => {
      // 
      setBranch(res);
    });

  }, [id]);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {

    setBranchLabel(label);
    setBranchValue(value);
  };

  // file handle
  const updateFiles = (incommingFiles) => {
    if (incommingFiles.length > 1) {
      setDropzoneError("Max 1 file");
    } else {
      setFiles(incommingFiles);
      setExactFile(incommingFiles[0]?.file);
      setDropzoneError("");
    }
    // setFiles(incommingFiles);
    //     setExactFile(incommingFiles[0]?.file)
    //     setDropzoneError('');
  };



  const employeeTypeName = employeeList?.map((emp) => ({
    label: emp.name,
    value: emp.id,
  }));
  const nationalityName = nationality?.map((nation) => ({
    label: nation.name,
    value: nation.id,
  }));

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [FileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  


  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
 
 
  const  handleCancel = () => {
  
      setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name ||  file.url.substring(file.url.lastIndexOf('/') + 1) );





  };

 const handleChange = ({ fileList }) => {
  
  if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
    setFileList([]);
    setError('Only jpeg, jpg, png image is allowed');
  }
  else{
    setFileList(fileList);
    setError('');
  }
     
    
    
 };




   // Image js code end
   const AuthStr = localStorage.getItem("token");

  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const subData = new FormData(event.target);
    subData.append("profileImage", FileList[0]?.originFileObj);
    subData.append("coverImage", result1[0]?.originFileObj);
    //  watch form data values
    for (var value of subData.values()) {
         
     }
    


    if (employeeValue == 0) {
      setEmployeeError("Staff Type is Required");
    } 
    else if (nationalityValue == 0) {
      setNationalityError("Nationality is Required");
    }

   
     
     else {
      setProgress(true);
      setButtonStatus(true);
      Axios.put(`${rootUrl}Employee/Update`, subData, {
        headers: {
          'authorization': AuthStr,
        },
      }).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        // (res.status === 200 && res.data.isSuccess === true) ?
        // status = 'success' : status = res.data.message;
        // status = res.data.message;
        // data = res.data.result;

        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });

        const uID = res.data.result.userId;
        const empID = res.data.result.id;
        if (res.status === 200 && res.data.isSuccess === true) {
          // history.push({
          //     pathname: '/employeeContactInfo',
          //   //   state: { detail : uID},
          //     id: uID
          // })
          
          history.push(`/staffContactInfo/${id}`);
        }
      });
    }
    
  };

  // select Employee Type
  const selectEmployeeType = (label, value) => {
    setEmployeeType(label);
    setEmployeeValue(value);
  };

  //   select Nationality Type
  const selectNationalityType = (label, value) => {
    setNationalityType(label);
    setNationalityValue(value);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "2") {
      history.push(`/staffContactInfo/${id}`);
    }
  };
  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/staffList");
  };

  return (
    <div className="uapp-employee">
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Staff General Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Staff List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                General Information
              </NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Contact Information
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">
                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    defaultValue={userInfo.id}
                    type="hidden"
                    name="id"
                    id="id"
                  />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Staff Type <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={employeeTypeName}
                      value={{ label: employeeType, value: employeeValue }}
                      onChange={(opt) =>
                        selectEmployeeType(opt.label, opt.value)
                      }
                      name="employeeTypeId"
                      id="employeeTypeId"
                    />
                   
                      <span className="text-danger">{employeeError}</span>
                    
                    
                  </Col>
                </FormGroup>

                {/* <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Branch <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Select
                                    options={branchOptions}
                                    value={{ label: branchLabel, value: branchValue }}
                                    onChange={(opt) => selectBranch(opt.label, opt.value)}
                                    name="BranchId"
                                    id="BranchId"
                                    />
                                        
                                        
                                    </Col>
                                </FormGroup> */}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Select Nationality <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={nationalityName}
                      value={{
                        label: nationalityType,
                        value: nationalityValue,
                      }}
                      onChange={(opt) =>
                        selectNationalityType(opt.label, opt.value)
                      }
                      name="nationalityId"
                      id="nationalityId"
                    />
               
                      <span className="text-danger">{nationalityError}</span>
              
                    
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>First Name <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      defaultValue={userInfo?.firstName}
                      required
                    />
                   
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Last Name <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      defaultValue={userInfo.lastName}
                      required
                    />
                    
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Email Address <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={userInfo?.email}
                      required
                    />
                    
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Phone Number <span className="text-danger">*</span>{" "}</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      defaultValue={userInfo?.phoneNumber}
                      required
                    />
                   
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Profile Image</span>
                  </Col>
                  <Col md="6">
                   <div className="d-flex">
                   {
                      userInfo?.profileImageMedia?.fileUrl !== null ?
                    <div className="mr-2">
                    

                      <Image
                      width={104} height={104}
                      src={rootUrl+userInfo?.profileImageMedia?.fileUrl}
                    />
                   
                    
                    </div>

                    :
                    null
                    }
                 
                   
                 <div className="ms-2">

                 <Upload
                
                listType="picture-card"
                multiple={false}
                fileList={FileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file)=>{

           
                      
                    
                      return false;
                  }}
                >
                    {FileList.length < 1 ?  <div className='text-danger' style={{ marginTop: 8 }}><Icon.Upload/></div>: ''}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <span className="text-danger d-block">{error}</span>


                 </div>
                 
                 </div>
                 
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Cover Image</span>
                  </Col>
                  <Col md="6">
                    <div className="d-flex">
                   <div className="mr-2">
                   {
                      userInfo?.coverImageMedia?.fileUrl !== null ?
                      <Image
                      width={104} height={104}
                      src={rootUrl+userInfo?.coverImageMedia?.fileUrl}
                    />
                    :
                    null
                    }
                   </div>
                  <div className="ms-0">
                  <CoverPicturesWall
                  error2={error2}
                  setError2={setError2}
                  />
                  <span className="text-danger">{error2}</span>
                  </div>
                    </div>
                   
                   
                  </Col>
                </FormGroup>

              

                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                
                
                 <Col md="5">
                   {
                    permissions?.includes(permissionList?.Update_Staff_info) ? 

                    <ButtonForFunction
                    type={"submit"}
                    className={"mr-1 mt-3 badge-primary"}
                    name={progress? <ButtonLoader/> : 'Submit'}
                    disable={buttonStatus}
                   />
                   :
                   null
                   }
                 </Col>

                </FormGroup>
              </Form>
            </TabPane>
            {/* <TabPane tabId="2">
                        
                    </TabPane> */}
          </TabContent>
          <div className="d-flex justify-content-end">
            <Button color="warning" onClick={()=>history.push(`/staffContactInfo/${id}`)}>
              Next Page
            </Button>

          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(EmployeeGeneralInfo);
