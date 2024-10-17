import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import navigationConfig from "../../../../../configs/navigationConfig"
import { ChevronRight } from "react-feather";
import { Badge } from "reactstrap";
import SideMenuGroup from "./SideMenuGroup";
// import { FormattedMessage } from "react-intl"
import { useCCLContext } from "../../../../../context/CClContext.jsx";
import { getSelectedMenu } from "../../../../../context/reducer/actions";
import { history } from "../../../../../history";

const getInitialState = (authRoles) => {
  const username = localStorage.getItem("username");
  if (authRoles.name === "ROLE_BTRC") {
    return {
      menu: [
        {
          id: 1,
          title: "BTRC Portal",
          navLink: "/",
          type: "item",
          icon: "fa-solid fa-chart-simple",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },
      ],
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: [],
    };
  } else if (authRoles.name === "ROLE_WEBRTC") {
    return {
      menu: [
        {
          id: 1,
          title: username,
          // navLink: "/call-page-webrtc",
          type: "item",
          icon: "fa-solid fa-user",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },
        {
          id: 2,
          title: "Calls",
          navLink: "/call-page-webrtc",
          type: "item",
          icon: "fas fa-solid fa-phone",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },

        {
          id: 3,
          title: "Contacts",
          navLink: "/contatc-page-webrtc",
          type: "item",
          icon: "fas fa-solid fa-address-book",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },
      ],
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: [],
    };
  } else if (authRoles.name === "ROLE_USER") {
    return {
      menu: [
        {
          id: 1,
          title: "Dashboard",
          navLink: "/",
          type: "item",
          icon: "fa-solid fa-chart-simple",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },
        {
          id: 2,
          title: "Call History",
          navLink: "/userCallHistory",
          type: "item",
          icon: "fa-solid fa-book-medical",
          parentId: null,
          parentName: null,
          displayOrder: 2,
          children: null,
        },
        {
          id: 3,
          title: "Recharge",
          navLink: "/rechargeBalance",
          type: "item",
          icon: "fa-solid fa-wallet",
          parentId: null,
          parentName: null,
          displayOrder: 3,
          children: null,
        },
        {
          id: 4,
          title: "CDRs",
          navLink: "/CDRs",
          type: "item",
          icon: "fa-solid fa-diagram-predecessor",
          parentId: null,
          parentName: null,
          displayOrder: 4,
          children: null,
        },
      ],
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: [],
    };
  } else {
    return {
      // test menu:=>
      menu: [
        {
          id: 1,
          title: "Dashboard",
          navLink: "/",
          type: "item",
          icon: "fas fa-tachometer-alt",
          parentId: null,
          parentName: null,
          displayOrder: 1,
          children: null,
        },
        {
          id: 2,
          title: "Partners",
          navLink: "/distributors",
          type: "item",
          icon: "fa-solid fa-handshake",
          parentId: null,
          parentName: null,
          displayOrder: 2,
          children: null,
        },
        {
          id: 3,
          title: "Routes",
          navLink: "/smsRouting",
          type: "item",
          icon: "fa-solid fa-route",
          parentId: null,
          parentName: null,
          displayOrder: 3,
          children: null,
        },
        {
          id: 4,
          title: "Did Pool",
          navLink: "/didPool",
          type: "item",
          icon: "fa-solid fa-layer-group",
          parentId: null,
          parentName: null,
          displayOrder: 4,
          children: null,
        },
        {
          id: 5,
          title: "DidPool Number",
          navLink: "/didPoolNumber",
          type: "item",
          icon: "fa-solid fa-phone",
          parentId: null,
          parentName: null,
          displayOrder: 5,
          children: null,
        },
        {
          id: 6,
          title: "SIP Accounts",
          navLink: "/retailPartner",
          type: "item",
          icon: "fa-solid fa-user-gear",

          parentId: null,
          parentName: null,
          displayOrder: 6,
          children: null,
        },
        {
          id: 7,
          title: "CDRs",
          navLink: "/CDRs",
          type: "item",
          icon: "fa-solid fa-diagram-predecessor",
          parentId: 7,
          parentName: null,
          displayOrder: 6,
          children: null,
        },
        {
          id: 8,
          title: "User Managment",
          navLink: "/users",
          type: "item",
          icon: "fa-solid fa-users-gear",
          parentId: null,
          parentName: null,
          displayOrder: 8,
          children: null,
        },
        // {
        //   id: 8,
        //   title: "Role Managment",
        //   navLink: "/addRole",
        //   type: "item",
        //   icon: "fa-solid fa-list-check",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 8,
        //   children: null,
        // },
        // {
        //   id: 33,
        //   title: "Sms routing",
        //   navLink: "",
        //   type: "collapse",
        //   icon: "fas fa-graduation-cap",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 33,
        //   children: [
        //     {
        //       id: 35,
        //       title: "Routing",
        //       navLink: "/smsRouting",
        //       type: "item",
        //       icon: "",
        //       parentId: 33,
        //       parentName: null,
        //       displayOrder: 35,
        //       children: null,
        //     },
        //   ],
        // },

        // {
        //   id: 42,
        //   title: "Provisioning (no route)",
        //   navLink: "",
        //   type: "collapse",
        //   icon: "fas fa-university",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 42,
        //   children: [
        //     {
        //       id: 43,
        //       title: "Parameters",
        //       // navLink: "/parameters",
        //       type: "item",
        //       icon: "",
        //       parentId: 42,
        //       parentName: null,
        //       displayOrder: 43,
        //       children: null,
        //     },
        //     {
        //       id: 44,
        //       title: "Device configurations",
        //       // navLink: "/deviceConfigurations",
        //       type: "item",
        //       icon: "",
        //       parentId: 42,
        //       parentName: null,
        //       displayOrder: 44,
        //       children: null,
        //     },
        //     {
        //       id: 45,
        //       title: "Devices",
        //       // navLink: "/devices",
        //       type: "item",
        //       icon: "",
        //       parentId: 42,
        //       parentName: null,
        //       displayOrder: 45,
        //       children: null,
        //     },
        //   ],
        // },

        // {
        //   id: 46,
        //   title: "Partners",
        //   navLink: "",
        //   type: "collapse",
        //   icon: "fa-solid fa-handshake",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 46,
        //   children: [
        //     {
        //       id: 51,
        //       title: "Partners",
        //       navLink: "/distributors",
        //       type: "item",
        //       icon: "",
        //       parentId: 46,
        //       parentName: null,
        //       displayOrder: 51,
        //       children: null,
        //     },
        //     {
        //       id: 52,
        //       title: "SIP Accounts",
        //       navLink: "/retailpartner",
        //       type: "item",
        //       icon: "",
        //       parentId: 46,
        //       parentName: null,
        //       displayOrder: 51,
        //       children: null,
        //     },
        //   ],
        // },
        // {
        //   id: 58,
        //   title: "Reports",
        //   navLink: "",
        //   type: "collapse",
        //   icon: "far fa-money-bill-alt",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 58,
        //   children: [
        //     {
        //       id: 59,
        //       title: "CDRs",
        //       navLink: "/CDRs",
        //       type: "item",
        //       icon: "",
        //       parentId: 58,
        //       parentName: null,
        //       displayOrder: 59,
        //       children: null,
        //     },
        //   ],
        // },
        // {
        //   id: 65,
        //   title: "Did Pool",
        //   navLink: "",
        //   type: "collapse",
        //   icon: "fa-solid fa-layer-group",
        //   parentId: null,
        //   parentName: null,
        //   displayOrder: 65,
        //   children: [
        //     {
        //       id: 66,
        //       title: "DidPool",
        //       navLink: "/didPool",
        //       type: "item",
        //       icon: "",
        //       parentId: 65,
        //       parentName: null,
        //       displayOrder: 66,
        //       children: null,
        //     },
        //   ],
        // },
      ],
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: [],
    };
  }
};

