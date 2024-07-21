import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LogoOnly from "../../assets/logo_only.svg";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function VideoConference2(props) {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const user = useSelector((state) => state.user);
  console.log(user);
  const decodedJwt = parseJwt(user.user.accessToken);
  console.log(decodedJwt);
  const userRole = decodedJwt.role;
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const { meetingId } = useParams();
  // useEffect(() => {
  console.log(meetingId);
  // }, []);
  // console.log(user);
  // const userRole = JSON.parse(localStorage.getItem("user"));

  let userPermission = {
    pin: true,
    askToJoin: true, // Ask joined participants for entry in meeting
    toggleParticipantMic: false, // Can toggle other participant's mic
    toggleParticipantWebcam: false, // Can toggle other participant's webcam
    toggleParticipantScreenshare: false, // Can toggle other partcipant's screen share
    toggleParticipantMode: false, // Can toggle other participant's mode
    canCreatePoll: false, // Can create a poll
    toggleHls: false, // Can toggle Start HLS button
    drawOnWhiteboard: false, // Can draw on whiteboard
    toggleWhiteboard: false, // Can toggle whiteboard
    toggleVirtualBackground: true, // Can toggle virtual background
    toggleRecording: false, // Can toggle meeting recording
    toggleLivestream: false, //can toggle live stream
    removeParticipant: false, // Can remove participant
    endMeeting: false, // Can end meeting
    changeLayout: true, //can change layout
  };
  if (userRole === "lecture") {
    userPermission = {
      pin: true,
      askToJoin: false, // Ask joined participants for entry in meeting
      toggleParticipantMic: true, // Can toggle other participant's mic
      toggleParticipantWebcam: true, // Can toggle other participant's webcam
      toggleParticipantScreenshare: true, // Can toggle other partcipant's screen share
      toggleParticipantMode: true, // Can toggle other participant's mode
      canCreatePoll: true, // Can create a poll
      toggleHls: true, // Can toggle Start HLS button
      drawOnWhiteboard: true, // Can draw on whiteboard
      toggleWhiteboard: true, // Can toggle whiteboard
      toggleVirtualBackground: true, // Can toggle virtual background
      toggleRecording: true, // Can toggle meeting recording
      toggleLivestream: true, //can toggle live stream
      removeParticipant: true, // Can remove participant
      endMeeting: true, // Can end meeting
      changeLayout: true, //can change layout
    };
  }
  console.log(userPermission);
  const config = {
    name: user.user.name,
    meetingId: meetingId,
    apiKey: process.env.REACT_APP_VIDEOSDK_API_KEY,

    containerId: null,
    // redirectOnLeave: "/",

    micEnabled: true,
    webcamEnabled: true,
    participantCanToggleSelfWebcam: true,
    participantCanToggleSelfMic: true,
    participantCanLeave: true,

    chatEnabled: true,
    screenShareEnabled: true,
    pollEnabled: true,
    whiteboardEnabled: true,
    raiseHandEnabled: true,
    mode: "CONFERENCE", // VIEWER || CONFERENCE

    // recording: {
    //   autoStart: true, // auto start recording on participant joined
    //   enabled: true,
    //   webhookUrl: "https://www.videosdk.live/callback",
    //   awsDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path
    // },

    livestream: {
      autoStart: true,
      enabled: true,
    },
    hls: {
      enabled: true,
      autoStart: false,
    },
    layout: {
      type: "SPOTLIGHT", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
      priority: "PIN", // "SPEAKER" | "PIN",
      // gridSize: 3,
    },
    branding: {
      enabled: true,
      logoURL: LogoOnly,
      name: "DigiMaLearn Meeting",
      poweredBy: false,
    },
    permissions: userPermission,

    joinScreen: {
      visible: true, // Show the join screen ?
      title: user.user.name + " Meeting's", // Meeting title
      meetingUrl: window.location.href, // Meeting joining url
    },

    leftScreen: {
      // visible when redirect on leave not provieded
      actionButton: {
        // optional action button
        label: "Homepage", // action button label
        href:
          userRole == "lecture"
            ? process.env.REACT_APP_BASE_APP_URL + "/lecture"
            : userRole == "student"
            ? process.env.REACT_APP_BASE_APP_URL + "/student"
            : process.env.REACT_APP_SERVER_BASE_APP_URL + "/", // action button href
      },
    },

    notificationSoundEnabled: true,

    debug: true, // pop up error during invalid config or netwrok error

    maxResolution: "sd", // "hd" or "sd"
    /*

   Other Feature Properties
    
    */
    theme: darkThemeMq.matches ? "DARK" : "DEFAULT", // DARK || LIGHT || DEFAULT
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL +
          "/apiv1/conference/validate-room/" +
          meetingId
      )
      .then((res) => {
        const meeting = new VideoSDKMeeting();
        meeting.init(config);
      })
      .catch((err) => {
        console.log(err);
        alert("Wrong Meeting Id. Please Enter a valid Meeting Id!");
        navigate(-1, { replace: true });
        window.location.reload(true);
      });
  }, []);

  return <div></div>;
}

// VideoConference2.propTypes = {}

export default VideoConference2;
