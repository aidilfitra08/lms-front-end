import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JoinMeetingPage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [meetingID, setMeetingID] = useState("");
  const navigate = useNavigate();
  // const testingMap = [1, 2, 3, 4, 5];

  // useEffect(() => {

  // }, []);
  const onClick = () => {
    if (!meetingID) {
      alert("Meeting ID is empty!");
    } else {
      axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "/apiv1/conference/validate-room/" +
            meetingID
        )
        .then((res) => {
          navigate("/conference/" + res.data.payload.roomId, { replace: true });
          window.location.reload(true);
        })
        .catch((err) => {
          alert("Wrong Meeting Id. Please Enter a valid Meeting Id!");
        });
    }
  };
  return (
    <>
      {/* <Sidenav/> */}
      <div
        className={classNames(
          props.sideBarTrigger ? "pl-64" : "pl-0",
          "pt-16 h-36 grid content-center justify-center w-full mb-56"
        )}
      >
        <div className="space-y-4 mt-40 col-span-1">
          <p className="text-3xl font-bold">Join Meeting</p>
          <p className="">
            You can join conference by fill the Meeting ID below.
          </p>
          <p className=" font-semibold">ex: abcd-efgh-ijkl</p>
          <input
            type="text"
            placeholder="Meeting ID"
            className=" border-neutral-300"
            onChange={(event) => setMeetingID(event.target.value)}
          />
          <button
            onClick={onClick}
            className="bg-yellow-400 hover:bg-yellow-200 py-[9px] px-6 ml-[1px]"
          >
            button
          </button>
        </div>
      </div>
    </>
  );
}

export default JoinMeetingPage;
