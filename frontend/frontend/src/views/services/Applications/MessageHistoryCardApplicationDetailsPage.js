import { HubConnectionBuilder } from "@microsoft/signalr";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Input,
} from "reactstrap";
import { rootUrl } from "../../../constants/constants";
import { userTypes } from "../../../constants/userTypeConstant";
import get from "../../../helpers/get";
import post from "../../../helpers/post";

const MessageHistoryCardApplicationDetailsPage = (props) => {
  const userType = localStorage.getItem("userType");
  const [messages, setMessages] = useState([]);
  const { applicationId } = props;
  const [stringData, setStringData] = useState("");
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  const getMessage = (appId) => {
    get(`ApplicationMessage/GetMessages/${appId}`).then((res) => {
      setMessages(res);
    });
  };

  // useEffect(()=>{

  //     if(userType == userTypes?.Consultant || userType == userTypes?.AdmissionManager || userType == userTypes?.Student){

  //       const newConnection = new HubConnectionBuilder()
  //     .withUrl(`${rootUrl}applicationMessageHub`)
  //     .withAutomaticReconnect()
  //     .build();

  //       newConnection.start()
  //           .then(result => {
  //     //         get(`ApplicationMessage/JoinGroup/${applicationId}`)
  //     //         .then(res =>{

  //     // })
  //     getMessage(applicationId);
  //             newConnection.invoke("JoinGroup", applicationId);

  //             newConnection.on('applicationMessageHub', message => {
  //               //  const updatedChat = [...latestChat.current];
  //               // updatedChat.push(message);

  //           if(message){

  //         getMessage(applicationId);

  //           }
  //               // this.setState = {chat: message}

  //           });

  //           })

  //     }
  //     else{
  //       getMessage(applicationId);
  //     }

  // },[])

  const handleStringData = (e) => {
    setStringData(e.target.value);
  };

  const submitFormData = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    post(`ApplicationMessage/SendMessage`, subData).then((res) => {
      if (res) {
        setStringData("");
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="hedding-titel d-flex justify-content-between">
            <div className="mb-3">
              <h5>
                {" "}
                <b>Message History</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>
            {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
          </div>
        </CardHeader>
        <CardBody style={{ height: "300px", overflowY: "scroll" }}>
          {messages?.length < 1 ? (
            <span
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#164677",
                marginLeft: "5px",
              }}
            >
              Inbox is empty
            </span>
          ) : (
            <>
              <div>
                {messages?.map((chat, i) => (
                  <div
                    className={
                      current_user?.displayEmail == chat?.senderEmail
                        ? "box arrow-right my-3"
                        : "box arrow-left my-3"
                    }
                    key={i}
                  >
                    <ul
                      className="ml-2"
                      style={{
                        listStyleType: "none",
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <li
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#164677",
                          }}
                        >
                          {chat?.senderName}
                        </li>
                        <li
                          style={{
                            fontSize: "11",
                            color: "hsla(0,0%,50.2%,.918)",
                          }}
                        >
                          {chat?.messageTime}
                        </li>
                      </div>

                      <li> {chat?.messageBody}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardBody>
        {userType == userTypes?.Consultant ||
        userType == userTypes?.Student ||
        userType == userTypes?.AdmissionManager ? (
          <CardFooter style={{ marginTop: "15px" }}>
            <div>
              <form onSubmit={submitFormData}>
                <br />
                <input
                  type="hidden"
                  name="groupId"
                  id="groupId"
                  value={applicationId}
                />

                <Input
                  type="textarea"
                  placeholder="Type message"
                  onChange={handleStringData}
                  value={stringData}
                  required
                  name="message"
                  id="message"
                />

                <div className="d-flex justify-content-end my-2">
                  <Button color="primary" type="submit">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
};

export default MessageHistoryCardApplicationDetailsPage;
