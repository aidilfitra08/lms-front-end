import React, { useState, useEffect } from "react";
import ProfilePicture from "../../assets/me.jpg";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addProfile,
  editProfile,
  fetchProfile,
} from "../../redux/Credential/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Profile(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();

  // const profile = useSelector((state) => state.user.profile);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passCheck, setPassCheck] = useState(false);
  console.log(props.profile);
  console.log(name);

  // console.log(profile);

  let date = new Date(props.profile.dateBirth);
  let dateMDY = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${("0" + date.getDate()).slice(-2)}`;

  console.log(props.profile.dateBirth);
  const [clickedButton, setClickedButton] = useState(false);
  const [photo, setPhoto] = useState(null);
  const editButton = () => {
    setClickedButton(!clickedButton);
    setName(props.profile.name);
    setDateBirth(dateMDY);
    setMobileNumber(props.profile.mobileNumber);
    setGender(props.profile.gender);
    setAddress(props.profile.address);
  };

  const handleSave = () => {
    let profileData = {
      name: name,
      mobileNumber: mobileNumber,
      dateBirth: dateBirth,
      gender: gender,
      address: address,
    };
    if (password != "" && passCheck === true) {
      profileData.oldPassword = oldPassword;
      profileData.password = password;
    }
    dispatch(editProfile(profileData));
  };

  useEffect(() => {
    dispatch(fetchProfile());
    // trigger();
  }, []);
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
  console.log(photo);
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-lg:pl-0" : "pl-0",
        "pt-16"
      )}
    >
      <div className="grid grid-cols-1 space-y-6 mt-6 mx-48 max-md:mx-2">
        <div className=" col-span-1 flex items-centre justify-between">
          <p className=" text-3xl font-bold py-2">My Profile</p>
          <button
            className="px-6 rounded-lg bg-yellow-400 hover:bg-yellow-200"
            onClick={editButton}
          >
            {clickedButton === true ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="grid grid-cols-12 max-lg:grid-cols-1">
          <div className="col-span-5 max-lg:col-span-1 space-y-6">
            <div className="space-y-5 grid justify-items-stretch">
              {/* <label htmlFor="profilePicture" className="mb-1">
                Profile Picture
              </label> */}
              {photo === null ? (
                <div className="h-40 w-40 rounded-full object-contain justify-self-center bg-slate-200 content-center text-center">
                  <FontAwesomeIcon icon={faUser} size="2xl" className="" />
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(photo)}
                  className="h-40 rounded-full object-contain justify-self-center"
                />
              )}

              {/* <div
                className="relative"
                hidden={clickedButton === true ? false : true}
              >
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="text"
                  autoComplete="profilePicture"
                  required
                  className="block w-full rounded-md"
                  placeholder="Profile picture link"
                  value={ProfilePicture}
                />
                <div className="space-y-2 w-full">
                  <label htmlFor="photo">Upload Photo</label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    required
                    // disabled={props.disableText}
                    accept="image/png, image/jpeg"
                    className="block w-full"
                    // value={Photo}
                    onChange={(event) => setPhoto(event.target.files[0])}
                  />
                </div>
              </div> */}
              <div
                className="space-y-2"
                hidden={clickedButton === true ? false : true}
              >
                <p className="mb-3">
                  You can edit your password here. If you don't want to change
                  the password, leave it blank.
                </p>
              </div>
              <div
                className="space-y-2"
                hidden={clickedButton === true ? false : true}
              >
                <label htmlFor="oldPassword">Password Lama</label>
                <div className="relative">
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    autoComplete="oldPassword"
                    required
                    className={"block w-full rounded-md"}
                    placeholder="Old Password"
                    onChange={(event) => setOldPassword(event.target.value)}
                  />
                </div>
              </div>
              <div
                className="space-y-2"
                hidden={clickedButton === true ? false : true}
              >
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className={classNames(
                      passCheck ? "" : " border-red-700",
                      "block w-full rounded-md"
                    )}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <div
                className="space-y-2"
                hidden={clickedButton === true ? false : true}
              >
                <label htmlFor="confirmPassword">Konfirmasi Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    className={classNames(
                      passCheck ? "" : " border-red-700",
                      "block w-full rounded-md"
                    )}
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
              </div>
              <p className={classNames(passCheck ? "hidden" : " text-red-700")}>
                Password Anda tidak cocok dengan konfirmasi password
              </p>
            </div>
          </div>
          <div className=" col-span-7 max-lg:col-span-1 max-lg:mt-4 max-lg:ml-0 space-y-6 ml-8">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md disabled:bg-gray-100 disabled:border-none disabled:font-semibold"
                  disabled={clickedButton === true ? false : true}
                  placeholder="Name"
                  value={clickedButton === true ? name : props.profile.name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md disabled:bg-gray-100 disabled:border-none disabled:font-semibold"
                  disabled={true}
                  placeholder="Email"
                  value={props.profile.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className="relative">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  autoComplete="mobileNumber"
                  required
                  className="block w-full rounded-md disabled:bg-gray-100 disabled:border-none disabled:font-semibold"
                  disabled={clickedButton === true ? false : true}
                  placeholder="Mobile Number"
                  value={
                    clickedButton === true
                      ? mobileNumber
                      : props.profile.mobileNumber
                  }
                  onChange={(event) => setMobileNumber(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate">Birth Date</label>
              <div className="relative">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  autoComplete="birthDate"
                  required
                  className="block w-full rounded-md disabled:bg-gray-100 disabled:border-none disabled:font-semibold"
                  disabled={clickedButton === true ? false : true}
                  placeholder="Course Title"
                  value={clickedButton === true ? dateBirth : dateMDY}
                  onChange={(event) => setDateBirth(event.target.value)}
                />
              </div>
            </div>
            <div className=" col-span-1 space-y-2 max-md:mr-0 max-md:col-span-2 mr-3">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={clickedButton === true ? false : true}
                value={clickedButton === true ? gender : props.profile.gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <option selected>Gender</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
                <option value="lainnya">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="address">Address</label>
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  className="block w-full rounded-md disabled:bg-gray-100 disabled:border-none disabled:font-semibold"
                  disabled={clickedButton === true ? false : true}
                  placeholder="Address"
                  value={
                    clickedButton === true ? address : props.profile.address
                  }
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className="col-span-12 max-lg:col-span-1 mt-5 mb-5"
            hidden={clickedButton === true ? false : true}
          >
            <button
              className=" w-full p-3 rounded-xl bg-yellow-400 hover:bg-yellow-200"
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};
export default connect(mapStateToProps)(Profile);
