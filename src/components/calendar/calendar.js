import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  fetchAllJoinedCourses,
  fetchEnrolledCourse,
} from "../../redux/Student/StudentAction";

import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";

function Calendar(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();
  const [event, setEvents] = useState([]);
  useEffect(() => {
    dispatch(fetchAllJoinedCourses());
  }, []);

  // const calendarRef = useRef(schedu);
  useEffect(() => {
    if (props.course.length != 0) {
      props.course.map((course) => {
        setEvents([
          ...event,
          {
            event_id: course.courseID,
            title: course.title,
            start: new Date(new Date(new Date().setHours(0)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(0)).setMinutes(0)),
          },
        ]);
      });
    }
  }, [props.course]);
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
        "pt-16"
      )}
    >
      <Scheduler
        events={event}
        disableViewer
        onEventClick={() => {
          console.log("onEventClick");
        }}
        view="month"
        editable={true}
        draggable={false}
        agenda={true}
        // className=" w-fit"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    course: state.student.allJoinedCourses,
  };
};

export default connect(mapStateToProps)(Calendar);
