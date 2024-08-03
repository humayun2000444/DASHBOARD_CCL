import Password from "antd/lib/input/Password";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Button, Card, CardBody } from "reactstrap";
import Uapp_fav from "../../../assets/img/Uapp_fav.png";
import { rootUrl } from "../../../constants/constants";
import put from "../../../helpers/put";
import ButtonLoader from "../Components/ButtonLoader";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { userId } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { addToast } = useToasts();
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  // useEffect(()=>{

  // },[])

  const changePassword = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (oldPassword == newPassword) {
      setError("You are trying to use old password");
    } else if (newPassword !== confirmPassword) {
      setError("Password doesn't match");
    } else {
      setloading(true);
      put(`Manage/ChangePassword`, subData).then((res) => {
        setloading(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const changeEmail = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    setloading(true);
    put(`Manage/ChangeEmail`, subData).then((res) => {
      setloading(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "true",
        });
        setEmail("");
        window.localStorage.clear();
        window.location.reload();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <div className="row">
            {/* tab options */}
            <div className="col-md-3">
              <div>
                <div className="img-circle text-center mb-3">
                  <img
                    src={
                      current_user?.displayImage == null
                        ? Uapp_fav
                        : rootUrl + current_user?.displayImage
                    }
                    alt="Image"
                    className="shadow"
                  />
                </div>
                <h4 className="text-center">{current_user?.displayName}</h4>
              </div>

              <div className="nav flex-column nav-pills mt-3">
                <a
                  className={activeTab == 1 ? "nav-link success" : "nav-link"}
                  onClick={() => setActiveTab(1)}
                >
                  <i class="fa fa-user text-center mr-1"></i>
                  Account
                </a>
                <a
                  className={activeTab == 2 ? "nav-link success" : "nav-link"}
                  onClick={() => setActiveTab(2)}
                >
                  <i class="fa fa-envelope text-center mr-1"></i>
                  Email
                </a>
                <a
                  className={activeTab == 3 ? "nav-link success" : "nav-link"}
                  onClick={() => setActiveTab(3)}
                >
                  <i class="fa fa-key text-center mr-1"></i>
                  Password
                </a>
              </div>
            </div>

            {/* details options */}
            <div className="col-md-9">
              {activeTab == 1 && (
                <div className="mt-3">
                  <h3 class="mb-4">Account Information </h3>

                  <div class="row">
                    <div class="col-md-6">
                      <div className="mb-2">
                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                          User Type: {current_user?.displayUserType}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                          Email: {current_user?.displayEmail}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                          UAPP Id: {current_user?.userViewId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab == 2 && (
                <form onSubmit={changeEmail}>
                  <div className="mt-3">
                    <h3 class="mb-4">Change Email </h3>
                    <div className="mb-3">
                      <span>
                        By changing email, you will change the primary email
                        with the new email address.
                      </span>
                    </div>

                    <div className="mb-3">
                      <span>
                        All notification and will be send to your new email.
                      </span>
                    </div>

                    <div className="mb-3">
                      <span style={{ fontWeight: "700" }}>
                        This new email will require log in to UAPP .
                      </span>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-1">
                          <label>Enter New Email</label>
                          <input
                            type="email"
                            class="form-control"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                            }}
                            value={email}
                            name="newEmail"
                            id="newEmail"
                            required
                          />
                        </div>
                        <span className="text-danger">{error}</span>

                        <div className="d-flex justify-content-end mt-3">
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              disabled={loading}
                            >
                              {loading ? <ButtonLoader /> : "Update"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {activeTab == 3 && (
                <form onSubmit={changePassword}>
                  <div className="mt-3">
                    <h3 class="mb-4">Reset Password</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-1">
                          <label>Old Password</label>
                          <input
                            type="password"
                            class="form-control"
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                              setError("");
                            }}
                            value={oldPassword}
                            name="oldPassword"
                            id="oldPassword"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-1">
                          <label>New Password</label>
                          <input
                            type="password"
                            class="form-control"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              setError("");
                            }}
                            value={newPassword}
                            name="newPassword"
                            id="newPassword"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-1">
                          <label>Confirm New password</label>
                          <input
                            type="password"
                            class="form-control"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setError("");
                            }}
                            value={confirmPassword}
                          />
                        </div>
                        <span className="text-danger">{error}</span>

                        <div className="d-flex justify-content-end mt-3">
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              disabled={loading}
                            >
                              {loading ? <ButtonLoader /> : "Update"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Settings;
