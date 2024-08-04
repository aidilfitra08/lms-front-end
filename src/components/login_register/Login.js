import React, { useEffect, useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import Background from "../../assets/login_bg.png";
import LogoApp from "../../assets/logo_only.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/Credential/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function Login(props) {
  useEffect(() => {
    document.title = "Masuk";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  useEffect(() => {
    if (props.isLoggedIn) {
      const decodedJwt = parseJwt(props.user.accessToken);
      const role = decodedJwt.role;
      if (role == "student") {
        navigate("/student", { replace: true });
      } else if (props.isLoggedIn && role === "lecture") {
        navigate("/lecture", { replace: true });
      }
    }
  }, [props.isLoggedIn]);

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      <div className=" bg-cover col-span-1 h-screen max-lg:hidden flex justify-center items-center">
        <img
          src={Background}
          className="object-cover h-1/2 rounded-lg"
          loading="lazy"
        />
      </div>
      <div className=" col-span-1 h-screen grid content-center justify-center">
        <div className=" bg-neutral-50 shadow-2xl w-128 rounded-lg max-h-fit pb-12 max-lg:w-128 max-md:w-80 max-md:text-sm">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 space-y-6 ">
            <div className="grid space-y-2 text-center justify-center">
              <div className="col-span-1 flex justify-center items-center w-32 h-32 ml-3 my-[-20px] max-md:w-28 max-md:my-[-30px]">
                <img src={LogoApp} alt="gfg" />
              </div>

              <p className=" col-span-1 text-3xl font-bold max-md:text-2xl">
                Masuk
              </p>
              <p className=" col-span-1">Silahkan masuk disini.</p>
            </div>

            <form
              className="space-y-6 text-base max-md:text-sm"
              method="POST"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 max-md:text-sm sm:leading-6"
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                Belum Memiliki akun?{" "}
                <a
                  href="register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Daftar disini
                </a>
              </p>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-black bg-yellow-400 px-3 py-3 text-sm font-semibold leading-6 shadow-sm hover:bg-teal-900/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={props.loading}
                >
                  {props.loading && (
                    <span className="mr-3 animate-spin">
                      <FontAwesomeIcon icon={faSpinner} size="lg" />
                    </span>
                  )}
                  Masuk
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
