import React, { useEffect, useState } from "react";
import Background from "../../assets/login_bg.jpg";
import Bg2 from "../../assets/logo_only.png";
import LogoScript from "../../assets/logo_script.png";
import LogoApp from "../../assets/logo_only.png";
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
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      {/* Form */}
      <div
        className="col-span-1 h-screen grid content-center justify-center bg-cover"
        // style={{ backgroundImage: "url(" + Bg2 + ")" }}
      >
        <div className=" bg-neutral-200 h-fit w-128 rounded-lg pb-12 bg-opacity-80 max-md:w-80">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 space-y-8 max-md:text-sm">
            <div className="space-y-2 grid justify-center text-center">
              <div className="col-span-1 flex justify-center items-center w-32 h-32 ml-16 -my-8 max-md:w-28 max-md:my-[-30px]">
                <img src={LogoApp} alt="gfg" />
              </div>
              <p className="col-span-1 text-3xl max-md:text-2xl font-bold">
                Daftar.
              </p>
              <p className="col-span-1 ">Masukan data anda untuk mendaftar.</p>
            </div>
            <form
              className="space-y-6 text-base max-md:text-sm"
              method="POST"
              onSubmit={handleRegister}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Nama
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama"
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
                  className="block font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Verifikasi Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Verifikasi Password"
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
                Telah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Masuk disini
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
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* image */}
      <div className=" col-span-1 h-screen max-lg:hidden">
        <div className="relative h-screen">
          {/* <div className="absolute inset-0 w-full h-full bg-neutral-100 bg-opacity-30">
            <img
              src={LogoScript}
              className="w-screen absolute z-100 object-cover h-screen"
              loading="lazy"
            />
          </div> */}
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
