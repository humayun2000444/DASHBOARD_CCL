import { Upload, Image } from 'antd';
import React from 'react';
import { Col, FormGroup, Input, Modal, Button } from 'reactstrap';
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

const BankLoan = ({previewVisible4, setPreviewVisible4, previewTitle4, setPreviewTitle4, previewImage4, setPreviewImage4, FileList4, setFileList4, handleCancel4, handlePreview4,getBase644, handleChange4, bLoanError, setBLoanError, bankFunding, bankAttachment}) => {
    return (
        <div>
        <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Attachment <span className="text-danger">*</span>{" "}
            </span>
            <br/>
            <span>( If already applied please attach prove, If not we will ask latter)</span>
          </Col>
          <Col md="6">
            <div className="row">
            {bankFunding?.attachement != null ? (
                    <div className="col-md-3">
                       {
                        bankAttachment == 'image' ?
                        <Image
                        width={104}
                        height={104}
                        src={rootUrl+bankFunding?.attachement}
                      />
                      :
                      <>
                      <div style={{height: '104px', width: '125px'}} className='d-flex flex-column justify-content-center'>
                      <div className='mb-2'>
                     <Button onClick={()=>{
                        window.open(rootUrl+bankFunding?.attachement,'_blank')
                      }} color='primary'>View <Icon.Eye className='ml-2'></Icon.Eye></Button>
                     </div>
                    
                    <div>
                    <Button color='primary'><a href={rootUrl+bankFunding?.attachement} download style={{textDecoration: 'none', color: 'white', textDecorationColor: 'white'}}>Download <Icon.Download className='ml-2'></Icon.Download></a></Button>
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
                  fileList={FileList4}
                  onPreview={handlePreview4}
                  onChange={handleChange4}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList4.length < 1 ? (
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
                  visible={previewVisible4}
                  title={previewTitle4}
                  footer={null}
                  onCancel={handleCancel4}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage4}
                  />
                </Modal>
                <span className="text-danger d-block">{bLoanError}</span>
              </div>
            </div>

         
                 
             

          </Col>
        </FormGroup>
        
    </div>
    );
};

export default BankLoan;