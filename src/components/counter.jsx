import { useState } from "react";

export const PennyCounter = () => {
  const [counter, setCounter] = useState(0);

  //increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  return (
    <div>
      <p>{counter}</p>
      <button onClick={increase}>Increase here</button>
    </div>
  );
};
