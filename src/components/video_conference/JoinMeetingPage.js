import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JoinMeetingPage(props) {
  useEffect(() => {
    document.title = "Gabung Pertemuan";
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [meetingID, setMeetingID] = useState("");
  const navigate = useNavigate();
  const onClick = () => {
    if (!meetingID) {
      alert("Kode pertemuan kosong!");
    } else {
      axios
        .get(
          process.env.REACT_APP_SERVER_BASE_URL +
            "/apiv1/conference/validate-room/" +
            meetingID
        )
        .then((res) => {
          navigate("/conference/" + res.data.payload.roomId, { replace: true });
          window.location.reload(true);
        })
        .catch((err) => {
          alert("Kode pertemuan tidak sesuai!");
        });
    }
  };
  return (
    <>
      <div
        className={classNames(
          props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
          "pt-16 h-36 grid content-center justify-center w-full mb-56"
        )}
      >
        <div className="space-y-4 mt-40 col-span-1">
          <p className="text-3xl font-bold">Gabung Pertemuan</p>
          <p className="">Silahkan masukan Kode Pertemuan.</p>
          <p className=" font-semibold">ex: abcd-efgh-ijkl</p>
          <input
            type="text"
            placeholder="Kode Pertemuan"
            className=" border-neutral-300"
            onChange={(event) => setMeetingID(event.target.value)}
          />
          <button
            onClick={onClick}
            className="bg-yellow-400 hover:bg-yellow-200 py-[9px] px-6 ml-[1px]"
          >
            Gabung
          </button>
        </div>
      </div>
    </>
  );
}

export default JoinMeetingPage;
