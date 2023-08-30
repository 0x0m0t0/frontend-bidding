import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

//// Change the variable
let lobbyId = 1;

const Lobby = () => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [check, setCheck] = useState([]);
  const [data, setData] = useState([]);
  const [init, setInit] = useState([]);
  const [messages, setMessages] = useState([]);
  const [post, setPost] = useState({
    lobby_id: lobbyId,
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
    fetch(`${endpoint}/lobby/init/1`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
        authentication: cookies.user,
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        setInit([data]);
      })
      .catch((err) => {
        return err;
      });
  };
  const lobbyData = () => {
    fetch(`${endpoint}/lobby/${lobbyId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
        authentication: cookies.user,
      },
    })
      .then((res) => {
        if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        return err;
      });
  };

  const chatData = () => {
    fetch(`${endpoint}/chat/${lobbyId}`, {
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
        // console.log(data);
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
          "Access-Control-Allow-Origin": "https://platform.oxomoto.co/chat",
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

  useEffect(() => {
    lobbyData();
    lobbyInit();
  }, []);

  useEffect(() => {
    chatData();
  }, [check]);

  setInterval(chatData(), 2000);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <>
      <article className="flex w-full h-3/5 max-h-screen">
        <h1>{init?.lobby?.name}</h1>{" "}
        <section className="bg-yellow-400 w-2/4 h-full">
          <h3 className="font-semibold">Auction</h3>

          {init?.length > 0 ? (
            init?.map((item, i) => (
              <div
                className="flex border rounded border-green-100 m-2"
                key={item?.lobby[0]?.created_at + item?.id}
              >
                {console.log(item)}
                <div>
                  <img src={item?.cover_lobby} alt="" />
                  <p className="bg-green-400">{item?.item[0]?.description}</p>
                  <h4 className="bg-green-800">{item?.item[0]?.status}</h4>
                  <p className="bg-green-800">{item?.lobby[0]?.created_at}</p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </section>
        <section className="flex h-80 flex-col bg-green-400 w-2/4 overflow-auto">
          <div className="ref overflow-auto h-4/5 bg-red-400">
            <h3 className="font-semibold">Chat</h3>
            {messages?.length > 0 ? (
              messages.map((item, i) => (
                <div
                  className="flex border rounded border-green-100 m-2"
                  key={item?.created_at + i}
                >
                  <div className="flex">
                    <h2>{item?.username}: </h2>
                    <p className="bg-indigo-400">{item?.message}</p>
                    <p className="bg-green-800">{item?.created_at}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="empty">Nothing to be found here</h2>
            )}
            <AlwaysScrollToBottom />
          </div>
          <form className="overflow-auto h-auto" onSubmit={handleSubmit}>
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
