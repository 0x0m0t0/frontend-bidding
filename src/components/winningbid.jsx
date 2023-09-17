export const superBids = (cookies, endpoint, setWinner) => {
  console.log("ur a winner son");
  fetch(`${endpoint}/my_bidding/payment/${cookies.user_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((post) => {
      setWinner(post);
      console.log("haaaaa");
      console.log(post);
    })
    .catch((err) => {
      console.log(err.message);
    });

  console.log("grooos fuck");
};
