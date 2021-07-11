import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AppHeader, NavbarWrapper, NavLink } from "../../styled-components";
import Drawer from "./Drawer/Drawer";
import Menu from "./Menu/Menu";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { userState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { HomeRoutes } from "../../Routes";

function Navbar() {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData] = useRecoilState(userState);
  const { currentPathName } = userData;

  function uniqueByKey(key) {
    let uniqueArray = [];
    for (let i = 0; i < this.length; i++) {
      let checkExist = uniqueArray.findIndex(
        (e) => e?.[key] === this?.[i]?.[key]
      );
      if (checkExist === -1) {
        uniqueArray.push(this?.[i]);
      }
    }
    return uniqueArray;
  }

  Array.prototype.uniqueByKey = uniqueByKey;

  return (
    <NavbarWrapper>
      <div className="app-header">
        <AppHeader onClick={() => history.push("/")}>
          <Logo width={130} />
        </AppHeader>
        <FaBars
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className="menu"
        />

        <Drawer
          width="400px"
          onClose={() => setIsDrawerOpen(false)}
          isOpen={isDrawerOpen}
        >
          <Menu />
        </Drawer>
      </div>
      <div className="actions">
        {HomeRoutes.uniqueByKey("name").map((routeConfig) => (
          <NavLink
            className={`${
              currentPathName === routeConfig.name ? "active" : ""
            }`}
            onClick={() => history.push(routeConfig.path)}
          >
            <span style={{ textTransform: "capitalize" }}>
              {routeConfig.name}
            </span>
          </NavLink>
        ))}
      </div>
    </NavbarWrapper>
  );
}

export default Navbar;
