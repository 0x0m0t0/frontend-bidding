import { useState, useEffect } from "react";

const user = ({ endpoint, cookies, setUserInfo }) => {
  useEffect(() => {
    fetch(`${endpoint}/account/${cookies.user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log("hahahaha good stuff");
        console.log(post);
        setUserInfo(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
};

export default user;
