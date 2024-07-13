import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";

function Calendar(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
        "pt-16"
      )}
    >
      <Scheduler
        events={EVENTS}
        disableViewer
        onEventClick={() => {
          console.log("onEventClick");
        }}
        view="month"
        editable={false}
        draggable={false}
        // className=" w-fit"
      />
    </div>
  );
}

export default Calendar;
