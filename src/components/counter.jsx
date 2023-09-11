import { useState } from "react";

export const PennyCounter = (props) => {
  const Increase = () => {
    props.setCounter((count) => count + 1);
  };
  return (
    <div>
      <button
        className="p-3 rounded bg-white border border-midnightblue border hover:bg-midnightblue hover:text-white hover:border border white"
        onClick={Increase}
      >
        +1€
      </button>
    </div>
  );
};
