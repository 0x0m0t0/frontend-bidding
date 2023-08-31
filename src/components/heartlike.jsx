import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const HeartLike = () => {
  const [likes, setLikes] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [cookies] = useCookies(["user"], ["user_id"]);

  const amountLikes = () => {
    fetch(`${endpoint}/lobby/update_lobby/1`, {
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
        setLikes(data[0].likes);
      })
      .catch((err) => {
        return err;
      });
  };
  console.log(likes);

  const updateLike = () => {
    if (cookies.user) {
      fetch(`${endpoint}/lobby/like`, {
        method: "POST",
        body: JSON.stringify({
          lobby_id: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((post) => {})
        .catch((err) => {
          return err;
        });
    } else {
      alert("Not allowed, please login");
    }
  };

  const handleClick = () => {
    updateLike();
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    amountLikes();
  }, [handleClick]);

  if (isClicked) {
    return (
      <div>
        {likes ? <p>{likes}</p> : <p>Loading likes...</p>}
        <Heart color="red" fill="red" size={24} onClick={handleClick} />
      </div>
    );
  }
  return (
    <div>
      {likes ? <p>{likes}</p> : <p>Loading likes...</p>}
      <Heart color="black" size={24} onClick={handleClick} />
    </div>
  );
};
