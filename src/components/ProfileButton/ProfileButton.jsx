import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";

function ProfileButton() {
  const [userData] = useRecoilState(userState);

  return (
    <div>
      <img src={userData.photo} alt="" />
      {userData.name}
    </div>
  );
}

export default ProfileButton;
