import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyPage(props) {
  useEffect(() => {
    document.title = "Verifikasi";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const userID = searchParams.get("id");
  const token = searchParams.get("token");
  const verifyAccount = async (id, token) => {
    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE_URL +
          "/verify-email/" +
          id +
          "/" +
          token
      )
      .then((res) => {
        if (res.status === 200) {
          alert(
            "Email anda berhasil di verifikasi, anda akan diarahkan ke halaman login."
          );
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    verifyAccount(userID, token);
  }, []);
  return <Navigate to="/login" />;
}

export default VerifyPage;
