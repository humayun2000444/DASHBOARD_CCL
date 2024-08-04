import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import ButtonForFunction from '../../Components/ButtonForFunction';
import ButtonLoader from '../../Components/ButtonLoader';

const UniversityTestScoreForm = () => {

    const history = useHistory();
    const {univerId} = useParams();

    const [activetab, setActivetab] = useState("6");
    const [ielts,setIelts] = useState(false);
    const [required,setRequired] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);
    const [progress, setProgress] = useState(false);
    const [score,setScore] = useState(null);
    const {addToast} = useToasts();
    const [data,setData] = useState({});


    const backToUniList = () => {
        history.push("/universityList");
      };

      const handleIelts  = (e) => {
            setIelts(e.target.checked);
      }

      const handleRequired = (e) => {
        setRequired(e.target.checked);
      }

      const handleScore = (e) => {
        setScore(e.target.value);
      }

      const  submitTestScore = (event) => {
        event.preventDefault();

        const subData  = new FormData(event.target);

        subData.append('isTestScoreRequired',required);
        subData.append('isIeltsMandatory',data == null ? false : ielts);


        setProgress(true); 
      post(`TestScoreRequirement/Create`,subData)
        .then(res => {
          setProgress(false);
            if(res?.status == 200 && res?.data?.isSuccess == true){
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
                history.push(`/createUniversityApplicationDocument/${univerId}`);
            }
            else{
                addToast(res?.data?.message,{
                    appearance: 'error',
                    autoDismiss: true
                }) 
            }

        })

    }

    return (
        <div>
            <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Test Score</h3>
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

              <Form onSubmit={submitTestScore}  className="mt-4">
                
              {/* <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Test Score Infomration</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  
                </div> */}
                
                <input
                type='hidden'
                name='universityId'
                id='universityId'
                value={univerId}
                />
               
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Is Test Score Required
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                    className='ml-1'
                      type="checkbox"
                    //   name='isTestScoreRequired'
                    //   id='isTestScoreRequired'
                      onChange={handleRequired}
                      checked={required}
                      
                    />
                    
                  </Col>
                </FormGroup>

                {
                    required? 
                    <>
                    <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Is IELTS Mandatory 
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                    className='ml-1'
                      type="checkbox"
                    //   name='isIeltsMandatory'
                    //   id='isIeltsMandatory'
                      onChange={handleIelts}
                      checked={ielts}
                      
                    />
                    
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      {
                        ielts?
                        'IELTS Score'
                        :
                        'IELTS Equivalent Score'

                      }
                    </span>
                  </Col>
                  <Col md="3">
                    <Input

                    
                      type="text"
                      name='score'
                      id='score'
                      placeholder='Enter Score'
                    //   defaultValue={data?.score}
                      required
                      onChange={handleScore}
                      
                    />
                    
                  </Col>
                </FormGroup>
                    </>

                    :

                    null
                }

                <div className='row'>
                    <div className='col-md-5 d-flex justify-content-end'>
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
                      name={progress? <ButtonLoader/> :"Save & Next"}
                      disable={!(required && score> '1')}
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

export default UniversityTestScoreForm;