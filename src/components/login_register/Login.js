import React, { useEffect, useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import Background from "../../assets/login_bg.jpg";
import { connect, useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/Credential/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(userLogin(email, password));
  };

  // const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // function togglePasswordVisibility() {
  //   setIsPasswordVisible((prevState) => !prevState);
  // }

  if (props.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid grid-cols-2">
      {/* {props.user && alert(props.user.name + " is successfully logged in!")} */}
      <div
        className=" bg-cover col-span-1 h-screen"
        // style={{ backgroundImage: "url(" + Background + ")" }}
      >
        <img
          src={Background}
          className="object-cover h-screen"
          loading="lazy"
        />
      </div>
      <div className=" col-span-1 h-screen grid content-center justify-center">
        <div className=" bg-neutral-200 shadow w-128 rounded-lg max-h-fit pb-12">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 space-y-6">
            <div className=" space-y-2">
              <p className=" text-3xl font-bold">Sign In</p>
              <p className=" ">Please enter your account information below.</p>
            </div>

            <form className="space-y-6" method="POST" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-base">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <div
                    className="relative -mt-7 float-right"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div> */}
                </div>
              </div>
              {props.errorMessage && (
                <div className=" border-red-600 border-2 rounded-md p-3">
                  <div className=" italic font-medium" role="alert">
                    {props.errorMessage}
                  </div>
                </div>
              )}
              <p className="mt-10 text-center text-sm text-gray-500">
                Do not have an account?{" "}
                <a
                  href="register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register Here
                </a>
              </p>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={props.loading}
                >
                  {props.loading && (
                    <span className="mr-3 animate-spin">
                      <FontAwesomeIcon icon={faSpinner} size="lg" />
                    </span>
                  )}
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errorMessage: state.user.errorMessage,
    loading: state.user.loading,
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Login);
