import { useState } from "react";

export const PennyCounter = (props) => {
  const Increase = () => {
    props.setCounter((count) => count + 1);
  };
  return (
    <div>
      <button
        className="p-4 rounded border hover:bg-midnightblue hover:text-white"
        onClick={Increase}
      >
        +1€
      </button>
    </div>
  );
};
