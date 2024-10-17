import { Image, Upload } from "antd";
import React from "react";
import * as Icon from "react-feather";
import { Button, Col, FormGroup, Input, Modal } from "reactstrap";
// import { rootUrl } from "../../../../constants/constants";
import config from "../../../../configs/config.json";

const { root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`;

const Scholarship = ({
  previewVisible5,
  setPreviewVisible5,
  previewTitle5,
  setPreviewTitle5,
  previewImage5,
  setPreviewImage5,
  FileList5,
  setFileList5,
  handleCancel5,
  handlePreview5,
  getBase645,
  handleChange5,
  scholarshipError,
  setScholarshipError,
  scholarshipFunding,
  scholarshipAttachment,
}) => {
  return (
    <div>
      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
            Scholarship <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <Input
            type="textarea"
            required
            placeholder="Add name, amount in the box "
            name="details"
            id="details"
            defaultValue={scholarshipFunding?.details}
          />
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
            Attachment <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <div className="row">
            {scholarshipFunding?.attachement != null ? (
              <div className="col-md-3">
                {scholarshipAttachment == "image" ? (
                  <Image
                    width={104}
                    height={104}
                    src={rootUrl + scholarshipFunding?.attachement}
                  />
                ) : (
                  <>
                    <div
                      style={{ height: "104px", width: "125px" }}
                      className="d-flex flex-column justify-content-center"
                    >
                      <div className="mb-2">
                        <Button
                          onClick={() => {
                            window.open(
                              rootUrl + scholarshipFunding?.attachement,
                              "_blank"
                            );
                          }}
                          color="primary"
                        >
                          View <Icon.Eye className="ml-2"></Icon.Eye>
                        </Button>
                      </div>

                      <div>
                        <Button color="primary">
                          <a
                            href={rootUrl + scholarshipFunding?.attachement}
                            download
                            style={{
                              textDecoration: "none",
                              color: "white",
                              textDecorationColor: "white",
                            }}
                          >
                            Download{" "}
                            <Icon.Download className="ml-2"></Icon.Download>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="col-md-6">
              <Upload
                listType="picture-card"
                multiple={false}
                fileList={FileList5}
                onPreview={handlePreview5}
                onChange={handleChange5}
                beforeUpload={(file) => {
                  return false;
                }}
              >
                {FileList5.length < 1 ? (
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
                visible={previewVisible5}
                title={previewTitle5}
                footer={null}
                onCancel={handleCancel5}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage5}
                />
              </Modal>
              <span className="text-danger d-block">{scholarshipError}</span>
            </div>
          </div>
        </Col>
      </FormGroup>
    </div>
  );
};

export default Scholarship;
