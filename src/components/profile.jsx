import { useState, useEffect } from "react";
import user from "../utils/user_account";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Profile = ({ users }) => {
  let userId = 129;
  const [userInfo, setUserInfo] = useState([]);
  const [bids, setBids] = useState([]);
  const [auctions, setAuctions] = useState([]);
  user({ endpoint, userId, setUserInfo });

  const Biddings = () => {
    fetch(`${endpoint}/my_bidding/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setBids(post);
        console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    Biddings();
  }, []);

  return (
    <div className="flex flex-col self-center items-center">
      <h2 className="text-3xl">
        Hello, welcome to your profile <em>{userInfo[0]?.name}</em>
      </h2>

      <section className="bg-red-200">
        <h3 className="font-semibold">My bids</h3>
        {bids.map((item) => (
          <div key={item?.bid_information?.id}>
            <h2>{item?.item_information?.name}</h2>
            <img src={item?.item_information?.cover_lobby} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Profile;
