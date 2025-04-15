import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ProfileItems = [
  {
    id: 1,
    title: "Profile",
    icon: <RxPerson />,
  },
  {
    id: 2,
    title: "Orders",
    icon: <HiOutlineShoppingBag />,
  },
  {
    id: 3,
    title: "Refunds",
    icon: <HiOutlineReceiptRefund />,
  },
  {
    id: 4,
    title: "Inbox",
    icon: <AiOutlineMessage />,
    link: "/inbox",
  },

  {
    id: 5,
    title: "Change Password",
    icon: <RiLockPasswordLine />,
  },
  {
    id: 6,
    title: "Address",
    icon: <TbAddressBook />,
  },
];
const ProfileSidebar = ({ active, setActive }) => {
  const { user } = useSelector(state => state.user);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then(result => {
      if (result.isConfirmed) {
        axiosPublic
          .get(`/user/logout`, { withCredentials: true })
          .then(res => {
            axiosPublic.get("/seller/logout").then().catch();
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });
            navigate(`/login`);
            window.location.reload(true);
          })
          .catch(error => alert(error.response.data.message));
      }
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-[10px] w-full p-4 pt-8">
      {ProfileItems ? (
        <div>
          {ProfileItems.map((item, index) => {
            return (
              <Link
                to={item.link ? item.link : null}
                onClick={() => setActive(item.id)}
                key={index}
                className={`flex items-center cursor-pointer w-full mb-8 ${
                  active === item.id ? "text-red-600" : ""
                }`}
              >
                <span className={`text-[20px]`}>{item.icon}</span>
                <h5 className={`md:block hidden pl-3`}>{item.title}</h5>
              </Link>
            );
          })}
          {user && user?.role === "admin" && (
            <Link to={`/admin/home`}>
              <div
                onClick={() => setActive(8)}
                className={`flex items-center cursor-pointer w-full mb-8 ${
                  active === 8 ? "text-red-600" : ""
                }`}
              >
                <span className={`text-[20px]`}>
                  <MdOutlineAdminPanelSettings />
                </span>
                <h5 className={`md:block hidden pl-3`}>Admin Dashboard</h5>
              </div>
            </Link>
          )}
          <div
            onClick={() => setActive(9) || handleLogout()}
            className={`flex items-center cursor-pointer w-full mb-8 ${
              active === 9 ? "text-red-600" : ""
            }`}
          >
            <span className={`text-[20px]`}>
              <AiOutlineLogin />
            </span>
            <h5 className={`md:block hidden pl-3`}>Logout</h5>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileSidebar;
