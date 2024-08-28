import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
// import navigationConfig from "../../../../../configs/navigationConfig"
import { ChevronRight } from "react-feather";
import { Badge } from "reactstrap";
import SideMenuGroup from "./SideMenuGroup";
// import { FormattedMessage } from "react-intl"
import { history } from "../../../../../history";

const getInitialState = (roles) => {
  const username = localStorage.getItem("username");

  if (roles.name === "ROLE_BTRC") {
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
  } else if (roles.name === "ROLE_WEBRTC") {
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
            {
              id: 7,
              title: "UC",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: null,
              parentName: null,
              displayOrder: 7,
              children: [
                {
                  id: 8,
                  title: "Companies",
                  navLink: "/companies",
                  type: "item",
                  icon: "",
                  parentId: 7,
                  parentName: null,
                  displayOrder: 8,
                  children: null,
                },
                {
                  id: 9,
                  title: "Sub accounts",
                  navLink: "/subAccounts",
                  type: "item",
                  icon: "",
                  parentId: 7,
                  parentName: null,
                  displayOrder: 14,
                  children: null,
                },
              ],
            },
            {
              id: 10,
              title: "LOT clients",
              navLink: "/admissionManagerList",
              type: "item",
              icon: "",
              parentId: 3,
              parentName: null,
              displayOrder: 10,
              chidren: null,
            },
            {
              id: 11,
              title: "Medical",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: null,
              parentName: null,
              displayOrder: 11,
              children: [
                {
                  id: 12,
                  title: "Patients",
                  navLink: "/patients",
                  type: "item",
                  icon: "",
                  parentId: 11,
                  parentName: null,
                  displayOrder: 12,
                  children: null,
                },
                {
                  id: 13,
                  title: "Provider",
                  navLink: "/medicalProvider",
                  type: "item",
                  icon: "",
                  parentId: 11,
                  parentName: null,
                  displayOrder: 13,
                  children: null,
                },
              ],
            },
            {
              id: 14,
              title: "Templates",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: null,
              parentName: null,
              displayOrder: 14,
              children: [
                {
                  id: 15,
                  title: "Agent",
                  navLink: "/agent",
                  type: "item",
                  icon: "fas fa-angle-right",
                  parentId: 14,
                  parentName: null,
                  displayOrder: 15,
                  children: null,
                },
                {
                  id: 16,
                  title: "Client",
                  navLink: "/client",
                  type: "item",
                  icon: "fas fa-angle-right",
                  parentId: 14,
                  parentName: null,
                  displayOrder: 16,
                  children: null,
                },
              ],
            },
          ],
        },
        {
          id: 17,
          title: "Billing",
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
              navLink: "/tariffs",
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
              navLink: "/bundles",
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
              navLink: "/product",
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
              navLink: "/plans",
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
              navLink: "/packages",
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
              navLink: "/invoice",
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
              navLink: "/vouchers",
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
              id: 27,
              title: "Gateways",
              navLink: "/gateways",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 27,
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
            {
              id: 29,
              title: "Lookups",
              navLink: "/lookups",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 29,
              children: null,
            },
            {
              id: 30,
              title: "Enum routes",
              navLink: "/enumRoutes",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 30,
              children: null,
            },
            {
              id: 31,
              title: "Callback routes",
              navLink: "/callbackRoutes",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 31,
              children: null,
            },
            {
              id: 32,
              title: "Groups",
              navLink: "/groups",
              type: "item",
              icon: "",
              parentId: 25,
              parentName: null,
              displayOrder: 32,
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
              id: 34,
              title: "Providers",
              navLink: "/smsProviders",
              type: "item",
              icon: "",
              parentId: 33,
              parentName: null,
              displayOrder: 34,
              children: null,
            },
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
          id: 36,
          title: "DIDs",
          navLink: "",
          type: "collapse",
          icon: "fas fa-user-graduate",
          parentId: null,
          parentName: null,
          displayOrder: 36,
          children: [
            {
              id: 37,
              title: "Routing",
              navLink: "/didsRouting",
              type: "item",
              icon: "",
              parentId: 36,
              parentName: null,
              displayOrder: 37,
              children: null,
            },
            {
              id: 38,
              title: "Pricing",
              navLink: "/pricing",
              type: "item",
              icon: "",
              parentId: 36,
              parentName: null,
              displayOrder: 38,
              children: null,
            },
            {
              id: 39,
              title: "Local",
              navLink: "/local",
              type: "item",
              icon: "",
              parentId: 36,
              parentName: null,
              displayOrder: 39,
              children: null,
            },
            {
              id: 40,
              title: "Promotions",
              navLink: "/promotions",
              type: "item",
              icon: "",
              parentId: 36,
              parentName: null,
              displayOrder: 40,
              children: null,
            },
            {
              id: 41,
              title: "Access numbers",
              navLink: "/accessNumbers",
              type: "item",
              icon: "",
              parentId: 36,
              parentName: null,
              displayOrder: 41,
              children: null,
            },
          ],
        },
        {
          id: 42,
          title: "Provisioning",
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
              navLink: "/parameters",
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
              navLink: "/deviceConfigurations",
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
              navLink: "/devices",
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
          icon: "fas fa-university",
          parentId: null,
          parentName: null,
          displayOrder: 46,
          children: [
            {
              id: 47,
              title: "Resellers",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: 46,
              parentName: null,
              displayOrder: 47,
              children: [
                {
                  id: 48,
                  title: "Resellers l",
                  navLink: "/resellers1",
                  type: "item",
                  icon: "",
                  parentId: 47,
                  parentName: null,
                  displayOrder: 48,
                  children: null,
                },
                {
                  id: 49,
                  title: "Resellers ll",
                  navLink: "/resellers2",
                  type: "item",
                  icon: "",
                  parentId: 47,
                  parentName: null,
                  displayOrder: 49,
                  children: null,
                },
                {
                  id: 50,
                  title: "Resellers lll",
                  navLink: "/resellers3",
                  type: "item",
                  icon: "",
                  parentId: 47,
                  parentName: null,
                  displayOrder: 50,
                  children: null,
                },
              ],
            },
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
              title: "Agents",
              navLink: "/agents",
              type: "item",
              icon: "",
              parentId: 46,
              parentName: null,
              displayOrder: 52,
              children: null,
            },
          ],
        },
        {
          id: 53,
          title: "Mobile top up",
          navLink: "",
          type: "collapse",
          icon: "fas fa-magnifying-glass",
          parentId: null,
          parentName: null,
          displayOrder: 53,
          children: [
            {
              id: 54,
              title: "Suppliers",
              navLink: "/suppliers",
              type: "item",
              icon: "",
              parentId: 53,
              parentName: null,
              displayOrder: 54,
              children: null,
            },
            {
              id: 55,
              title: "Operators",
              navLink: "/operators",
              type: "item",
              icon: "",
              parentId: 53,
              parentName: null,
              displayOrder: 55,
              children: null,
            },
            {
              id: 56,
              title: "Amounts",
              navLink: "/amounts",
              type: "item",
              icon: "",
              parentId: 53,
              parentName: null,
              displayOrder: 56,
              children: null,
            },
          ],
        },
        {
          id: 57,
          title: "Callback tasks",
          navLink: "/callbackTasks",
          type: "item",
          icon: "far fa-file",
          parentId: null,
          parentName: null,
          displayOrder: 57,
          children: null,
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
            {
              id: 60,
              title: "Payments",
              navLink: "/payments",
              type: "item",
              icon: "",
              parentId: 58,
              parentName: null,
              displayOrder: 60,
              children: null,
            },
            {
              id: 61,
              title: "Os transations",
              navLink: "/osTransations",
              type: "item",
              icon: "",
              parentId: 58,
              parentName: null,
              displayOrder: 61,
              children: null,
            },
            {
              id: 62,
              title: "MTU transations",
              navLink: "/mtuTransations",
              type: "item",
              icon: "",
              parentId: 58,
              parentName: null,
              displayOrder: 62,
              children: null,
            },
          ],
        },
        {
          id: 63,
          title: "Logs",
          navLink: "",
          type: "collapse",
          icon: "fas fa-money-check-alt",
          parentId: null,
          parentName: null,
          displayOrder: 63,
          children: [
            {
              id: 64,
              title: "RCS registrations",
              navLink: "/rcsRegistrations",
              type: "item",
              icon: "",
              parentId: 63,
              parentName: null,
              displayOrder: 64,
              children: null,
            },
            {
              id: 65,
              title: "Marketing consents",
              navLink: "/marketingConsents",
              type: "item",
              icon: "",
              parentId: 63,
              parentName: null,
              displayOrder: 65,
              children: null,
            },
            {
              id: 66,
              title: "Event manager",
              navLink: "/eventManager",
              type: "item",
              icon: "",
              parentId: 63,
              parentName: null,
              displayOrder: 66,
              children: null,
            },
            {
              id: 67,
              title: "Web apps audit",
              navLink: "/webAppsAudit",
              type: "item",
              icon: "",
              parentId: 63,
              parentName: null,
              displayOrder: 67,
              children: null,
            },
            {
              id: 68,
              title: "Web apps logs",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: 63,
              parentName: null,
              displayOrder: 68,
              children: [
                {
                  id: 69,
                  title: "VSM4",
                  navLink: "/vsm4",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 69,
                  children: null,
                },
                {
                  id: 70,
                  title: "VUP",
                  navLink: "/vup",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 70,
                  children: null,
                },
                {
                  id: 71,
                  title: "VUC",
                  navLink: "/vuc",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 71,
                  children: null,
                },
                {
                  id: 72,
                  title: "OS",
                  navLink: "/webOs",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 72,
                  children: null,
                },
                {
                  id: 73,
                  title: "EMCI",
                  navLink: "/emci",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 73,
                  children: null,
                },
                {
                  id: 74,
                  title: "EMCD",
                  navLink: "/emcd",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 74,
                  children: null,
                },
                {
                  id: 75,
                  title: "EM",
                  navLink: "/em",
                  type: "item",
                  icon: "",
                  parentId: 68,
                  parentName: null,
                  displayOrder: 75,
                  children: null,
                },
              ],
            },
          ],
        },
        {
          id: 76,
          title: "Settings",
          navLink: "",
          type: "collapse",
          icon: "fas fa-handshake",
          parentId: null,
          parentName: null,
          displayOrder: 76,
          children: [
            {
              id: 77,
              title: "General",
              navLink: "/general",
              type: "item",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 77,
              children: null,
            },
            {
              id: 78,
              title: "OS",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 78,
              children: [
                {
                  id: 79,
                  title: "Charged amouts",
                  navLink: "/chargedAmouts",
                  type: "item",
                  icon: "",
                  parentId: 78,
                  parentName: null,
                  displayOrder: 79,
                  children: null,
                },
                {
                  id: 80,
                  title: "Referrals",
                  navLink: "/referrals",
                  type: "item",
                  icon: "",
                  parentId: 78,
                  parentName: null,
                  displayOrder: 80,
                  children: null,
                },
                {
                  id: 81,
                  title: "Recharge bonuses",
                  navLink: "/rechargeBonuses",
                  type: "item",
                  icon: "",
                  parentId: 78,
                  parentName: null,
                  displayOrder: 81,
                  children: null,
                },
                {
                  id: 82,
                  title: "Payment descriptions",
                  navLink: "/paymentDescriptions",
                  type: "item",
                  icon: "",
                  parentId: 78,
                  parentName: null,
                  displayOrder: 82,
                  children: null,
                },
                {
                  id: 83,
                  title: "Blockades",
                  navLink: "/blockades",
                  type: "item",
                  icon: "",
                  parentId: 78,
                  parentName: null,
                  displayOrder: 83,
                  children: null,
                },
              ],
            },
            {
              id: 84,
              title: "Core",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 84,
              children: [
                {
                  id: 85,
                  title: "Allowed IPs",
                  navLink: "/allowedIPs",
                  type: "item",
                  icon: "",
                  parentId: 84,
                  parentName: null,
                  displayOrder: 85,
                  children: null,
                },
                {
                  id: 86,
                  title: "Blocked IPs",
                  navLink: "/blockedIPs",
                  type: "item",
                  icon: "",
                  parentId: 84,
                  parentName: null,
                  displayOrder: 86,
                  children: null,
                },
                {
                  id: 87,
                  title: "Blocked caller IDs",
                  navLink: "/blockedCallerIDs",
                  type: "item",
                  icon: "",
                  parentId: 84,
                  parentName: null,
                  displayOrder: 87,
                  children: null,
                },
                {
                  id: 88,
                  title: "Teck-prefix values lists",
                  navLink: "/teckPrefixValuesLists",
                  type: "item",
                  icon: "",
                  parentId: 84,
                  parentName: null,
                  displayOrder: 88,
                  children: null,
                },
              ],
            },
            {
              id: 89,
              title: "Currencies",
              navLink: "/currencies",
              type: "item",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 89,
              children: null,
            },
            {
              id: 90,
              title: "Custom fields",
              navLink: "/customFields",
              type: "item",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 90,
              children: null,
            },
            {
              id: 91,
              title: "Templates",
              navLink: "",
              type: "collapse",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 91,
              children: [
                {
                  id: 92,
                  title: "Email Templates",
                  navLink: "/emailTemplates",
                  type: "item",
                  icon: "",
                  parentId: 91,
                  parentName: null,
                  displayOrder: 92,
                  children: null,
                },
                {
                  id: 93,
                  title: "Invoice templates",
                  navLink: "/invoiceTemplates",
                  type: "item",
                  icon: "",
                  parentId: 91,
                  parentName: null,
                  displayOrder: 93,
                  children: null,
                },
              ],
            },
            {
              id: 94,
              title: "Events manager",
              navLink: "/eventsManager",
              type: "item",
              icon: "",
              parentId: 76,
              parentName: null,
              displayOrder: 94,
              children: null,
            },
          ],
        },
      ],

      // menu: [
      //   {
      //     id: 1,
      //     title: "Stats",
      //     navLink: "/",
      //     type: "item",
      //     icon: "fa-solid fa-chart-simple",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 1,
      //     children: null,
      //   },
      //   {
      //     id: 2,
      //     title: "Roles",
      //     navLink: "/addRole",
      //     type: "item",
      //     icon: "fa-solid fa-chart-simple",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 1,
      //     children: null,
      //   },
      //   {
      //     id: 26,
      //     title: "Rate Plan",
      //     navLink: "/ratePlan",
      //     type: "item",
      //     icon: "fa-solid fa-chart-simple",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 1,
      //     children: null,
      //   },
      //   {
      //     id: 3,
      //     title: "Permissions",
      //     navLink: "/permissions",
      //     type: "item",
      //     icon: "fa-solid fa-chart-simple",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 1,
      //     children: null,
      //   },
      //   {
      //     id: 4,
      //     title: "User",
      //     navLink: "/users",
      //     type: "item",
      //     icon: "fa-solid fa-user-group",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 2,
      //     children: null,
      //   },
      //   {
      //     id: 5,
      //     title: "SIP Trunk",
      //     navLink: "/siptrunk",
      //     type: "item",
      //     icon: "fa-solid fa-bars",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 3,
      //   },

      //   {
      //     id: 6,
      //     title: "Notification",
      //     navLink: "",
      //     type: "item",
      //     icon: "fa-solid fa-bell",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 7,
      //   },
      //   {
      //     id: 7,
      //     title: "Sales",
      //     navLink: "/sales",
      //     type: "item",
      //     icon: "fa-solid fa-dollar-sign",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 12,
      //   },
      //   {
      //     id: 8,
      //     title: "Calls",
      //     navLink: "/calls",
      //     type: "item",
      //     icon: "fa-solid fa-phone",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 16,
      //     children: null,
      //   },
      //   {
      //     id: 9,
      //     title: "Stickers",
      //     navLink: "/studentList",
      //     type: "item",
      //     icon: "fa-solid fa-note-sticky",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 17,
      //     children: null,
      //   },
      //   {
      //     id: 10,
      //     title: "Calling Cards",
      //     navLink: "/callCard",
      //     type: "item",
      //     icon: "",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 17,
      //   },
      //   {
      //     id: 11,
      //     title: "Call Packages",
      //     navLink: "/callPackages",
      //     type: "item",
      //     icon: "far fa-file",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 22,
      //     children: null,
      //   },
      //   {
      //     id: 12,
      //     title: "services Gateways",
      //     navLink: "",
      //     type: "item",
      //     icon: "fa-solid fa-envelope",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 23,
      //   },
      //   {
      //     id: 13,
      //     title: "Setting",
      //     navLink: "",
      //     type: "item",
      //     icon: "fa-solid fa-gear",
      //     parentId: null,
      //     parentName: null,
      //     displayOrder: 29,
      //   },
      // ],
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
      userInfo && userInfo.roles && userInfo.roles[0]
        ? getInitialState(userInfo.roles[0])
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
