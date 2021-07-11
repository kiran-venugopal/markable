import React from "react";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { ReactComponent as Logo } from "../icons/logo-vertical.svg";

export default function LoginPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem("keepLoggedIn") || "false")
  );

  const history = useHistory();

  const responseGoogle = async (response) => {
    console.log(response);
    if (response && response.profileObj) {
      await setUserData((prev) => ({
        ...prev,
        ...response.profileObj,
        isLoggedIn: true,
        photo: response.profileObj.imageUrl,
        token: response.tokenId,
      }));

      let refPath = new URL(window.location.href).searchParams.get("ref");
      history.push(refPath || "/");
    }
  };

  return (
    <div className="center-aligned">
      <div className="heading-text">
        <Logo width={200} />
      </div>
      <GoogleLogin
        clientId={process.env.REACT_APP_G_CLIENT_ID}
        buttonText="Login / SignUp"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={isLoggedIn}
      />
      <div>
        <label className="checkbox">
          <input
            type="checkbox"
            onChange={(e) => {
              setIsLoggedIn(e.target.checked);
              window.localStorage.setItem("keepLoggedIn", e.target.checked);
            }}
            checked={isLoggedIn}
          />
          Keep logged in
        </label>
      </div>
    </div>
  );
}
