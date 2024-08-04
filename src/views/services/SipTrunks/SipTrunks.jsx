import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import Select from "react-select";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SipTrunks = () => {
  const [selectedOrder, setSelectedOrder] = useState({
    label: "Select Country",
    value: "Country..",
  });
  const orderName = [
    { label: "Order 1", value: 1 },
    { label: "Order 2", value: 2 },
    { label: "Order 3", value: 3 },
    // Add more orders as needed
  ];
  const selectOrder = (label, value) => {
    setSelectedOrder({ label, value });
  };
  const props = {
    name: "file",
    action: "https://your-upload-endpoint.com/upload",
    headers: {
      authorization: "authorization-text",
    },
    accept: ".csv", // Accept only CSV files
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Card>
        <CardBody>
          <div className="border-bottom">
            <h4 className="pb-3">Update SIP Gateway</h4>
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-12">
                <form>
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div class=" row">
                      <label class="col-sm-2 col-form-label">SIP Address</label>
                      <div className="col-10">
                        <div className="row">
                          <div class="col-sm-8">
                            <input
                              type="text"
                              class="form-control"
                              id="sipAdress"
                              placeholder="SIP Adress"
                            />
                          </div>
                          <div class="col-sm-4">
                            <div className="d-flex justify-content-end">
                              <Button
                                className="mb-3"
                                variant="outlined"
                                style={{
                                  borderColor: "DodgerBlue",
                                  backgroundColor: "DodgerBlue",
                                  borderRadius: "5px",
                                  color: "white",
                                }}
                              >
                                Test Connection
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p>
                          For example "sip.example.com" or "192.168.1.0". Click
                          the "Test Connection" button to test your connection
                          with your SIP.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">
                      Voip Module Address
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="voidModuleAdress"
                        placeholder="Voip Module Address"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">
                      User Group
                    </label>
                    <div class="col-sm-10">
                      <Select
                        options={orderName}
                        value={{
                          label: selectedOrder.label,
                          value: selectedOrder.value,
                        }}
                        onChange={(opt) => selectOrder(opt.label, opt.value)}
                      />
                      <div class="form-check my-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="bDialPrefix"
                        />
                        <label class="form-check-label" for="bDialPrefix">
                          Use B number Dial Prefix
                        </label>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-12">
                          <input
                            type="text"
                            class="form-control"
                            id="voidModuleAdress"
                            placeholder="Voip Module Address"
                          />
                          <p>Example:1234</p>

                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="bDightCount"
                            />
                            <label class="form-check-label" for="bDightCount">
                              Use B number Cut Digit Count
                            </label>
                          </div>
                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="aDialPrefix"
                            />
                            <label class="form-check-label" for="aDialPrefix">
                              Use A number Dial Prefix
                            </label>
                          </div>
                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="aDightCount"
                            />
                            <label class="form-check-label" for="aDightCount">
                              Use B number Cut Digit Count
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-12">
                          <input
                            type="text"
                            class="form-control"
                            id="voidModuleAdress"
                            placeholder="Voip Module Address"
                          />
                          <p>Example:4</p>
                        </div>
                      </div>
                      <div class="form-check my-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="sipUsername/Password"
                        />
                        <label
                          class="form-check-label"
                          for="sipUsername/Password"
                        >
                          Use SIP Username/Password
                        </label>
                      </div>
                      <div class="form-check my-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="allCountries"
                        />
                        <label class="form-check-label" for="allCountries">
                          Gateway for All Countries
                        </label>
                      </div>
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="10"
                        ></textarea>
                      </div>
                      <div class="form-check my-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="mainGateway"
                        />
                        <label class="form-check-label" for="mainGateway">
                          Main Gateway
                        </label>
                      </div>
                      <p>
                        The price of this gateway will be the defalt one. The
                        price of all other gateways will override the price of
                        the main gateway. Only 1 gateway can be the main, and it
                        will be obligatorily activated.{" "}
                      </p>
                      <div class="form-check my-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="activeThisGateway"
                        />
                        <label class="form-check-label" for="activeThisGateway">
                          Active This Gateway
                        </label>
                      </div>
                      <p
                        className="pb-5"
                        style={{ borderBottom: "2px solid gray" }}
                      >
                        if the checkbox is selected the the gateway will be
                        activated right after saving.
                      </p>
                      <h4>Price markup</h4>
                      <div
                        className="form-group row"
                        style={{ borderBottom: "2px solid gray" }}
                      >
                        <label class="col-sm-2 col-form-label">Formula</label>
                        <div class="col-sm-10">
                          <p className="pt-2">
                            {" "}
                            {"( Uploaded Price * A ) + B"}
                          </p>
                          <div className="row pb-3">
                            <div className="col-md-2">
                              <p>A</p>
                              <input
                                type="text"
                                class="form-control"
                                id="a"
                                placeholder="0"
                              />
                            </div>

                            <div className="col-md-2">
                              {" "}
                              <p>B</p>
                              <input
                                type="text"
                                class="form-control"
                                id="b"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <p className=" pb-5">
                            You can add your price markup to all uploded prices.
                            Specify the value "1" for paramiter A and "0" for
                            Paramiter B oif you dont't want to add any price
                            markup.
                          </p>
                        </div>
                      </div>

                      {/*  */}
                      <div
                        className="form-group row"
                        // style={{ borderBottom: "2px solid gray" }}
                      >
                        <label class="col-sm-2 col-form-label">
                          <h4>Pricing</h4>
                        </label>
                        <div class="col-sm-10">
                          <p>
                            {" "}
                            {
                              "Price list is uploaded (Download the uploaded price list )"
                            }
                          </p>
                          <div className="row pb-3">
                            <div className="col-md-3">
                              <Upload {...props}>
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{
                                    border: "2px solid gray",
                                    borderRadius: "5px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Example shadow style
                                  }}
                                >
                                  SVG Upload file...
                                </Button>
                              </Upload>
                            </div>

                            <div className="col-md-9">
                              {" "}
                              <h4 className="danger">
                                Rate Sheet Upload, Price, Pulse and Prefix{" "}
                              </h4>
                            </div>
                          </div>
                          <p className=" pb-5">
                            Please always make sure that the uploaded price
                            contain all the selected countries. The price list
                            file should have CSV formate.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div>
                      <Button
                        className=" mr-3"
                        variant="outlined"
                        style={{
                          borderColor: "skyblue",
                          borderRadius: "5px",
                          backgroundColor: "skyblue",
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        className="md-mr-3 mr-3"
                        variant="outlined"
                        style={{
                          borderColor: "gray",
                          borderRadius: "5px",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="md-mr-3 mr-3"
                        variant="outlined"
                        style={{
                          borderColor: "gray",
                          borderRadius: "5px",
                        }}
                      >
                        Cache call price
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SipTrunks;
