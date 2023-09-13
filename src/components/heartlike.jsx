import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const HeartLike = ({ onDataFromLike }) => {
  // bid logic to pass to parent
  const [bid, setBid] = useState();

  // Call the callback function to pass data to the parent
  onDataFromLike(bid);

  const { lobbyid } = useParams();
  const [likedLobbies, setLikedLobbies] = useState([]);
  const [likedByUser, setLikedByUser] = useState([]);
  const [likes, setLikes] = useState();

  const [isClicked, setIsClicked] = useState();
  const [cookies] = useCookies(["user"], ["user_id"]);

  const likeChecker = () => {
    if (likedLobbies.length > 0) {
      let likedUser = [];
      likedLobbies.map((item) => likedUser.push(item.id_lobby));

      if (likedUser.length > 0) {
        const isLiked = likedUser.includes(Number.parseInt(lobbyid));
        if (isLiked === true) {
          console.log("i did it");
          setIsClicked(true);
        } else {
          console.log("not found by user");
        }
      } else {
        console.log("hello not there yet");
      }
    } else {
      console.log("nooo");
    }
  };

  const ifLiked = () => {
    fetch(`${endpoint}/account/like/${cookies.user_id}`, {
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
        setLikedLobbies(data);
        console.log(data);
      })
      .catch((err) => {
        return err;
      });
  };
  const amountLikes = () => {
    fetch(`${endpoint}/lobby/update_lobby/${lobbyid}`, {
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
        setBid(data[0].amount);
        setLikes(data[0].likes);
      })
      .catch((err) => {
        return err;
      });
  };

  const updateLike = () => {
    if (cookies.user) {
      fetch(`${endpoint}/lobby/like`, {
        method: "POST",
        body: JSON.stringify({
          lobby_id: lobbyid,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    } else {
      alert("Not allowed, please login");
    }
  };
  const removeLike = () => {
    if (cookies.user) {
      fetch(`${endpoint}/lobby/like`, {
        method: "DELETE",
        body: JSON.stringify({
          lobby_id: lobbyid,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
          return err;
        });
    } else {
      alert("Not allowed, please login");
    }
  };

  const handleClick = () => {
    if (!isClicked) {
      updateLike();
      setIsClicked(!isClicked);
    } else {
      removeLike();
      setIsClicked(!isClicked);
    }
  };

  useEffect(() => {
    ifLiked();
    amountLikes();
  }, []);

  useEffect(() => {
    likeChecker();
    amountLikes();
    console.log(bid);
  }, [likedLobbies]);

  if (isClicked) {
    return (
      <div className="flex">
        <Heart
          color="midnight-blue"
          fill="midnight-blue"
          size={24}
          onClick={handleClick}
        />{" "}
        {likes ? <p className="pl-2.5">{likes}</p> : <p>Loading likes...</p>}
      </div>
    );
  }
  return (
    <div className="flex">
      <Heart color="black" size={24} onClick={handleClick} />{" "}
      {likes ? <p className="pl-2.5">{likes}</p> : <p>Loading likes...</p>}
    </div>
  );
};
