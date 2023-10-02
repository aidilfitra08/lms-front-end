import React from "react";

function Footer(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <footer
      className={classNames(
        props.sideBarTrigger ? "pl-64" : "pl-0",
        " bg-indigo-900 bottom-0 h-52 text-neutral-100"
      )}
    >
      <div className="grid grid-cols-2 py-6 px-10">
        <div className="col-span-1">
          <a href="homepage" className="block">
            Home
          </a>
        </div>
        <div className="col-span-1">
          <p className="">Need Help? </p>
          <p className="">Contact us</p>
        </div>
      </div>
      <div className="col-span-2  border-b border-neutral-100 mx-10"></div>
      <div className="col-span-2 mx-10 my-4">
        <p>2023 Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}

export default Footer;
