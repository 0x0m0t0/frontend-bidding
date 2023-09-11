import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export const DatePick = (props) => {
  const pick = () => {
    props.onChange(props.value);
    console.log(props.value);
  };
  return (
    <div>
      <DateTimePicker onClick={pick} />
    </div>
  );
};
