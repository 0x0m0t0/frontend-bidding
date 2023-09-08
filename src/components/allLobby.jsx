import { useState, useEffect } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
import { Cookies, useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const AllLobby = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [lobbies, setLobbies] = useState();
  const [lob, setLob] = useState([]);

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
      <h1>Here are all the lobbies</h1>

      <section className="flex flex-wrap">
        {lobbies?.length > 0 ? (
          lobbies?.map((item, i) => {
            return (
              <div
                key={item?.id + item?.created_at}
                className="p-2 max-w-[10rem]"
              >
                <div className="border p-2">
                  <p>{item?.name}</p>
                  <div className="max-w-[10rem] object-cover">
                    <img
                      className="rounded-2xl"
                      src={item?.cover_lobby}
                      alt={item?.name}
                    />
                  </div>
                  <p>likes: {item?.likes}</p>
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
