import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import get from "../../../helpers/get";
import Select from "react-select";
import Pagination from "../Pagination/Pagination";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";

const Notifications = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(30);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delDadta, setDelData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);

  // useEffect(()=>{

  //     get(`Notification/Index?page=${currentPage}&pageSize=${dataPerPage}`)
  //     .then(res => {

  //         setEntity(res?.totalEntity);
  //         setData(res?.models);
  //     })

  // },[dataPerPage,currentPage, success])

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const gotoPath = (data) => {
    history.push(data?.targetUrl);
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    get(`Notification/Delete/${delDadta?.id}`).then((res) => {
      setButtonStatus(false);
      if (res) {
        addToast("Notification Deleted", {
          appearance: "error",
          autoDismiss: true,
        });
        setDelData({});
        setDeleteModal(false);
        setSuccess(!success);
      } else {
        addToast("Something Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const deletAllNotification = () => {
    setButtonStatus(true);
    remove(`Notification/DeleteAll`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const deletAllSeen = () => {
    setButtonStatus(true);
    remove(`Notification/DeleteAllOnlySeens`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const markAsReadNotification = (data) => {
    get(`Notification/ViewNotification/${data?.id}`).then((res) => {
      if (res) {
        setSuccess(!success);
      }
    });
  };

  return (
    <div>
      <Modal
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        className="uapp-modal2"
      >
        <ModalBody>
          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            onClick={handleDeleteData}
            disabled={buttonStatus}
          >
            YES
          </Button>
          <Button onClick={() => setDeleteModal(false)}>NO</Button>
        </ModalFooter>
      </Modal>

      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">All Notifications</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* <Card>

          <CardBody>

            {
              data?.length > 0 ? 
              <div className='d-flex justify-content-end'>

              <Button color='danger mr-1 btn-sm' onClick={deletAllNotification} disabled={buttonStatus}>
                Delete All

              </Button>

              <Button color='danger ml-1 btn-sm' onClick={deletAllSeen}>
                Delete Only Seen

              </Button>

            </div>

            :

            <div className='text-center'>

              <span style={{fontWeight: '500'}}>No Notification Found</span>

            </div>
            }

          </CardBody>


        </Card> */}

      {/* map data from array and show */}

      {data?.map((list, i) => (
        <Card key={i} className="my-3 notification-div">
          <CardBody>
            <div className="d-flex justify-content-between">
              <span>{handleDate(list?.createdOn)}</span>
              <div className="d-flex">
                {!list?.isSeen ? (
                  <Button
                    color="primary"
                    className="mr-1 btn-sm"
                    onClick={() => markAsReadNotification(list)}
                  >
                    Mark as Read
                  </Button>
                ) : null}

                <Button
                  color="danger"
                  className="ml-1 btn-sm"
                  onClick={() => toggleDanger(list)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div>
              <span className="title" onClick={() => gotoPath(list)}>
                {list?.title}
              </span>
              <span className="description">{list?.description}</span>
            </div>
          </CardBody>
        </Card>
      ))}

      <Card>
        <CardBody>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
