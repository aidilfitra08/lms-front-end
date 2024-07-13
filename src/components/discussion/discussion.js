import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { fetchDiscussion } from "../../redux/Course/CourseAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply } from "@fortawesome/free-solid-svg-icons";

function Discussion(props) {
  const dispatch = useDispatch();

  const [showReply, setShowReply] = useState(false);
  const [replyBox, setReplyBox] = useState(false);
  const [indexNow, setIndexNow] = useState("");
  // const showReplies = () => {
  //   setShowReply(!showReply);
  //   // setShowReply([...showReply, { index: index, status: !false }]);
  // };
  console.log(props.courseID);
  useEffect(() => {
    dispatch(fetchDiscussion(props.courseID));
  }, []);
  return (
    <div className="  col-span-1 h-auto w-3/4 place-self-center p-2">
      <div className="border-b-2 py-2 border-black flex justify-between">
        <p className=" text-3xl ">Course Discussion</p>
        <button
          className="bg-yellow-400 p-2 rounded-lg float-right block"
          // disabled={indexNow === index ? false : true}
          onClick={() => {}}
        >
          {" "}
          <FontAwesomeIcon icon={faPen} className="pr-1" /> Topic Baru
        </button>
      </div>

      <div className=" text-base ">
        <ul className="list-none">
          {props.discussion.map((topic, index) => {
            // showReply.kolom = showReply.kolom + 1;
            return (
              <li className="py-2 border-b-2 border-black">
                <div className="  p-2">
                  <p className=" font-semibold p-1 text-lg">
                    {topic.subjectTitle}
                  </p>
                  <p className="text-sm font-medium p-1">
                    Oleh: {topic.User.name}
                  </p>
                  <p className="text-sm p-1">{topic.message}</p>

                  <button
                    className={
                      replyBox === true && indexNow === index
                        ? "bg-yellow-400 p-1 rounded-xl"
                        : "bg-yellow-400 p-1 rounded-xl"
                    }
                    // disabled={indexNow === index ? false : true}
                    onClick={() => {
                      setReplyBox(!replyBox);
                      setIndexNow(index);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faReply} flip="both" /> reply
                  </button>
                  <div
                    className={
                      replyBox === true && indexNow === index
                        ? "block"
                        : "hidden"
                    }
                  >
                    <input type="text" id="reply" />
                  </div>
                </div>
                {topic.Replies != [] ? (
                  <a
                    className=" text-blue-600 p-2"
                    onClick={() => {
                      setShowReply(!showReply);
                      setIndexNow(index);
                    }}
                  >
                    {showReply === true && indexNow === index
                      ? "Sembunyikan Balasan"
                      : "Lihat Balasan"}
                  </a>
                ) : (
                  ""
                )}
                {showReply === true && indexNow === index
                  ? topic.Replies.map((reply) => {
                      return (
                        <ul className="bg-slate-200 grid grid-cols-12 list-none p-2 space-y-2 rounded-md mb-1 ml-2 w-3/4">
                          <div className="col-span-1 content-center text-center">
                            <FontAwesomeIcon icon={faReply} flip="both" />
                          </div>
                          <div className="col-span-11">
                            <li className="">
                              <p className="text-sm">{reply.message}</p>
                              <p className="text-sm font-medium">
                                Oleh: {reply.User.name}
                              </p>
                            </li>
                          </div>
                        </ul>
                      );
                    })
                  : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// Discussion.PropTypes ={

// }

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.errorMessage,
    loading: state.user.loading,
    discussion: state.course.discussions,
  };
};

export default connect(mapStateToProps)(Discussion);
