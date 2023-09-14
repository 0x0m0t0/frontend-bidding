import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import avatarDefault from "./../assets/img/avatar-default.png";
import { endsWithImageExtension } from "./imgExtChecker";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
// put in localstorage
export const Avatar = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [userData, setUserData] = useState();

  const userInfo = () => {
    fetch(`${endpoint}/account/${cookies.user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": endpoint,
        authentication: cookies.user,
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        setUserData(data[0]);
        console.log(data[0]);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    userInfo();
  }, []);

  console.log(avatarDefault);
  if (!userData) {
    return <></>;
  }
  return (
    <div>
      <Link to={`/profile`}>
        {endsWithImageExtension(userData?.avatar) ? (
          <img
            src={userData?.avatar}
            className="w-12 h-12 rounded-full shadow-lg hover:border cursor-pointer"
            alt="Avatar"
          />
        ) : (
          <img
            src={avatarDefault}
            className="w-12 h-12 rounded-full shadow-lg hover:border cursor-pointer"
            alt=""
          />
        )}
      </Link>
    </div>
  );
};
