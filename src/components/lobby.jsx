import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HeartLike } from "./heartlike";
import { PennyCounter } from "./counter";

import { CleanTime } from "./cleanTime";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Lobby = () => {
  const [counter, setCounter] = useState(0);
  const { lobbyid } = useParams();
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [check, setCheck] = useState([]);
  const [data, setData] = useState([]);
  const [init, setInit] = useState([]);
  const [messages, setMessages] = useState([]);

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
        <section className="w-2/4 h-full rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          {init?.length > 0 ? (
            init?.map((item, i) => (
              <div
                className="flex border rounded"
                key={item?.lobby?.created_at + item?.id}
              >
                <div className="displayed-lobby">
                  <img
                    className="rounded"
                    src={item?.item?.cover_lobby}
                    alt=""
                  />

                  <div className="border rounded m-8 item-info">
                    <p className="">{item?.item?.name}</p>
                    <p className="p-3">{item?.item?.description}</p>

                    <p className="p-3">
                      <CleanTime created={item?.lobby?.created_at} />
                    </p>
                    <p className="p-3">Status: {item?.item?.status}</p>
                  </div>

                  <div className="flex avatar">
                    <img
                      src={item?.seller?.avatar}
                      className="w-16 h-16 p-2 rounded-full"
                      alt="Avatar"
                    />
                    <div className="flex flex-col">
                      <p className="mb-2 text-xl font-medium leading-tight">
                        {item?.seller?.name}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        User since {item?.seller?.created_at.slice(0, 7)}
                      </p>
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
                    <div className="ml-16 border border-black price-bidding">
                      <div>
                        <h2 className="text-3xl">{item?.item?.name}</h2>
                      </div>
                      <div className="flex">
                        <div className="p-3">
                          <HeartLike />
                          <p className="text-sm">
                            Closes in {item?.lobby?.created_at}
                          </p>
                        </div>

                        <div className="p-3">
                          <PennyCounter setCounter={setCounter} />
                        </div>
                        <div className="p-3">
                          <p className="text-sm">Current Bid</p>
                          <p className="text-2xl">{counter} €</p>
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

          <div className="ref overflow-auto ml-16 border border-black h-4/5 ">
            <h3 className="font-semibold">Chat</h3>
            {messages?.length > 0 ? (
              messages.map((item, i) => (
                <div
                  className="border border-black ml-16 flex border rounded  m-2"
                  key={item?.created_at + i}
                >
                  <div className="flex">
                    <h2>{item?.username}: </h2>
                    <p className="">{item?.message}</p>
                    <p className="">{item?.created_at}</p>
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
            className="overflow-auto border border-black ml-16 h-auto"
            onSubmit={handleSubmit}
          >
            <label>New message</label>
            <input
              type="text"
              name="message"
              value={post.message}
              onChange={(e) => {
                e.preventDefault();
                updateForm("message", e);
              }}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </section>
      </article>
    </>
  );
};

export default Lobby;
