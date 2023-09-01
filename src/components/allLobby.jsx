import { useState, useEffect } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
import { Cookies, useCookies } from "react-cookie";

const AllLobby = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [lobbies, setLobbies] = useState([]);

  const lobbiesData = () => {
    fetch(`${endpoint}/allLobby/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",

        authentication: cookies.user,
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        setLobbies(data);
        console.log(data);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    lobbiesData();
  }, []);

  return (
    <>
      <h1>Here are all the lobbies</h1>
    </>
  );
};

export default AllLobby;
