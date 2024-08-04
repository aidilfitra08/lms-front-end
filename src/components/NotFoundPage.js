import React from "react";

function NotFoundPage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64" : "pl-0",
        "pt- text-center content-center h-[85vh] text-neutral-950"
      )}
    >
      <p className="text-7xl font-semibold">404</p>
      <p className="text-lg font-semibold">Not Found</p>
      <p className="text-sm ">Halaman yang anda cari tidak dapat ditemukan</p>
    </div>
  );
}

export default NotFoundPage;
