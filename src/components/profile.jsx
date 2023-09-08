import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import user from "../utils/user_account";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Profile = ({ users }) => {
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [userInfo, setUserInfo] = useState([]);
  const [bids, setBids] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  user({ endpoint, cookies, setUserInfo });

  const Biddings = () => {
    fetch(`${endpoint}/my_bidding/${cookies.user_id}`, {
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
    fetch(`${endpoint}/my_auction/${cookies.user_id}`, {
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
  const Liked = () => {
    fetch(`${endpoint}/account/like/${cookies.user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setLikedPosts(post);
        console.log("liked hahahahah");
        console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    Biddings();
    Auctions();
    Liked();
  }, []);

  return (
    <div className="flex flex-col self-center items-center">
      {userInfo.length > 0 ? (
        <h2 key={userInfo[0]?.email} className="text-2xl">
          Welcome <em>{userInfo[0]?.name}</em>
        </h2>
      ) : (
        <p>Error fetching user account data</p>
      )}

      <article className="flex">
        <section className="p-3">
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
            <h2 className="empty">Nothing yet</h2>
          )}
        </section>

        <section className="p-3">
          <h3 className="font-semibold ">Auctions</h3>
          <div className="">
            {auctions?.length > 0 ? (
              auctions.map((item) => (
                <div className="first:pt-4" key={item?.created_at + item?.id}>
                  <div>
                    <h2>{item?.name}</h2>
                  </div>

                  <div className="max-w-[18.75rem] object-cover pb-2">
                    <img className="rounded-2xl" src={item?.cover_lobby} />
                    <p className="text-sm">{item?.created_at}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="empty">Nothing yet</h2>
            )}
          </div>
        </section>
        <section className="p-3">
          <h3 className="font-semibold">Liked</h3>
          {likedPosts?.length > 0 ? (
            likedPosts.map((item) => (
              <div className="flex" key={item?.id_lobby + Date.now()}>
                <div>
                  <Link
                    to={`/lobby/${item?.id_lobby}`}
                    className="hover:underline"
                  >
                    {item?.id_lobby}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h2 className="empty">Nothing yet</h2>
          )}
        </section>
      </article>
    </div>
  );
};

export default Profile;
