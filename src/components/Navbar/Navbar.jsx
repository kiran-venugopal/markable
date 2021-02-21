import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { AppHeader, NavbarWrapper, PrimaryBtn } from "../../styled-components";

function Navbar() {
  const history = useHistory();

  return (
    <NavbarWrapper>
      <AppHeader onClick={() => history.push("/")}>Todo Master</AppHeader>
      <div className="actions">
        <GoogleLogout
          clientId="578814648421-6kihuinbchgn9vm6t1g7e8l5j1s87iob.apps.googleusercontent.com"
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
