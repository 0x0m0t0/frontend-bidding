import { useState, useEffect } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
import { Cookies, useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./home.css";
import { HeartLike } from "./heartlike.jsx";


const AllLobby = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [lobbies, setLobbies] = useState();
  const [lob, setLob] = useState([]);

  const lobbiesData = () => {
    fetch(`${endpoint}/allLobby/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://auction.oxomoto.co/",
        authentication: cookies.user,
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        console.log(data);
        setLobbies(data);
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
      <h1 className="text-4xl mb-10"> All the lobbies</h1>

      <section className=" flex flex-wrap -mx-4">

  {lobbies?.length > 0 ? (
    lobbies?.map((item, i) => {
      return (
        <div key={item?.id + item?.created_at} className="p-3 trending">
        <div className="border trend-c p-2">
          <p className="item-trend-name">{item?.name}</p>
          <div className="object-cover">
            <img className=" " src={item?.cover_lobby} alt={item?.name}/>
          </div>
          <p className="heart"> ♥ {item?.likes}</p>
          <Link to={`/lobby/${item?.id}`} className="underline">
            Lobby {item?.id}
          </Link>
        </div>
      </div>
      );
    })
  ) : (
    <p>nothing yet</p>
  )}
</section>


    </>
  );
};

export default AllLobby;
