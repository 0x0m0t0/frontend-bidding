import { useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Profile = ({ users }) => {
  let userId = 129;
  const Biddings = () => {
    fetch(`${endpoint}/my_bidding/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  Biddings();

  return (
    <div className="flex flex-col self-center items-center">
      <h2 className="h-60 w-60 m-20 text-2xl">
        Hello, welcome to your profile {users.name}
      </h2>
    </div>
  );
};

export default Profile;
