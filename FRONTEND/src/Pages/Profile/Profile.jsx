import React, { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent/ProfileContent";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="section  bg-[#f5f5f5] py-10 flex">
        <div className=" md:mt-0 w-[50px] md:w-[335px] sticky ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default Profile;
