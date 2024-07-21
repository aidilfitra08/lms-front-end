import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function Footer(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const token = useSelector((state) => state.user.user.accessToken);
  // const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(token);
  const role = decodedJwt.role;
  return (
    <footer
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
        " bg-teal-950/90 bottom-0 h-52 text-neutral-100"
      )}
    >
      <div className="grid grid-cols-2 py-6 px-10 mt-12">
        <div className="col-span-1">
          {role === "lecture" && (
            <a href="/lecture" className="block">
              Halaman Utama
            </a>
          )}
          {role === "student" && (
            <a href="/student" className="block">
              Halaman Utama
            </a>
          )}
        </div>
        <div className="col-span-1">
          <p className="block mb-3">Butuh Bantuan? </p>
          <a
            className=""
            href="https://wa.me/6282388157890?text=Aku%20butuh%20bantuan%20dengan%20aplikasi%20DigiMaLearn"
          >
            {" "}
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="xl"
              className="pr-2"
            />{" "}
            WhatsApp
          </a>
        </div>
      </div>
      <div className="col-span-2  border-b border-neutral-100 mx-10"></div>
      <div className="col-span-2 mx-10 my-4">
        <p>2023 DigiMaLearn Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}

export default Footer;
