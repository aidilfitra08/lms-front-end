import React, { useEffect, useState } from "react";
import Background from "../../assets/login_bg.jpg";
import Bg2 from "../../assets/logo_only.png";
import LogoScript from "../../assets/logo_script.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { userRegister } from "../../redux/Credential/UserAction";
import { useNavigate } from "react-router-dom";

function Register(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passCheck, setPassCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(userRegister(name, email, password));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (confirmPassword != "") {
      if (password === confirmPassword) {
        setPassCheck(true);
      } else {
        setPassCheck(false);
      }
    } else {
      setPassCheck(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (props.isRegistered) {
      alert("Akun berhasil didaftarkan, silahkan login.");

      navigate(`/login`, { replace: true });
      window.location.reload(true);
    }
  }, [props.isRegistered]);
  return (
    <div className="grid grid-cols-2">
      {/* Form */}
      <div
        className="col-span-1 h-screen grid content-center justify-center bg-cover"
        style={{ backgroundImage: "url(" + Bg2 + ")" }}
      >
        <div className=" bg-neutral-200 h-fit w-128 rounded-lg pb-12 bg-opacity-80">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 space-y-8">
            <div className="space-y-2">
              <p className=" text-3xl font-bold">Sign up.</p>
              <p className=" ">Fill your information below to sign up.</p>
            </div>
            <form className="space-y-6" method="POST" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
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
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={classNames(
                      passCheck ? "" : " ring-red-700 ring-2",
                      "block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    )}
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className={classNames(
                      passCheck ? "" : " ring-red-700 ring-2",
                      "block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    )}
                    style={{ fontSize: "16px" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <p className={classNames(passCheck ? "hidden" : " text-red-700")}>
                Your password and confirmation password do not match.
              </p>
              {props.errorMessage && (
                <div className=" border-red-600 border-2 rounded-md p-3">
                  <div className=" italic font-medium" role="alert">
                    {props.errorMessage}
                  </div>
                </div>
              )}
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in Here
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* image */}
      <div className=" col-span-1 h-screen">
        <div className="relative h-screen">
          <div className="absolute inset-0 w-full h-full bg-neutral-100 bg-opacity-30">
            <img
              src={LogoScript}
              className="w-screen absolute z-100 object-cover h-screen"
              loading="lazy"
            />
          </div>
          <img
            src={Background}
            alt="background"
            className="object-cover h-screen"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isRegistered: state.user.isRegistered,
    message: state.user.message,
    errorMessage: state.user.errorMessage,
    loading: state.user.loading,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Register);
