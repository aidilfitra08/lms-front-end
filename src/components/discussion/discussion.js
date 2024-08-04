import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  fetchDiscussion,
  postReply,
  postTopic,
} from "../../redux/Course/CourseAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function Discussion(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");

  const [showReply, setShowReply] = useState(false);
  const [newTopicBox, setNewTopicBox] = useState(false);
  const [replyBox, setReplyBox] = useState(false);
  const [indexNow, setIndexNow] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [reply, setReply] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [newDataAdded, setNewDataAdded] = useState(false);

  const addNewTopic = () => {
    const data = {
      courseID: courseID,
      subjectTitle: topicTitle,
      message: topicDescription,
    };
    dispatch(postTopic(data));
    setTopicTitle("");
    setTopicDescription("");
    setNewTopicBox(false);
    setNewDataAdded(!newDataAdded);
    Swal.fire({
      title: "Topik baru berhasil ditambahkan",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  const addReply = (discussionID) => {
    const data = {
      discussionID: discussionID,
      message: reply,
    };
    dispatch(postReply(data));
    setReply("");
    setReplyBox(false);
    setNewDataAdded(!newDataAdded);
    Swal.fire({
      title: "Balasan anda berhasil ditambahkan",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  useEffect(() => {
    dispatch(fetchDiscussion(props.courseID));
  }, [newDataAdded]);
  return (
    <div className="  col-span-1 w-3/4 place-self-center p-2 h-auto bg-slate-100">
      <div className="border-b-2 py-2 border-black">
        <div className=" flex justify-between">
          <p className=" text-3xl ">Course Discussion</p>
          <button
            className="bg-yellow-400 p-2 rounded-lg block"
            onClick={() => {
              setNewTopicBox(!newTopicBox);
            }}
          >
            {newTopicBox ? (
              ""
            ) : (
              <FontAwesomeIcon icon={faPen} className="pr-2" />
            )}
            {newTopicBox ? "Batalkan" : "Topik Baru"}
          </button>
        </div>
        <div
          className={classNames(
            newTopicBox ? "block" : "hidden",
            " py-2 space-y-2"
          )}
        >
          <div className="">
            <input
              id="subjectTitle"
              name="subjectTitle"
              type="text"
              autoComplete="subjectTitle"
              required
              className="block w-full rounded-md"
              placeholder="Topik"
              maxLength={100}
              value={topicTitle}
              onChange={(event) => setTopicTitle(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              autoComplete="description"
              required
              className="block w-full rounded-md"
              placeholder="Deskripsi Topik"
              value={topicDescription}
              onChange={(event) => setTopicDescription(event.target.value)}
            />
          </div>
          <button
            className="bg-yellow-400 p-2 rounded-lg w-full block"
            onClick={() => {
              addNewTopic();
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faPen} className="pr-1" /> Tambahkan
          </button>
        </div>
      </div>

      <div className=" text-base ">
        <ul className="list-none">
          {props.discussions.length != 0 ? (
            props.discussions.map((topic, index) => {
              return (
                <li className="py-2 border-b-2 border-slate-50">
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
                          ? "bg-yellow-400 p-2 rounded-xl"
                          : "bg-yellow-400 p-2 rounded-xl"
                      }
                      onClick={() => {
                        setReplyBox(!replyBox);
                        setIndexNow(index);
                      }}
                    >
                      {replyBox === true && indexNow === index ? (
                        ""
                      ) : (
                        <FontAwesomeIcon icon={faReply} flip="both" />
                      )}

                      {replyBox === true && indexNow === index
                        ? "Batalkan"
                        : "Balas"}
                    </button>
                    <div
                      className={classNames(
                        replyBox === true && indexNow === index
                          ? "block"
                          : "hidden",
                        "space-y-2"
                      )}
                    >
                      <div className="space-y-2 mt-2">
                        <textarea
                          id="reply"
                          name="reply"
                          rows={3}
                          autoComplete="reply"
                          required
                          className="block w-full rounded-md"
                          placeholder="Balasan"
                          value={reply}
                          onChange={(event) => setReply(event.target.value)}
                        />
                      </div>
                      <button
                        className="bg-yellow-400 p-2 rounded-lg w-full block"
                        onClick={() => {
                          addReply(topic.discussionID);
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faPen} className="pr-1" /> Balas
                      </button>
                    </div>
                  </div>
                  {topic.Replies != [] ? (
                    <a
                      className=" text-blue-600 p-2 cursor-pointer"
                      onClick={() => {
                        setShowReply(!showReply);
                        setIndexNow(index);
                      }}
                    >
                      {showReply === true && indexNow === index
                        ? "Sembunyikan Balasan"
                        : "Lihat Balasan (" + topic.Replies.length + ")"}
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
            })
          ) : (
            <p className="text-center mt-2">
              Belum ada topik diskusi pada kelas ini.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.errorMessage,
    loading: state.user.loading,
    discussions: state.course.discussions,
  };
};

export default connect(mapStateToProps)(Discussion);
