import React from "react";
import { GoogleLogout } from "react-google-login";
import { FaCheckSquare, FaFile } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AppHeader, NavbarWrapper, PrimaryBtn } from "../../styled-components";
import { Button } from "../../utils/styles";

function Navbar() {
  const history = useHistory();

  return (
    <NavbarWrapper>
      <AppHeader onClick={() => history.push("/")}>Todo Master</AppHeader>
      <div className="actions">
        <Button
          onClick={() => history.push("/todos")}
          style={{ margin: "4px", fontSize: "10px" }}
        >
          <FaCheckSquare className="icon" />
          <span>Todos</span>
        </Button>

        <Button
          onClick={() => history.push("/notes")}
          style={{ margin: "4px 10px 4px 4px", fontSize: "10px" }}
        >
          <FaFile className="icon" />
          <span>Notes</span>
        </Button>

        <GoogleLogout
          clientId={process.env.REACT_APP_G_CLIENT_ID}
          buttonText="Login / Register"
          onLogoutSuccess={() => history.push("/login")}
          render={(props) => (
            <PrimaryBtn onClick={props.onClick} disabled={props.disabled}>
              Logout
            </PrimaryBtn>
          )}
        />
      </div>
    </NavbarWrapper>
  );
}

export default Navbar;
