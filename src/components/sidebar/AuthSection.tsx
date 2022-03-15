import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GoogleLoginResponse,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";
import { useRecoilState } from "recoil";
import useContainerClick from "use-container-click";
import tokenStorage from "../../APIs/tokenStorage";
import useOnline from "../../hooks/useOnline";
import { userState } from "../../recoil/atoms";
import Spinner from "../spinner";

function AuthSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);
  const isOnline = useOnline();
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
    tokenStorage.setToken(user.tokenId);
    setIsOpen(false);
  }

  if (!isOnline) {
    return (
      <div className="auth-section">
        <div className="hint">
          Your are offline! Check your data or wifi connection.
        </div>
      </div>
    );
  }

  return (
    <div className="auth-section">
      <div style={{ overflow: "hidden" }}>
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
      </div>

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
