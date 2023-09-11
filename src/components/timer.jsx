import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export const Timmer = (props) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      ...dayjs.en.relativeTime,
      s: "a second",
      ss: "%d seconds",
    },
  });

  //   let pickedDate = dayjs(dateInput);
  let pickedDate = dayjs(props.created);

  let endDate = pickedDate.to(dayjs(), "s");
  console.log(endDate);
  return endDate;
};
