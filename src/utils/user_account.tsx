import { useState, useEffect } from "react";

const user = ({ endpoint, userId, setUserInfo }) => {
  useEffect(() => {
    fetch(`${endpoint}/account/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
        setUserInfo(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
};

export default user;
