import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import LogoOnly from "../../assets/logo_only.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/Credential/UserAction";
import { useNavigate, Navigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function Navbar2(props) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  function onClick() {
    props.setSideBarTrigger(!props.sideBarTrigger);
  }

  function onClickDropdown() {
    setProfileDropDown(!profileDropDown);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [profileDropDown, setProfileDropDown] = useState(true);
  const [notificationBar, setNotificationBar] = useState(true);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLogout());
    navigate("/login", { replace: true });
    window.location.reload(true);
  };

  const token = useSelector((state) => state.user.user.accessToken);
  const decodedJwt = parseJwt(token);
  const role = decodedJwt.role;
  return (
    <nav className="bg-white shadow fixed inset-x-0 w-screen h-16 flex flex-row text-center sm:flex-row sm:text-left justify-between items-center z-40 pr-2 sm:pr-10">
      <div className="flex h-full">
        <div>
          <button
            className=" bg-yellow-400 h-full px-6 max-md:px-[23px]"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className=" px-6 h-full content-center">
          <a
            className=""
            href={
              role == "student"
                ? "/student"
                : role == "lecture"
                ? "/lecture"
                : "#"
            }
          >
            <img src={LogoOnly} className="h-12" />
          </a>
        </div>
      </div>
      <div className="flex sm:ml-10 h-full items-center">
        <div className="  pt-2 px-6">
          <button onClick={onClickDropdown}>
            {props.photo === null ? (
              <div className="h-12 rounded-full bg-slate-200 w-12 content-center -mt-1">
                <FontAwesomeIcon icon={faUser} />
              </div>
            ) : (
              <img
                src={props.photo}
                className=" h-12 w-12 rounded-full object-contain border"
              />
            )}
          </button>
          <div
            className={classNames(
              profileDropDown ? " hidden" : "block",
              "z-50 bg-teal-900/90 absolute w-48 -ml-36 text-white p-1 rounded-b-lg mt-[2px]"
            )}
          >
            <div
              className="fixed w-screen h-screen top-0 right-0 -z-50"
              onClick={onClickDropdown}
            ></div>
            <div className="block w-full py-3 px-3 bg-teal-900/90 border-b border-neutral-200">
              <p className="w-full">{user.user.name}</p>
              <p className="w-full font-light text-sm italic">
                {user.user.email}
              </p>
            </div>
            <a
              href={
                role === "student" ? "/student/profile" : "/lecture/profile"
              }
              className="block w-full py-3 px-3 bg-teal-900/90 hover:bg-yellow-400 hover:text-black text-left"
            >
              Profil Anda
            </a>
            <button
              className="block w-full py-3 px-3 bg-teal-900/90 hover:bg-yellow-400 hover:text-black rounded-b-md text-left"
              onClick={handleLogOut}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    photo: state.user.user ? state.user.user.photo : "",
  };
};

export default connect(mapStateToProps)(Navbar2);
