import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
dayjs.duration(100);

export const countdown = (isoInputDate, end_at, setEndClosing) => {
  const convert = dayjs(isoInputDate).valueOf() + end_at;
  const dateObject = dayjs(convert);

  const durat = dayjs.duration(dayjs().diff(dateObject));

  const days = Math.abs(durat.days());
  const hours = Math.abs(durat.hours());
  const minutes = Math.abs(durat.minutes());
  const seconds = Math.abs(durat.seconds());

  const formattedDuration = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  //   console.log(formattedDuration);
  setEndClosing(formattedDuration);
};
