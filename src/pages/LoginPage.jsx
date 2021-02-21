import React from "react";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";

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
        isLoggedIn: true,
        name: response.profileObj.name,
        photo: response.profileObj.imageUrl,
        token: response.tokenId,
      }));

      console.log(userData);
      let fromPath = localStorage.getItem("fromUrl");
      localStorage.removeItem("fromUrl");

      history.push(fromPath || "/");
    }
  };

  return (
    <div className="center-aligned">
      <div className="heading-text">Welcome to Todo Master</div>
      <GoogleLogin
        clientId="578814648421-6kihuinbchgn9vm6t1g7e8l5j1s87iob.apps.googleusercontent.com"
        buttonText="Login / Register"
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
