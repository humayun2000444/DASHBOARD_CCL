import { Upload, Image } from 'antd';
import React from 'react';
import { Button, Col, FormGroup, Input, Modal } from 'reactstrap';
import * as Icon from 'react-feather';
import audio from '../../../../assets/img/audio.png';
import compressed from '../../../../assets/img/compressed.png';
import document from '../../../../assets/img/document.png';
import excel from '../../../../assets/img/excel.png';
import others from '../../../../assets/img/others.png';
import pdf from '../../../../assets/img/pdf.png';
import ppt from '../../../../assets/img/ppt.png';
import video from '../../../../assets/img/video.png';
import { rootUrl } from '../../../../constants/constants';

const FamilyFunded = ({previewVisible2, setPreviewVisible2, previewTitle2, setPreviewTitle2, previewImage2, setPreviewImage2, FileList2, setFileList2, handleCancel2, handlePreview2,getBase642, handleChange2, familyError, setFamilyError, familyFunding, familyAttachment}) => {
  console.log(familyAttachment);
    return (
        <div>
        <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Attachment <span className="text-danger">*</span>{" "}
            </span>
            <br/>
            <span>(Relationship with sponsor, attach prove of fund )</span>
          </Col>
          <Col md="6">
            <div className="row">
            {familyFunding?.attachement != null ? (
                    <div className="col-md-3">
                      {
                        familyAttachment == 'image' ?
                        <Image
                        width={104}
                        height={104}
                        src={rootUrl+familyFunding?.attachement}
                      />
                      :
                      <>
                      <div style={{height: '104px', width: '125px'}} className='d-flex flex-column justify-content-center'>
                      <div className='mb-2'>
                     <Button onClick={()=>{
                        window.open(rootUrl+familyFunding?.attachement,'_blank')
                      }} color='primary'>View <Icon.Eye className='ml-2'></Icon.Eye></Button>
                     </div>
                    
                    <div>
                    <Button color='primary'><a href={rootUrl+familyFunding?.attachement} download style={{textDecoration: 'none', color: 'white', textDecorationColor: 'white'}}>Download <Icon.Download className='ml-2'></Icon.Download></a></Button>
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
                  fileList={FileList2}
                  onPreview={handlePreview2}
                  onChange={handleChange2}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList2.length < 1 ? (
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
                  visible={previewVisible2}
                  title={previewTitle2}
                  footer={null}
                  onCancel={handleCancel2}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage2}
                  />
                </Modal>
                <span className="text-danger d-block">{familyError}</span>
              </div>
            </div>

         
                 
             

          </Col>
        </FormGroup>
        
    </div>
    );
};

export default FamilyFunded;