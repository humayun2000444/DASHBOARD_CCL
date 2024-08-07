import { Upload, Image } from 'antd';
import React from 'react';
import { Col, FormGroup, Input, Modal, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { rootUrl } from '../../../../constants/constants';
import audio from '../../../../assets/img/audio.png';
import compressed from '../../../../assets/img/compressed.png';
import document from '../../../../assets/img/document.png';
import excel from '../../../../assets/img/excel.png';
import others from '../../../../assets/img/others.png';
import pdf from '../../../../assets/img/pdf.png';
import ppt from '../../../../assets/img/ppt.png';
import video from '../../../../assets/img/video.png';

const SelfFunded = ({previewVisible1, setPreviewVisible1, previewTitle1, setPreviewTitle1, previewImage1, setPreviewImage1, FileList1, setFileList1, handleCancel1, handlePreview1,getBase641, handleChange1, selfError, setSelfError, selfFunding, selfAttachment}) => {




    return (
        <div>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Attachment <span className="text-danger">*</span>{" "}
                </span>
                <br/>
                <span>(Bank statement, Job Reference with Salary Amount or Business Certificate)</span>
              </Col>
              <Col md="6">
                <div className="row">
                  {selfFunding?.attachement != null ? (
                    <div className="col-md-3">
                     {
                        selfAttachment == 'image' ?
                        <Image
                        width={104}
                        height={104}
                        src={rootUrl+selfFunding?.attachement}
                      />
                      :
                      <>
                    <div style={{height: '104px', width: '125px'}} className='d-flex flex-column justify-content-center'>
                    <div className='mb-2'>
                     <Button
                     className='w-100'
                     onClick={()=>{
                      
                        window.open(rootUrl+selfFunding?.attachement,'_blank')
                      }} color='primary'>View <Icon.Eye className='ml-2'></Icon.Eye></Button>
                     </div>
                    
                    <div>
                    <Button
                    className='w-100'
                    color='primary'><a href={rootUrl+selfFunding?.attachement} download style={{textDecoration: 'none', color: 'white', textDecorationColor: 'white'}}>Download <Icon.Download className='ml-2'></Icon.Download></a></Button>
                    </div>
                    </div>
                      </>
                      }
                      
                    </div>
                  ) : null}

                  <div className="col-md-6">
                    <Upload
                   
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList1}
                      onPreview={handlePreview1}
                      onChange={handleChange1}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList1.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                  
                    <Modal
                      visible={previewVisible1}
                      title={previewTitle1}
                      footer={null}
                      onCancel={handleCancel1}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage1}
                      />
                    </Modal>
                    <span className="text-danger d-block">{selfError}</span>
                  </div>
                </div>

             
                     
                 

              </Col>
            </FormGroup>
            
        </div>
    );
};

export default SelfFunded;