import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AppHeader, NavbarWrapper, NavLink } from "../../styled-components";
import Drawer from "./Drawer/Drawer";
import Menu from "./Menu/Menu";

function Navbar() {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <NavbarWrapper>
      <div className="app-header">
        <AppHeader onClick={() => history.push("/")}>Todo Master</AppHeader>
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
        <NavLink
          className={`${history.location.pathname === "/todos" && "active"}`}
          onClick={() => history.push("/todos")}
        >
          <span>Todos</span>
        </NavLink>

        <NavLink
          className={`${
            ["/notes", "/", "/add-note"].includes(history.location.pathname) &&
            "active"
          }`}
          onClick={() => history.push("/notes")}
        >
          <span>Notes</span>
        </NavLink>

        {/* <GoogleLogout
          clientId={process.env.REACT_APP_G_CLIENT_ID}
          buttonText="Login / Register"
          onLogoutSuccess={() => history.push("/login")}
          render={(props) => (
            <PrimaryBtn onClick={props.onClick} disabled={props.disabled}>
              Logout
            </PrimaryBtn>
          )}
        /> */}
      </div>
    </NavbarWrapper>
  );
}

export default Navbar;
