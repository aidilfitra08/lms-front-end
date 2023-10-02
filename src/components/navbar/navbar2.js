import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faSchool,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import ProfilePicture from "../../assets/me.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/Credential/UserAction";
import { useNavigate, Navigate } from "react-router-dom";

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
  const [searchInput, setSearchInput] = useState("");
  const user = useSelector((state) => state.user);
  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLogout());
    // alert(props.user.name + " is successfully logged in!");
    navigate("/login", { replace: true });
    window.location.reload(true);
  };

  // if (props.isLoggedIn === false) {
  //   return <Navigate to="/" />;
  // }

  if (searchInput.length > 0) {
    console.log(searchInput);
  }

  return (
    <nav className="bg-white shadow fixed inset-x-0 w-screen h-16 flex flex-row text-center sm:flex-row sm:text-left justify-between items-center z-40 pr-2 sm:pr-10">
      <div className="flex">
        <div>
          <button
            className=" bg-yellow-400 py-5 px-6 max-md:px-[23px]"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        <div className="pt-5 px-6 ">
          <a className="" href="/">
            <FontAwesomeIcon icon={faSchool} size="lg" /> My Logo
          </a>
        </div>

        {/* <div className="searchbar pt-3 hidden md:block md:pl-16 max lg:pl-24 xl:pl-52">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="px-3"
          />
          <input
            type="text"
            placeholder="Search here"
            onChange={handleSearchInputChange}
            value={searchInput}
          />
        </div> */}
      </div>
      <div className="flex sm:ml-10">
        <div className="pt-5 pr-2">
          <button>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              style={{ color: "#000000" }}
            />
          </button>
        </div>

        <div className="  pt-2 px-6">
          <button onClick={onClickDropdown}>
            <img
              src={ProfilePicture}
              className=" h-12 rounded-full object-contain"
            />
          </button>
          <div
            className={classNames(
              profileDropDown ? " hidden" : "block",
              "z-50 bg-slate-800 absolute w-48 -ml-36 text-white p-1 rounded-lg"
            )}
            style={{ marginTop: "2px" }}
          >
            <div
              className="fixed w-screen h-screen top-0 right-0 -z-50"
              onClick={onClickDropdown}
            ></div>
            <div className="block w-full py-3 px-3 bg-slate-800 border-b border-neutral-200">
              <p className="w-full text-center">{user.user.name}</p>
              <p className="w-full text-center font-light text-sm italic">
                {user.user.email}
              </p>
            </div>
            <a
              href="#"
              className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600"
            >
              Profile
            </a>
            <button
              className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600 text-left"
              onClick={handleLogOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar2.propTypes = {};

export default Navbar2;
