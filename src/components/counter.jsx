import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const PennyCounter = (props) => {
  const { bidFromLike } = props;
  const { lobbyId } = props;
  // bids

  const [initialBid, setInitialBid] = useState(0);
  const [check, setCheck] = useState(0);
  const [currentBitTotal, setCurrentBidTotal] = useState();

  const [cookies] = useCookies(["user"], ["user_id"]);

  const fetchBidAmount = () => {
    console.log(currentBitTotal);
    if (cookies.user) {
      fetch(`${endpoint}/lobby/bid`, {
        method: "POST",
        body: JSON.stringify({
          lobby_id: lobbyId,
          bidAmount: currentBitTotal,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": endpoint,

          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((post) => {
          console.log(post);
        })
        .catch((err) => {
          return err;
        });
    } else {
      alert("Not allowed, please login");
    }
  };

  const Increase = () => {
    setCurrentBidTotal((currentBitTotal) => Number(currentBitTotal) + 1);
    // check to trigger useEffect below
    setCheck(1);
  };

  useEffect(() => {
    console.log(currentBitTotal);
    if (cookies.user) {
      if (currentBitTotal != initialBid) {
        fetchBidAmount();
        setInitialBid(currentBitTotal);
      }
    }
  }, [check]);

  useEffect(() => {
    setInitialBid(bidFromLike);
  }, [bidFromLike]);

  useEffect(() => {
    if (cookies.user) {
      if (initialBid != 0) {
        setCurrentBidTotal(initialBid);
      }
    }
  }, [initialBid]);

  return (
    <div>
      <button
        className="p-4 m-1 rounded bg-white border border-midnightblue border hover:bg-midnightblue hover:text-white hover:border border white"
        onClick={Increase}
      >
        +1€
      </button>
    </div>
  );
};
