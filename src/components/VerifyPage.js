import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyPage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const userID = searchParams.get("id");
  const token = searchParams.get("token");
  const verifyAccount = async (id, token) => {
    // if (id == null && token == null) {
    //   return <Navigate to="/lecture/courses" />;
    // }
    await axios
      .post(
        process.env.REACT_APP_BASE_URL + "/verify-email/" + id + "/" + token
      )
      .then((res) => {
        if (res.status === 200) {
          alert(
            "Email anda berhasil di verifikasi, anda akan diarahkan ke halaman login."
          );
        }

        // return <Navigate to="/lecture/courses" />;
      })
      .catch((err) => {
        alert(err.message);
        console.log("gagal");
        // window.location.reload(true);
      });
    console.log(id, token);
  };
  useEffect(() => {
    verifyAccount(userID, token);
  }, []);
  return <Navigate to="/login" />;
}

// verify.propTypes = {};

export default VerifyPage;
