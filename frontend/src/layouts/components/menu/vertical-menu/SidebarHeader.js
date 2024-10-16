import classnames from "classnames";
import React from "react";
import { Menu } from "react-feather";
import { NavLink } from "react-router-dom";
import config from "../../../../configs/config.json";

const SidebarHeader = ({
  toggleSidebarMenu,
  activeTheme,
  collapsed,
  toggle,
  sidebarVisibility,
  menuShadow,
}) => {
  const siteLogoUrl = config.siteLogoUrl;

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row d-flex">
        <li className="nav-item mr-auto">
          <NavLink to="/" className="navbar-brand">
            <div className="brand-logo">
              {/* <h2 className="brand-text mb-0">Z-DESK</h2> */}

              <div className="hide-min-678" style={{ width: "132px" }}>
                <img src={siteLogoUrl} className="img-fluid" alt="site-logo" />
              </div>
              <div className="show-max-678">
                <img src={siteLogoUrl} alt="small-site-logo" />
              </div>
            </div>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle" style={{ marginLeft: "20px" }}>
          <div className="nav-link modern-nav-toggle">
            {collapsed === false ? (
              <Menu
                onClick={() => {
                  toggleSidebarMenu(true);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4 1 text-uapp"
                )}
                size={24}
                data-tour="toggle-icon"
              />
            ) : (
              <Menu
                onClick={() => {
                  toggleSidebarMenu(false);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4 2 text-uapp"
                )}
                size={24}
              />
            )}
            <Menu
              onClick={sidebarVisibility}
              className={classnames(
                "toggle-icon icon-x d-block d-xl-none font-medium-4 3 text-uapp"
              )}
              size={24}
            />
          </div>
        </li>
      </ul>
      <div
        className={classnames("shadow-bottom", {
          "d-none": menuShadow === false,
        })}
      />
    </div>
  );
};

export default SidebarHeader;
