import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import user from "../utils/user_account";
import { superBids } from "./winningbid";
import { Stripy } from "./stripeRedirect";

import { Logout } from "./logout";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"], ["user_id"]);
  const [userInfo, setUserInfo] = useState([]);
  const [bids, setBids] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedContent, setLikedContent] = useState("");

  const [winner, setWinner] = useState([]);
  user({ endpoint, cookies, setUserInfo });

  // const countdown = () => {
  //   const isoDateTime = "2023-09-15T16:08:15.354Z";
  //   const dateObject = dayjs(isoDateTime);
  //   const currentTime = dayjs();

  //   const duration = dayjs.duration(dayjs().diff(dateObject));

  //   const days = Math.abs(duration.days());
  //   const hours = Math.abs(duration.hours());
  //   const minutes = Math.abs(duration.minutes());
  //   const seconds = Math.abs(duration.seconds());

  //   const formattedDuration = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  //   console.log("Difference in a human-readable format:", formattedDuration);
  // };

  // setInterval(() => {
  //   countdown();
  // }, 2000);

  const Biddings = () => {
    fetch(`${endpoint}/my_bidding/${cookies.user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) =>
        post.map(async (item) => {
          setBids((previousItem) => [...previousItem, item?.item_information]);
          console.log(post);
        })
      )
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
        // console.log(post);
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
        // console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const likedData = async () => {
    if (likedPosts?.length > 0) {
      const updatedPosts = [];
      await Promise.all(
        likedPosts.map(async (item) => {
          try {
            const response = await fetch(
              `${endpoint}/lobby/${item?.id_lobby}`,
              {
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );
            const post = await response.json();
            updatedPosts.push(post);
          } catch (err) {
            console.log(err.message);
          }
        })
      );
      setLikedContent(updatedPosts);
      // console.log(updatedPosts);
    } else {
      console.log("nada");
    }
  };

  useEffect(() => {
    Biddings();
    Auctions();
    Liked();
  }, []);

  useEffect(() => {
    superBids(cookies, endpoint, setWinner);
  }, [cookies, endpoint]);

  useEffect(() => {
    likedData();
  }, [likedPosts]);
  useEffect(() => {
    console.log(bids);
  }, [bids]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {userInfo.length > 0 ? (
          <h2
            className="min-w-32 text-2xl w-full justify-start"
            key={userInfo[0]?.email}
          >
            Welcome to your dashboard {userInfo[0]?.name}
          </h2>
        ) : (
          <p>Error fetching user account data</p>
        )}

        <Logout />
      </div>

      <div className="w-full min-h-10 bg-green-300 mb-2 rounded-lg">
        <h1 className="text-2xl p-2">Winning bids</h1>

        {winner.length > 0 ? (
          winner.map((item) => (
            <div className="flex p-2">
              <h2 key={item?.id + Date.now()} className="text-2xl ">
                <span className="text-midnightblue">{item?.name}</span>
              </h2>

              <button
                className="inline-flex items-center justify-center ml-5 h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
                onClick={() =>
                  Stripy(
                    cookies,
                    endpoint,
                    item?.id_item,
                    item?.bid_id,
                    navigate
                  )
                }
              >
                Checkout
              </button>
            </div>
          ))
        ) : (
          <p>Error fetching user account data</p>
        )}
      </div>

      <article className="flex justify-center w-full rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm md:flex-row md:space-x-4">
        <section className="flex-1 p-3">
          <h3 className="font-semibold">My Bids</h3>
          {bids?.length > 0 ? (
            bids.map((item, index) => (
              <>
                <div
                  className=" rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full max-w-xs"
                  key={item?.id_item + item?.id_seller + index}
                >
                  <div className="relative">
                    <img
                      src={item?.cover_lobby}
                      className="w-full h-auto max-h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-lg font-bold leading-none tracking-tight">
                      {item?.item_name}
                    </h2>

                    <button
                      className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
                      onClick={() => navigate(`/lobby/${item?.id}`)}
                    >
                      View Lobby
                    </button>
                    <p className="text-sm">{item?.created_at}</p>
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
              <div className=" rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full max-w-xs">
                <div className="p-6">
                  <p className="text-sm">No bids yet</p>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="flex-1 p-3">
          <h3 className="font-semibold ">My Auctions</h3>
          <div className="">
            {auctions?.length > 0 ? (
              auctions.map((item) => (
                <>
                  <div
                    className=" rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full "
                    key={item?.created_at + item?.id}
                  >
                    <div className="relative">
                      <img
                        src={item?.cover_lobby}
                        className="w-full h-auto max-h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="mb-2 text-lg font-bold leading-none tracking-tight">
                        {item?.name}
                      </h2>

                      <button
                        className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
                        // onClick={() => navigate(`/lobby/${item?.id}`)}
                      >
                        View Lobby
                      </button>
                      <p className="text-sm">{item?.created_at}</p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <>
                <div className=" rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full max-w-xs">
                  <div className="p-6">
                    <p className="text-sm">Nothing yet</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="flex-1 p-3">
          <h3 className="font-semibold">Liked</h3>
          {likedContent.length > 0 ? (
            likedContent.map((item) =>
              item.map((item) => (
                <>
                  <div
                    className=" rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full max-w-xs"
                    key={item?.created_at + item?.end_at}
                  >
                    <div className="relative">
                      <img
                        src={item?.cover_lobby}
                        className="w-full h-auto max-h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="mb-2 text-lg font-bold leading-none tracking-tight">
                        {item?.name}
                      </h2>
                      <p className="text-sm">{item?.likes} ♥</p>
                      <button
                        className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
                        onClick={() => navigate(`/lobby/${item?.id}`)}
                      >
                        View Lobby
                      </button>
                      <p className="text-sm">{item?.created_at}</p>
                    </div>
                  </div>
                </>
              ))
            )
          ) : (
            <h2 className="empty">Nothing yet</h2>
          )}
        </section>
      </article>
    </div>
  );
};

export default Profile;
