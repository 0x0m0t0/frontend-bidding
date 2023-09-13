import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { PennyCounter } from "./counter";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const bid = () => {
  const [messages, setMessages] = useState([]);

  const [post, setPost] = useState({
    lobby_id: lobbyid,
    bidAmount: ``,
  });

  const fetchBidAmount = () => {
    fetch(`${endpoint}/lobby/bid`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": endpoint,
        authentication: cookies.user,
      },
    })
      .then((res) => res.json())
      .then((post) => {})
      .catch((err) => {
        return err;
      });
  };

  if (cookies.user) {
    fetch(`${endpoint}/lobby/bid`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": endpoint,
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