const SideMenuContent = (props, prevProps) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const initialState =
    userInfo && userInfo.authRoles && userInfo.authRoles[0]
      ? getInitialState(userInfo.authRoles[0])
      : {
          menu: [],
          flag: true,
          isHovered: false,
          activeGroups: [],
          currentActiveGroup: [],
          tempArr: [],
        };

  const [menu, setMenu] = useState(initialState.menu);
  const [activeGroups, setActiveGroups] = useState(initialState.activeGroups);
  const [currentActiveGroup, setCurrentActiveGroup] = useState(
    initialState.currentActiveGroup
  );
  const [tempArr, setTempArr] = useState(initialState.tempArr);
  const [flag, setFlag] = useState(initialState.flag);

  const parentArr = []; // Initialize this according to your logic
  let collapsedPath = null;

  const redirectUnauthorized = () => {
    history.push("/misc/not-authorized");
  };

  const { dispatch } = useCCLContext();
  console.log();

  useEffect(() => {
    getSelectedMenu(
      getInitialState(userInfo.authRoles[0]).menu[0].title,
      dispatch
    );
  }, []);

  const handleGroupClick = (id, parent = null, type = "") => {
    let openGroup = [...activeGroups];
    let activeGroup = [...currentActiveGroup];
    let tempArrCopy = [...tempArr];

    // Logic for handling group clicks
    if (type === "item" && parent === null) {
      activeGroup = [];
      tempArrCopy = [];
    } else if (type === "item" && parent !== null) {
      activeGroup = [];
      if (tempArrCopy.includes(parent)) {
        tempArrCopy.splice(tempArrCopy.indexOf(parent) + 1, tempArrCopy.length);
      } else {
        tempArrCopy = [parent];
      }
      activeGroup = [...tempArrCopy];
    } else if (type === "collapse" && parent === null) {
      tempArrCopy = [id];
    } else if (type === "collapse" && parent !== null) {
      if (activeGroup.includes(parent)) {
        tempArrCopy = [...activeGroup];
      }
      if (tempArrCopy.includes(id)) {
        tempArrCopy.splice(tempArrCopy.indexOf(id), 1);
      } else {
        tempArrCopy.push(id);
      }
    } else {
      tempArrCopy = [];
    }

    if (type === "collapse") {
      if (!openGroup.includes(id)) {
        const temp = openGroup.filter((obj) => !activeGroup.includes(obj));
        if (temp.length > 0 && !openGroup.includes(parent)) {
          openGroup = openGroup.filter((obj) => !temp.includes(obj));
        }
        if (openGroup.includes(parent) && activeGroup.includes(parent)) {
          openGroup = [...activeGroup];
        }
        if (!openGroup.includes(id)) {
          openGroup.push(id);
          activeGroup.push(id);
        }
      } else {
        openGroup.splice(openGroup.indexOf(id), 1);
      }
    }
    if (type === "item") {
      openGroup = [...activeGroup];
    }

    setActiveGroups(openGroup);
    setTempArr(tempArrCopy);
    setCurrentActiveGroup(activeGroup);
  };

  const initRender = (parentArr) => {
    setActiveGroups([...parentArr]);
    setCurrentActiveGroup([...parentArr]);
    setFlag(false);
  };

  useEffect(() => {
    initRender(parentArr[0] || []);
  }, []);

  useEffect(() => {
    if (props.activePath !== prevProps.activePath) {
      if (collapsedPath !== null) {
        props.collapsedMenuPaths(collapsedPath);
      }
      initRender(parentArr[0] || []);
    }
  }, [props.activePath]);

  const renderMenuItems = () => {
    return menu.map((item) => {
      const CustomAnchorTag = item.type === "external-link" ? "a" : Link;

      if (item.type === "groupHeader") {
        return (
          <li
            className="navigation-header"
            key={`group-header-${item.groupTitle}`}
          >
            <span>{item.groupTitle}</span>
          </li>
        );
      }

      const renderItem = (
        <li
          className={classnames(
            `nav-item uapp-nav-item ${
              activeGroups[0] === item.id ? "open" : ""
            }`,
            {
              "has-sub": item.type === "collapse",
              open: activeGroups.includes(item.id),
              "sidebar-group-active": currentActiveGroup.includes(item.id),
              hover: props.hoverIndex === item.id,
              active:
                (props.activeItemState === item.navLink &&
                  item.type === "item") ||
                (item.parentOf &&
                  item.parentOf.includes(props.activeItemState)),
              disabled: item.disabled,
            }
          )}
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            getSelectedMenu(item.title, dispatch);
            if (item.type === "item") {
              console.log(item.title);
              props.handleActiveItem(item);
              handleGroupClick(item.id, null, item.type);
              if (props.deviceWidth <= 1200 && item.type === "item") {
                props.toggleMenu();
              }
            } else {
              handleGroupClick(item.id, null, item.type);
            }
          }}
        >
          <CustomAnchorTag
            to={
              item.filterBase ||
              (item.navLink && item.type === "item" ? item.navLink : "")
            }
            href={item.type === "external-link" ? item.navLink : ""}
            className={`d-flex ${
              item.badgeText
                ? "justify-content-between"
                : "justify-content-start"
            }`}
            onMouseEnter={() => props.handleSidebarMouseEnter(item.id)}
            onMouseLeave={() => props.handleSidebarMouseEnter(item.id)}
            onClick={(e) => item.type === "collapse" && e.preventDefault()}
            target={item.newTab ? "_blank" : undefined}
          >
            <div className="menu-text">
              <i className={item.icon}></i>
              <span className="menu-item menu-title">{item.title}</span>
            </div>
            {item.badge && (
              <div className="menu-badge">
                <Badge color={item.badge} className="mr-1" pill>
                  {item.badgeText}
                </Badge>
              </div>
            )}
            {item.type === "collapse" && (
              <ChevronRight className="menu-toggle-icon" size={13} />
            )}
          </CustomAnchorTag>
          {item.type === "collapse" && (
            <SideMenuGroup
              group={item}
              handleGroupClick={handleGroupClick}
              activeGroup={activeGroups}
              handleActiveItem={props.handleActiveItem}
              activeItemState={props.activeItemState}
              handleSidebarMouseEnter={props.handleSidebarMouseEnter}
              activePath={props.activePath}
              hoverIndex={props.hoverIndex}
              initRender={initRender}
              parentArr={parentArr}
              currentActiveGroup={currentActiveGroup}
              permission={props.permission}
              currentUser={props.currentUser}
              redirectUnauthorized={redirectUnauthorized}
              collapsedMenuPaths={props.collapsedMenuPaths}
              toggleMenu={props.toggleMenu}
              deviceWidth={props.deviceWidth}
            />
          )}
        </li>
      );

      if (item.navLink && item.collapsed) {
        collapsedPath = item.navLink;
        props.collapsedMenuPaths(item.navLink);
      }

      if (
        item.type === "collapse" ||
        item.type === "external-link" ||
        (item.type === "item" &&
          item.permissions &&
          item.permissions.includes(props.currentUser)) ||
        item.permissions === undefined
      ) {
        return renderItem;
      } else if (
        item.type === "item" &&
        item.navLink === props.activePath &&
        !item.permissions.includes(props.currentUser)
      ) {
        return redirectUnauthorized();
      }

      return null;
    });
  };

  return <React.Fragment>{renderMenuItems()}</React.Fragment>;
};

export default SideMenuContent;
