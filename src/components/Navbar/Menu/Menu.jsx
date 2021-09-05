import React from "react";
import { GoogleLogout } from "react-google-login";
import { FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms";
import { MenuWrapper } from "../../../styled-components";
import { Button } from "../../../utils/styles";

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
        <div>
          <Button style={{ textDecoration: "none", margin: "20px auto" }}>
            <a
              href="https://forms.gle/G784MWJyA3nWFH476"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Share your feedback
            </a>
          </Button>
        </div>
      </div>
    </MenuWrapper>
  );
}

export default Menu;
