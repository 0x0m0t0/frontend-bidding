import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HeartLike } from "./heartlike.jsx";
import { PennyCounter } from "./counter";

import { CleanTime } from "./cleanTime";
import "./lobby.css";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Lobby = () => {
  const { lobbyid } = useParams();
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [check, setCheck] = useState([]);
  const [data, setData] = useState([]);
  const [init, setInit] = useState([]);
  const [messages, setMessages] = useState([]);

  // bids

  const [bidFromLike, setBidFromLike] = useState(null);
  const handleDataFromLike = (data) => {
    setBidFromLike(data);
  };

  const [post, setPost] = useState({
    lobby_id: lobbyid,
    message: ``,
  });

  const updateForm = (formKey, e) => {
    const { value } = e.target;

    setPost((prevForm) => ({
      ...prevForm,
      [formKey]: value,
    }));
  };

  const lobbyInit = () => {
    fetch(`${endpoint}/lobby/init/${lobbyid}`, {
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
        console.log(data);
        setInit([data]);
      })
      .catch((err) => {
        return err;
      });
  };

  const lobbyData = () => {
    fetch(`${endpoint}/lobby/${lobbyid}`, {
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
        setData(data);
        // console.log(data);
      })
      .catch((err) => {
        return err;
      });
  };

  const chatData = () => {
    fetch(`${endpoint}/chat/${lobbyid}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        return err;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cookies.user) {
      fetch(`${endpoint}/chat`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": endpoint,
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((post) => {
          setCheck([post]);
          updateForm("message", { target: { value: "" } });
        })
        .catch((err) => {
          return err;
        });
    } else {
      alert("Not allowed, please login");
    }
  };
  let pick = "2023-09-11T14:32:00.000Z";
  useEffect(() => {
    // lobbyData();

    lobbyInit();
  }, []);

  useEffect(() => {
    chatData();
    console.log(bidFromLike);
  }, [check]);

  // setInterval(chatData(), 2000);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <>
      <article className="flex w-full h-3/5 max-h-screen">
        <section className="w-2/4 h-full rounded-lg">
          {init?.length > 0 ? (
            init?.map((item, i) => (
              <div
                className="flex rounded"
                key={item?.lobby?.created_at + item?.id}
              >
                <div className="displayed-lobby">
                  <img className="photo" src={item?.item?.cover_lobby} alt="" />
                  <div className="rounded text-white bg-midnightblue item-info">
                    <p className="item-name">{item?.item?.name}</p>
                    <p className="item-description p-3">
                      {item?.item?.description}
                    </p>

                    <p className="status p-3">Status: {item?.item?.status}</p>
                    <p className="posted-on p-3">
                      <CleanTime created={item?.lobby?.created_at} />
                    </p>
                  </div>

                  <div className="flex p-4 bg-white avatar">
                    <img
                      src={item?.seller?.avatar}
                      className="w-16 h-16 p-2 rounded-full"
                      alt="Avatar"
                    />
                    <div className="flex flex-col">
                      <p className="mb-2 text-xl font-medium leading-tight">
                        {item?.seller?.name}
                      </p>
                      {/* <p className="text-neutral-500 ml-6 pl-7 dark:text-neutral-400">
                        User since {item?.seller?.created_at.slice(0, 7)}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </section>
        <section className="flex flex-col">
          <div className="">
            {init?.length > 0 ? (
              init?.map((item, i) => (
                <div
                  className="flex"
                  key={item?.lobby?.created_at + item?.item?.name}
                >
                  <div>
                    <div className="ml-16 bg-mustard border border-black price-bidding">
                      <div>
                        <h2 className="text-3xl">{item?.item?.name}</h2>
                      </div>
                      <div className="flex">
                        <div className="p-4 like ">
                          <div className="likelogo">
                            <HeartLike onDataFromLike={handleDataFromLike} />
                          </div>
                          <p className="text-sm">
                            <br /> Closes in {item?.lobby?.created_at}
                          </p>
                        </div>

                        <div className="p-3">
                          <PennyCounter
                            bidFromLike={bidFromLike}
                            lobbyId={lobbyid}
                          />
                        </div>
                        <div className="p-3 current-bid">
                          <p className="cb ">Current Bid</p>

                          {bidFromLike === null ? (
                            <p className="text-2xl">0 €</p>
                          ) : (
                            <p className="text-2xl">{bidFromLike} €</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="ref overflow ml-16 border border-black chat h-3/5 ">
            <h3 className="font-semibold">Chat</h3>
            {messages?.length > 0 ? (
              messages.map((item, i) => (
                <div
                  className="bulle overflow-auto border border-black flex border rounded  m-2"
                  key={item?.created_at + i}
                >
                  <div className="flex conv">
                    <h2 className="username">{item?.username}: </h2>
                    <p className="msg">{item?.message}</p>

                    <p className="time">{item?.created_at}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="empty">Nothing to be found here</h2>
            )}
            {/* // needs to be fixed */}
            {/* <AlwaysScrollToBottom /> */}
          </div>
          <form
            className="form overflow-auto bg-mustard border border-black ml-16 h-24 chat"
            onSubmit={handleSubmit}
          >
            <label className="m-6"></label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                name="message"
                className="mt-0 mb-4 ml-7 p-3"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  paddingLeft: "10px",
                  marginRight: "10px",
                  flex: 1, // Allow the input to grow and fill available space
                }}
                placeholder="Type something..."
                value={post.message}
                onChange={(e) => {
                  e.preventDefault();
                  updateForm("message", e);
                }}
              />
              <button
                type="submit"
                className="submitbtn h-10 mr-7 w-24  text-center bg-midnightblue text-mustard"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </article>
    </>
  );
};

export default Lobby;
