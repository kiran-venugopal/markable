import React, { useState } from "react";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AppHeader, NavbarWrapper, NavLink } from "../../styled-components";
import Drawer from "./Drawer/Drawer";
import Menu from "./Menu/Menu";
import { ReactComponent as Logo } from "../../icons/logo.svg";

function Navbar() {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("notes");

  useEffect(() => {
    let pathname = history?.location.pathname;
    if (pathname && pathname.includes("note")) {
      setActiveTab("notes");
    } else setActiveTab("todos");
  }, [history.location.pathname]);

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
        <NavLink
          className={`${activeTab === "todos" ? "active" : ""}`}
          onClick={() => history.push("/todos")}
        >
          <span>Todos</span>
        </NavLink>

        <NavLink
          className={`${activeTab === "notes" ? "active" : ""}`}
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
