import React, { useEffect, useState } from "react";
import LogoOnly from "../../assets/logo_only.svg";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function NavbarLandingPage(props) {
  const navigate = useNavigate();
  const [border, setBorder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setBorder(true) : setBorder(false);
  };

  const goTo = () => {
    navigate("/login", { replace: true });
  };
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <nav
      className={`${
        border ? "shadow-lg bg-white" : ""
      } ease-out duration-300 fixed inset-x-0 w-screen h-16 flex flex-row text-center sm:flex-row sm:text-left justify-between items-center z-40 pr-2 sm:pr-10`}
    >
      <div className="flex">
        <div className=" px-10 h-full ">
          <a className="" href="/">
            <img src={LogoOnly} className="h-10" />
          </a>
        </div>
      </div>
      <div className="flex content-center h-full ">
        <button
          className="px-5 hover:bg-yellow-400 hover:font-semibold h-full hover:text-white"
          onClick={goTo}
        >
          Masuk
        </button>
        <button className="px-5 hover:bg-yellow-400 hover:font-semibold h-full hover:text-white">
          <a href="/register">Daftar</a>
        </button>
      </div>
    </nav>
  );
}

NavbarLandingPage.propTypes = {};

export default NavbarLandingPage;
