import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
// import navigationConfig from "../../../../../configs/navigationConfig"
import { ChevronRight } from "react-feather";
import { Badge } from "reactstrap";
import SideMenuGroup from "./SideMenuGroup";
// import { FormattedMessage } from "react-intl"
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
          icon: "fa-solid fa-book-medical",
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
          id: 3,
          title: "Clients",
          navLink: "",
          type: "collapse",
          icon: "fas fa-cog",
          parentId: null,
          parentName: null,
          displayOrder: 3,
          children: [
            {
              id: 4,
              title: "Retail clients",
              navLink: "/retailClients",
              type: "item",
              icon: "",
              parentId: 3,
              parentName: null,
              displayOrder: 4,
              children: null,
            },
            {
              id: 5,
              title: "Wholesale clients",
              navLink: "/wholesaleClients",
              type: "item",
              icon: "",
              parentId: 3,
              parentName: null,
              displayOrder: 5,
              children: null,
            },
            {
              id: 6,
              title: "Callshop clients",
              navLink: "/callshopClients",
              type: "item",
              icon: "",
              parentId: 3,
              parentName: null,
              displayOrder: 6,
              children: null,
            },
          ],
        },
        {
          id: 17,
          title: "Billing (no route)",
          navLink: "",
          type: "collapse",
          icon: "fas fa-users",
          parentId: null,
          parentName: null,
          displayOrder: 17,
          children: [
            {
              id: 18,
              title: "Tariffs",
              // navLink: "/tariffs",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 18,
              children: null,
            },
            {
              id: 19,
              title: "Bundles",
              // navLink: "/bundles",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 19,
              children: null,
            },
            {
              id: 20,
              title: "Products",
              // navLink: "/product",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 20,
              children: null,
            },
            {
              id: 21,
              title: "Plans",
              // navLink: "/plans",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 21,
              children: null,
            },
            {
              id: 22,
              title: "Packages",
              // navLink: "/packages",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 22,
              children: null,
            },
            {
              id: 23,
              title: "Invoice",
              // navLink: "/invoice",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 23,
              children: null,
            },
            {
              id: 24,
              title: "Vouchers",
              // navLink: "/vouchers",
              type: "item",
              icon: "",
              parentId: 17,
              parentName: null,
              displayOrder: 23,
              children: null,
            },
          ],
        },
        {
          id: 25,
          title: "Calls routing",
          navLink: "",
          type: "collapse",
          icon: "fas fa-user-tie",
          parentId: null,
          parentName: null,
          displayOrder: 25,
          children: [
            {
              id: 26,
              title: "Routing plan",
              navLink: "/routingPlan",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 26,
              children: null,
            },

            {
              id: 28,
              title: "Registers",
              navLink: "/registers",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 28,
              children: null,
            },
          ],
        },
        {
          id: 33,
          title: "Sms routing",
          navLink: "",
          type: "collapse",
          icon: "fas fa-graduation-cap",
          parentId: null,
          parentName: null,
          displayOrder: 33,
          children: [
            {
              id: 35,
              title: "Routing",
              navLink: "/smsRouting",
              type: "item",
              icon: "",
              parentId: 33,
              parentName: null,
              displayOrder: 35,
              children: null,
            },
          ],
        },

        {
          id: 42,
          title: "Provisioning (no route)",
          navLink: "",
          type: "collapse",
          icon: "fas fa-university",
          parentId: null,
          parentName: null,
          displayOrder: 42,
          children: [
            {
              id: 43,
              title: "Parameters",
              // navLink: "/parameters",
              type: "item",
              icon: "",
              parentId: 42,
              parentName: null,
              displayOrder: 43,
              children: null,
            },
            {
              id: 44,
              title: "Device configurations",
              // navLink: "/deviceConfigurations",
              type: "item",
              icon: "",
              parentId: 42,
              parentName: null,
              displayOrder: 44,
              children: null,
            },
            {
              id: 45,
              title: "Devices",
              // navLink: "/devices",
              type: "item",
              icon: "",
              parentId: 42,
              parentName: null,
              displayOrder: 45,
              children: null,
            },
          ],
        },
        {
          id: 46,
          title: "Partners",
          navLink: "",
          type: "collapse",
          icon: "fa-solid fa-handshake",
          parentId: null,
          parentName: null,
          displayOrder: 46,
          children: [
            {
              id: 51,
              title: "Distributors",
              navLink: "/distributors",
              type: "item",
              icon: "",
              parentId: 46,
              parentName: null,
              displayOrder: 51,
              children: null,
            },
            {
              id: 52,
              title: "Retail Partners",
              navLink: "/retailpartner",
              type: "item",
              icon: "",
              parentId: 46,
              parentName: null,
              displayOrder: 51,
              children: null,
            },
          ],
        },
        {
          id: 58,
          title: "Reports",
          navLink: "",
          type: "collapse",
          icon: "far fa-money-bill-alt",
          parentId: null,
          parentName: null,
          displayOrder: 58,
          children: [
            {
              id: 59,
              title: "CDRs",
              navLink: "/CDRs",
              type: "item",
              icon: "",
              parentId: 58,
              parentName: null,
              displayOrder: 59,
              children: null,
            },
          ],
        },
        {
          id: 65,
          title: "Did Pool",
          navLink: "",
          type: "collapse",
          icon: "fa-solid fa-layer-group",
          parentId: null,
          parentName: null,
          displayOrder: 65,
          children: [
            {
              id: 66,
              title: "DidPool",
              navLink: "/didPool",
              type: "item",
              icon: "",
              parentId: 65,
              parentName: null,
              displayOrder: 66,
              children: null,
            },
          ],
        },
      ],
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: [],
    };
  }
};

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);

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

    this.state = initialState;

    this.parentArr = [];
    this.collapsedPath = null;
    this.redirectUnauthorized = () => {
      history.push("/misc/not-authorized");
    };
  }

  handleGroupClick = (id, parent = null, type = "") => {
    let open_group = this.state.activeGroups;
    let active_group = this.state.currentActiveGroup;
    let temp_arr = this.state.tempArr;
    if (type === "item" && parent === null) {
      active_group = [];
      temp_arr = [];
    } else if (type === "item" && parent !== null) {
      active_group = [];
      if (temp_arr.includes(parent)) {
        temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
      } else {
        temp_arr = [];
        temp_arr.push(parent);
      }
      active_group = temp_arr.slice(0);
    } else if (type === "collapse" && parent === null) {
      temp_arr = [];
      temp_arr.push(id);
    } else if (type === "collapse" && parent !== null) {
      if (active_group.includes(parent)) {
        temp_arr = active_group.slice(0);
      }
      if (temp_arr.includes(id)) {
        temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
      } else {
        temp_arr.push(id);
      }
    } else {
      temp_arr = [];
    }

    if (type === "collapse") {
      if (!open_group.includes(id)) {
        let temp = open_group.filter((obj) => {
          return active_group.indexOf(obj) === -1;
        });
        if (temp.length > 0 && !open_group.includes(parent)) {
          open_group = open_group.filter((obj) => {
            return !temp.includes(obj);
          });
        }
        if (open_group.includes(parent) && active_group.includes(parent)) {
          open_group = active_group.slice(0);
        }
        if (!open_group.includes(id)) {
          open_group.push(id);
          active_group.push(id);
        }
      } else {
        open_group.splice(open_group.indexOf(id), 1);
      }
    }
    if (type === "item") {
      open_group = active_group.slice(0);
    }

    this.setState({
      activeGroups: open_group,
      tempArr: temp_arr,
      currentActiveGroup: active_group,
    });
  };

  initRender = (parentArr) => {
    this.setState({
      activeGroups: parentArr.slice(0),
      currentActiveGroup: parentArr.slice(0),
      flag: false,
    });
  };

  componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : []);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(
        this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []
      );
    }
  }

  render() {
    const navigationConfig = this.state.menu || [];
    const menuItems =
      navigationConfig.length > 0
        ? navigationConfig.map((item) => {
            const CustomAnchorTag = item.type === "external-link" ? `a` : Link;
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

            let renderItem = (
              <li
                className={classnames(
                  `nav-item uapp-nav-item ${
                    this.state.activeGroups[0] === item.id ? "open" : ""
                  }`,
                  {
                    "has-sub": item.type === "collapse",
                    open: this.state.activeGroups.includes(item.id),
                    "sidebar-group-active":
                      this.state.currentActiveGroup.includes(item.id),
                    hover: this.props.hoverIndex === item.id,
                    active:
                      (this.props.activeItemState === item.navLink &&
                        item.type === "item") ||
                      (item.parentOf &&
                        item.parentOf.includes(this.props.activeItemState)),
                    disabled: item.disabled,
                  }
                )}
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.type === "item") {
                    this.props.handleActiveItem(item.navLink);
                    this.handleGroupClick(item.id, null, item.type);
                    if (
                      this.props.deviceWidth <= 1200 &&
                      item.type === "item"
                    ) {
                      this.props.toggleMenu();
                    }
                  } else {
                    this.handleGroupClick(item.id, null, item.type);
                  }
                }}
              >
                <CustomAnchorTag
                  to={
                    item.filterBase
                      ? item.filterBase
                      : item.navLink && item.type === "item"
                      ? item.navLink
                      : ""
                  }
                  href={item.type === "external-link" ? item.navLink : ""}
                  className={`d-flex ${
                    item.badgeText
                      ? "justify-content-between"
                      : "justify-content-start"
                  }`}
                  onMouseEnter={() => {
                    this.props.handleSidebarMouseEnter(item.id);
                  }}
                  onMouseLeave={() => {
                    this.props.handleSidebarMouseEnter(item.id);
                  }}
                  key={item.id}
                  onClick={(e) => {
                    return item.type === "collapse" ? e.preventDefault() : "";
                  }}
                  target={item.newTab ? "_blank" : undefined}
                >
                  <div className="menu-text">
                    <i className={item.icon}></i>
                    <span className="menu-item menu-title">{item.title}</span>
                  </div>
                  {item.badge ? (
                    <div className="menu-badge">
                      <Badge color={item.badge} className="mr-1" pill>
                        {item.badgeText}
                      </Badge>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.type === "collapse" ? (
                    <ChevronRight className="menu-toggle-icon" size={13} />
                  ) : (
                    ""
                  )}
                </CustomAnchorTag>
                {item.type === "collapse" ? (
                  <SideMenuGroup
                    group={item}
                    handleGroupClick={this.handleGroupClick}
                    activeGroup={this.state.activeGroups}
                    handleActiveItem={this.props.handleActiveItem}
                    activeItemState={this.props.activeItemState}
                    handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
                    activePath={this.props.activePath}
                    hoverIndex={this.props.hoverIndex}
                    initRender={this.initRender}
                    parentArr={this.parentArr}
                    triggerActive={undefined}
                    currentActiveGroup={this.state.currentActiveGroup}
                    permission={this.props.permission}
                    currentUser={this.props.currentUser}
                    redirectUnauthorized={this.redirectUnauthorized}
                    collapsedMenuPaths={this.props.collapsedMenuPaths}
                    toggleMenu={this.props.toggleMenu}
                    deviceWidth={this.props.deviceWidth}
                  />
                ) : (
                  ""
                )}
              </li>
            );

            if (
              item.navLink &&
              item.collapsed !== undefined &&
              item.collapsed === true
            ) {
              this.collapsedPath = item.navLink;
              this.props.collapsedMenuPaths(item.navLink);
            }

            if (
              item.type === "collapse" ||
              item.type === "external-link" ||
              (item.type === "item" &&
                item.permissions &&
                item.permissions.includes(this.props.currentUser)) ||
              item.permissions === undefined
            ) {
              return renderItem;
            } else if (
              item.type === "item" &&
              item.navLink === this.props.activePath &&
              !item.permissions.includes(this.props.currentUser)
            ) {
              return this.redirectUnauthorized();
            }

            return null;
          })
        : null;

    return <React.Fragment>{menuItems}</React.Fragment>;
  }
}

export default SideMenuContent;
