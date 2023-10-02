import React from "react";
import PropTypes from "prop-types";

function NotFoundPage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      Not Found 404
    </div>
  );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
