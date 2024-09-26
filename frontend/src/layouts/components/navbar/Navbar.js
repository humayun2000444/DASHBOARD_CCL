import React, { useEffect } from "react";
import { Navbar } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { useAuth0 } from "../../../authServices/auth0/auth0Service";
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import {
  // logoutWithJWT,
  logoutWithFirebase,
} from "../../../redux/actions/auth/loginActions";
import NavbarUser from "./NavbarUser";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import SidebarHeader from "../menu/vertical-menu/SidebarHeader";
import { rootUrl } from "../../../views/ReusableFunction/Api/ApiFunc";
import { studentLoginJwtAction } from "../../../redux/actions/SMS/AuthAction/AuthAction";
import Button from '@mui/material/Button';

const UserName = (props) => {
  const dispatch = useDispatch();

  var loggedInUser = {
    id: 0,
    email: "",
    name: "",
    image: "gbhgyhgv",
    loggedInWith: "jwt",
  };
  const token = localStorage.getItem("token");
  const AuthStr = "Bearer " + token;

  // useEffect(()=>{
  //   axios.get(`${rootUrl}/Account/GetCurrentUser`,{ 'headers': { 'Authorization': AuthStr } })
  //           .then(res => {

  //             loggedInUser.name = res.data.fullName;
  //             loggedInUser.id = res.data.id;
  //             loggedInUser.email = res.data.email;
  //             // loggedInUser = JSON.stringify(res.data);
  //             // dispatch({
  //             //           type: "LOGIN_WITH_JWT",
  //             //           payload: { loggedInUser, loggedInWith: "jwt" }
  //             //         })

  //             dispatch(studentLoginJwtAction(loggedInUser));

  //           })
  // },[])

  let username = "";
  const userObj = props.user.login.values;

  if (props.userdata !== undefined) {
    username = props.userdata.name;
  } else if (props.user.login.values !== undefined) {
    username = props.user.login.values.name;
    if (
      props.user.login.values.loggedInWith !== undefined &&
      props.user.login.values.loggedInWith === "jwt"
    ) {
      username = props.user.login.values.name;
    }
  } else {
    username = "John Doe";
  }
  return username;
};
const ThemeNavbar = (props) => {
  const { user } = useAuth0();
  let {
    toggleSidebarMenu,
    toggle,
    color,
    sidebarVisibility,
    activeTheme,
    collapsed,
    activePath,
    sidebarState,
    menuShadow,
  } = props;

  return (
    <React.Fragment>
      <div className="content-overlay" />
      {/* <div className="header-navbar-shadow" /> */}

      <Navbar
        className={classnames(
          "header-navbar uapp-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          "navbar-light",
          "primary",
          "floating-nav",
          "scrolling"
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="navbar-collapse d-flex justify-content-between align-items-center" id="navbar-mobile">
              <div className="bookmark-wrapper">
                <SidebarHeader
                  toggleSidebarMenu={toggleSidebarMenu}
                  toggle={toggle}
                  sidebarBgColor={color}
                  sidebarVisibility={sidebarVisibility}
                  activeTheme={activeTheme}
                  collapsed={collapsed}
                  menuShadow={menuShadow}
                  activePath={activePath}
                  sidebarState={sidebarState}
                />
              </div>
              <div className="navbar-right-wrapper">
                {/*  <div className="navbar-right-content" style={{display:"flex",alignItems:"center",gap:"8px"}}>*/}
                {/*    <Button*/}
                {/*      variant="outlined" // You can change this to 'contained' or 'text' as per your design*/}
                {/*      sx={{*/}
                {/*        display: "flex",*/}
                {/*        alignItems: "center",*/}
                {/*        justifyContent: "space-between",*/}
                {/*        backgroundColor: "#2E3A45",*/}
                {/*        height: "48px",*/}
                {/*        textAlign: "left",*/}
                {/*        fontFamily:"Inter",*/}
                {/*        borderRadius:"8px",*/}
                {/*        padding:"5px 12px",*/}
                {/*        gap:1,*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',color:'#fff', }}>*/}
                {/*        <Typography variant="body2" color="#fff" sx={{ color:"#fff", fontSize:"10px",fontWeight:400, }}>*/}
                {/*          Account Balance*/}
                {/*        </Typography>*/}
                {/*        <Typography variant="h6" sx={{color:"#fff", fontSize:"20px",fontWeight:"bold"}}>*/}
                {/*          $10,000.00*/}
                {/*        </Typography>*/}
                {/*      </div>*/}
                {/*      <ArrowDropDownIcon sx={{ width: 20, height: 20 }} />*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*      variant="contained"*/}
                {/*      startIcon={<AddIcon sx={{ marginRight: '0px' }} />} // Add margin to the icon*/}
                {/*      sx={{*/}
                {/*        backgroundColor: "#1D94AB",*/}
                {/*        color: "#ffffff",*/}
                {/*        borderRadius: "8px",*/}
                {/*        fontFamily: "Inter",*/}
                {/*        fontSize: "14px",*/}
                {/*        textTransform: "capitalize",*/}
                {/*        padding: "12px 20px",*/}
                {/*        height: "48px",*/}
                {/*        display: "flex",*/}
                {/*        alignItems: "center",*/}
                {/*        '&:hover': {*/}
                {/*          backgroundColor: "#178c99", // Darker shade for hover effect*/}
                {/*        },*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Recharge*/}
                {/*    </Button>*/}
                {/*    <NavbarUser*/}
                {/*      handleAppOverlay={props.handleAppOverlay}*/}
                {/*      changeCurrentLang={props.changeCurrentLang}*/}
                {/*      userName={<UserName userdata={user} {...props} />}*/}
                {/*      userImg={*/}
                {/*        props.user.login.values !== undefined &&*/}
                {/*        props.user.login.values.loggedInWith !== "jwt" &&*/}
                {/*        props.user.login.values.photoUrl*/}
                {/*          ? props.user.login.values.photoUrl*/}
                {/*          : user !== undefined && user.picture*/}
                {/*            ? user.picture*/}
                {/*            : userImg*/}
                {/*      }*/}
                {/*      loggedInWith={*/}
                {/*        props.user !== undefined &&*/}
                {/*        props.user.login.values !== undefined*/}
                {/*          ? props.user.login.values.loggedInWith*/}
                {/*          : null*/}
                {/*      }*/}
                {/*      // logoutWithJWT={props.logoutWithJWT}*/}
                {/*      logoutWithFirebase={props.logoutWithFirebase}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="navbar-right-content" style={{display: "flex", alignItems: "center", gap: "8px"}}>
                  <NotificationsNoneIcon sx={{ width: 48, height: 48, color: "#0f172a", padding:"10px", backgroundColor:"rgba(15,23,42,0.06)", borderRadius:"100px" }} />
                  <Button
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#0f172a",
                      height: "48px",
                      textAlign: "left",
                      fontFamily: "Inter",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      gap: 1,
                      px: 1.5,
                      py: 0.5,
                      color: "#fff",
                      border: "1px solid #fff",
                      '&:hover': {
                        backgroundColor: "#0f172a", // Lighter shade on hover
                        borderColor: "#0f172a", // Change border color on hover
                      },
                    }}
                  >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap:0,}}>
                      <Typography variant="body2" sx={{color: "#fff", fontSize: "8px", fontWeight: 400}}>
                        Account Balance
                      </Typography>
                      <Typography variant="h6" sx={{color: "#fff", fontFamily:"Inter", fontSize: "16px", fontWeight: "bold"}}>
                        ৳320.00
                      </Typography>
                    </div>
                    <ArrowDropDownIcon sx={{width: 20, height: 20, color: '#fff'}}/> {/* White arrow */}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#1D94AB",
                      height: 48,
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      gap: 1,
                      color: "#fff",
                      borderColor: "#fff",
                      textAlign: "left",
                      "&:hover": {
                        backgroundColor: "#1d6f81",
                        borderColor: "#1d6f81",
                      },
                    }}
                  >
                    <AddIcon sx={{ width: 20, height: 20, color: "#fff" }} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#fff",
                          fontSize: 16,
                          textTransform: "capitalize",
                          fontWeight: 400,
                        }}
                      >
                        Recharge
                      </Typography>
                    </Box>
                  </Button>
                  <NavbarUser
                    handleAppOverlay={props.handleAppOverlay}
                    changeCurrentLang={props.changeCurrentLang}
                    userName={<UserName userdata={user} {...props} />}
                    userImg={
                      props.user.login.values !== undefined &&
                      props.user.login.values.loggedInWith !== "jwt" &&
                      props.user.login.values.photoUrl
                        ? props.user.login.values.photoUrl
                        : user !== undefined && user.picture
                          ? user.picture
                          : userImg
                    }
                    loggedInWith={
                      props.user !== undefined &&
                      props.user.login.values !== undefined
                        ? props.user.login.values.loggedInWith
                        : null
                    }
                    logoutWithFirebase={props.logoutWithFirebase}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps, {
  // logoutWithJWT,
  logoutWithFirebase,
  useAuth0,
})(ThemeNavbar);
