import React from "react";
import { GoogleLogout } from "react-google-login";
import { FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms";
import { MenuWrapper } from "../../../styled-components";

function Menu() {
  const [userData] = useRecoilState(userState);
  const history = useHistory();

  return (
    <MenuWrapper>
      <div className="header">
        <img src={userData.photo} alt="" />
        <div className="name">{userData.name}</div>
        <div className="email">{userData.email}</div>
      </div>
      <div className="options">
        <GoogleLogout
          clientId={process.env.REACT_APP_G_CLIENT_ID}
          buttonText="Login / Register"
          onLogoutSuccess={() => history.push("/login")}
          render={(props) => (
            <div
              onClick={props.onClick}
              disabled={props.disabled}
              className="option"
            >
              <span className="icon">
                <FaUser />
              </span>

              <span>Logout</span>
            </div>
          )}
        />
      </div>
    </MenuWrapper>
  );
}

export default Menu;
