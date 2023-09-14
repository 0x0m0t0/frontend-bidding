import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import { likeChecker } from "./likeChecker";
import { amountLikes } from "./allLikes";
import { removeLike } from "./removeLike";
import { updateLike } from "./updateLike";
import { ifLiked } from "./ifLiked";
import { fetchBidAmount } from "./bidCounter";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const LikeBid = () => {
  // bid logic to pass to parent

  const { lobbyid } = useParams();
  const [likedLobbies, setLikedLobbies] = useState([]);
  const [likes, setLikes] = useState();

  const [isClicked, setIsClicked] = useState();
  const [cookies] = useCookies(["user"], ["user_id"]);

  //// bid

  const [bid, setBid] = useState();
  const [initialBid, setInitialBid] = useState(0);
  const [check, setCheck] = useState(0);
  const [currentBitTotal, setCurrentBidTotal] = useState();

  const handleClick = () => {
    if (!isClicked) {
      updateLike(endpoint, lobbyid, cookies);
      setIsClicked(!isClicked);
    } else {
      removeLike(lobbyid, endpoint, cookies);
      setIsClicked(!isClicked);
    }
  };

  useEffect(() => {
    ifLiked(endpoint, cookies, setLikedLobbies);
    amountLikes(lobbyid, endpoint, cookies, setBid, setLikes);
  }, []);

  useEffect(() => {
    likeChecker(likedLobbies, lobbyid, setIsClicked);
    amountLikes(lobbyid, endpoint, cookies, setBid, setLikes);
    console.log(bid);
  }, [likedLobbies]);

  useEffect(() => {
    setInterval(() => {
      console.log("refresh"),
        amountLikes(lobbyid, endpoint, cookies, setBid, setLikes);
    }, 1000);
  }, []);

  // bidding

  const Increase = () => {
    console.log(initialBid);
    console.log(currentBitTotal);
    setCurrentBidTotal((currentBitTotal) => Number(currentBitTotal) + 1);
    amountLikes(lobbyid, endpoint, cookies, setBid, setLikes);
    // check to trigger useEffect below
  };

  useEffect(() => {
    console.log(currentBitTotal);
    if (cookies.user) {
      if (currentBitTotal != bid) {
        fetchBidAmount(endpoint, lobbyid, cookies, currentBitTotal);
      }
    }
  }, [currentBitTotal]);

  useEffect(() => {
    if (cookies.user) {
      if (bid != 0) {
        setCurrentBidTotal(bid);
      }
    }
  }, [bid]);

  return (
    <>
      <div className="flex p-3 space-between items-center">
        {isClicked ? (
          <div className="flex flex-1">
            <Heart
              color="midnight-blue"
              fill="midnight-blue"
              size={24}
              onClick={handleClick}
            />{" "}
            {likes ? (
              <p className="pl-2.5">{likes}</p>
            ) : (
              <p>Loading likes...</p>
            )}
          </div>
        ) : (
          <div className="flex flex-1">
            <Heart color="black" size={24} onClick={handleClick} />{" "}
            {likes ? (
              <p className="pl-2.5">{likes}</p>
            ) : (
              <p>Loading likes...</p>
            )}
          </div>
        )}

        <div>
          <button
            className="p-4 m-1 rounded bg-white border border-midnightblue border hover:bg-midnightblue hover:text-white hover:border border white"
            onClick={Increase}
          >
            +1€
          </button>
        </div>
        <div className="flex-1 p-3 current-bid">
          <p className="cb ">Current Bid</p>

          {bid === null ? (
            <p className="text-2xl">0 €</p>
          ) : (
            <p className="text-2xl">{bid} €</p>
          )}
        </div>
      </div>
    </>
  );
};
