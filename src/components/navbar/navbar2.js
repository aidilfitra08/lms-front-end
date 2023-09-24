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

function Navbar2(props) {
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

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    console.log(searchInput);
  }

  return (
    <nav className="bg-white shadow fixed inset-x-0 w-screen h-16 flex flex-col text-center sm:flex-row sm:text-left sm:justify-between items-center z-40 pr-10">
      <div className="flex">
        <div>
          <button className=" bg-yellow-400 py-5 px-6" onClick={onClick}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        <div className="pt-5 px-6">
          <a className=" px-6" href="/">
            <FontAwesomeIcon icon={faSchool} size="lg" /> My Logo
          </a>
        </div>

        <div className="searchbar pt-3 pl-60">
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
        </div>
      </div>
      <div className="flex">
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
              "z-50 bg-slate-800 fixed w-48 -ml-36 text-white"
            )}
            style={{ marginTop: "2px" }}
          >
            <a
              href="#"
              className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600"
            >
              Profile
            </a>
            <a
              href="#"
              className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600"
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar2.propTypes = {};

export default Navbar2;
