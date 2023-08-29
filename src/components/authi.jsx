import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import Login from "./login";
import Signup from "./signup";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Auth = () => {
  const [isRegistered, setisRegistered] = useState(true);

  const handleRegister = () => {
    isRegistered ? setisRegistered(false) : setisRegistered(true);
  };

  return (
    <>
      {isRegistered ? (
        <Login handleRegister={handleRegister} />
      ) : (
        <Signup handleRegister={handleRegister} />
      )}
    </>
  );
};

export default Auth;
