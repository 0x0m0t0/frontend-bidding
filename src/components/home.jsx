import beehiveLogo from "./../assets/img/beehive.png";

import { useState, useEffect } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
import { Cookies, useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./home.css";
import { HeartLike } from "./heartlike.jsx";

const Hello = () => {
  return alert("Hello Welcome to Bidhive");
};

const Home = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [lobbies, setLobbies] = useState();
  const [lob, setLob] = useState([]);

  const lobbiesData = () => {
    fetch(`${endpoint}/allLobby/tendance/0`, {
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
      <div className="flex ">
        <img className="imglogo self-start" src={beehiveLogo} onClick={Hello} />
        {/* */}
        <div>
          <h1 className="flex welcome">WELCOME TO BIDHIVE</h1>
          <h2 className="flex flex-col slogan text-2xl pl-24">
            Where Bids Unite, Hives takes flight
          </h2>
        </div>
      </div>

      <h2 className="t-n"> TRENDING NOW </h2>

      <section className=" justify-center flex flex-wrap -mx-4">
        {lobbies?.length > 0 ? (
          lobbies?.map((item, i) => {
            return (
              <div key={item?.id + item?.created_at} className="p-3 trending">
                <div className="border trend-c p-2">
                  <p className="item-trend-name">{item?.name}</p>
                  <div className="object-cover">
                    <img
                      className=" "
                      src={item?.cover_lobby}
                      alt={item?.name}
                    />
                  </div>
                  <div className="flex justify-center">
                    <p className="heart mr-2"> ♥ {item?.likes}</p>
                    <Link to={`/lobby/${item?.id}`} className="underline">
                      Lobby {item?.id}
                    </Link>
                  </div>
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

export default Home;
