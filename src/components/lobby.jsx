import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

//// Change the variable
let lobbyId = 1;

const Lobby = () => {
  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [post, setPost] = useState({
    lobby_id: lobbyId,
    message: ""
  });

  const updateForm = (formKey, e) => {
    const { value } = e.target;

    setPost((prevForm) => ({
      ...prevForm,
      [formKey]: value,
    }));
  };

  const lobbyData = () => {
    fetch(`${endpoint}/lobby/${lobbyId}`, {
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
      
      })
      .catch((err) => {
        return err;       });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cookies.user) {
      fetch(`${endpoint}/chat`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((post) => {
          
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
  }, []);


  useEffect(() => {
    chatData();
  }, [handleSubmit]);

  return (
    <>
      <h1>hello there this is the lobby</h1>

      <article>
        <section className="bg-yellow-400">
          <h3 className="font-semibold">Auction</h3>
          {data?.length > 0 ? (
            data.map((item) => (
              <div
                className="flex border rounded border-green-100 m-2"
                key={item?.created_at + item?.id}
              >
                <div>
                  <p className="bg-green-800">{item?.name}</p>
                  <p>♥ {item?.likes}</p>
                  {/* <p className="bg-green-800">{item?.created_at}</p> */}
                </div>
              </div>
            ))
          ) : (
            <h2 className="empty">Nothing to be found here</h2>
          )}
        </section>
      </article>
      <article>
        <section className="bg-green-400">
          <h3 className="font-semibold">Chat</h3>
          {messages?.length > 0 ? (
            messages.map((item) => (
              <div
                className="flex border rounded border-green-100 m-2"
                key={item?.created_at + item?.id}
              >
                <div>
                  <h2>{item?.id_user}</h2>
                  <p className="bg-green-800">{item?.message}</p>
                  <p className="bg-green-800">{item?.created_at}</p>
                </div>
              </div>
            ))
          ) : (
            <h2 className="empty">Nothing to be found here</h2>
          )}
        </section>

        <section>
          <form onSubmit={handleSubmit}>
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
