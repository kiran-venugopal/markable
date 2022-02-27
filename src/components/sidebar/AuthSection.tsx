import React, { Fragment, MutableRefObject, useRef, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";
import { useRecoilState } from "recoil";
import useContainerClick from "use-container-click";
import { userState } from "../../recoil/atoms";
import Spinner from "../spinner";

function AuthSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const { isLoggedIn, photo, name, email } = userData;
  const ref = useRef<HTMLDivElement>(document.createElement("div"));
  const { signIn, loaded } = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    clientId: process.env.REACT_APP_G_CLIENT_ID || "",
    isSignedIn: true,
  });
  const { signOut } = useGoogleLogout({
    onLogoutSuccess: handleLogoutSuccess,
    clientId: process.env.REACT_APP_G_CLIENT_ID || "",
  });
  useContainerClick(ref, () => setIsOpen(false));

  function handleLogoutSuccess() {
    setUserData((prev) => ({
      ...prev,
      isLoggedIn: false,
      token: "",
    }));
    setIsOpen(false);
  }

  function handleLoginSuccess(user: GoogleLoginResponse | any) {
    setUserData((prev) => ({
      ...prev,
      isLoggedIn: true,
      name: user?.profileObj?.name,
      photo: user?.profileObj?.imageUrl,
      token: user?.tokenId,
      email: user?.profileObj?.email,
    }));
    setIsOpen(false);
  }

  return (
    <div className="auth-section">
      {loaded ? (
        <Fragment>
          {isLoggedIn ? (
            <button className="secondary user" onClick={() => setIsOpen(true)}>
              <img className="profile" src={photo} alt={name} />
              <div className="details">
                <div className="name">{name}</div>
                <div className="email">{email}</div>
              </div>
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)} className="secondary">
              Sign In
            </button>
          )}
        </Fragment>
      ) : (
        <Spinner type="small" />
      )}

      {isOpen && (
        <div className="dropdown" ref={ref as MutableRefObject<HTMLDivElement>}>
          <div className="dd-option">
            {isLoggedIn ? (
              <button onClick={signOut} className="secondary">
                Logout
              </button>
            ) : (
              <button onClick={signIn} className="secondary">
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthSection;
