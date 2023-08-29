import { useState, useEffect } from "react";
import user from "../utils/user_account";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

//// To change
let userId = 130;

const Profile = ({ users }) => {
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

  const Auctions = () => {
    fetch(`${endpoint}/my_auction/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setAuctions(post);
        console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    Biddings();
    Auctions();
  }, []);

  return (
    <div className="flex flex-col self-center items-center">
      <h2 key={userInfo[0]?.email} className="text-3xl">
        Hello, welcome to your profile <em>{userInfo[0]?.name}</em>
      </h2>

      <article key="qfqdfqdsmfjqsdmf" className="flex">
        <section key="qfqdfdfqsfqdsfqsqdsmfjqsdmf" className="bg-red-200">
          <h3 className="font-semibold">Bids</h3>
          {bids?.length > 0 ? (
            bids.map((item) => (
              <div key={item?.bid_information?.id}>
                <h2>{item?.item_information?.name}</h2>
                <img
                  width={20}
                  height={30}
                  src={item?.item_information?.cover_lobby}
                />
              </div>
            ))
          ) : (
            <h2 className="empty">Nothing to be found here</h2>
          )}
        </section>

        <section
          key="qfqdfdfqsfqdskùqkfùfqsqdsmfjqsdmf"
          className="bg-green-400"
        >
          <h3 className="font-semibold">Auctions</h3>
          {auctions?.length > 0 ? (
            auctions.map((item) => (
              <div
                className="flex border rounded border-green-100 m-2"
                key={item?.created_at + item?.id}
              >
                <div>
                  <h2>{item?.name}</h2>
                  <p className="bg-green-800">{item?.description}</p>
                  <p className="bg-green-800">{item?.created_at}</p>
                </div>

                <div>
                  <img
                    className="rounded-full"
                    width={100}
                    height={200}
                    src={item?.cover_lobby}
                  />
                </div>
              </div>
            ))
          ) : (
            <h2 className="empty">Nothing to be found here</h2>
          )}
        </section>
      </article>
    </div>
  );
};

export default Profile;
