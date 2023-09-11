import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export const CleanTime = (props) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  let created = "2023-10-01T11:52:30.965Z";
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  console.log(props.created);
  let pickedDate = dayjs(props.created.slice(0, -1)).fromNow();

  return pickedDate;
};
