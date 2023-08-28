import { useState } from "react";
import user from "../utils/user_account";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Profile = ({ users }) => {
  let userId = 129;
  const [userInfo, setUserInfo] = useState([]);
  user({ endpoint, userId, setUserInfo });

  // const Biddings = () => {
  //   fetch(`${endpoint}/my_bidding/${userId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((post) => {
  //       console.log(post);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // Biddings();

  return (
    <div className="flex flex-col self-center items-center">
      <h2 className="h-60 w-60 m-20 text-2xl">
        Hello, welcome to your profile <em>{userInfo[0]?.name}</em>
      </h2>
    </div>
  );
};

export default Profile;
