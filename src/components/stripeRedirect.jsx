export const Stripy = (cookies, endpoint, winning_item, winning_bid) => {
  console.log("groooos grooos fuck");
  // id item, bid_id   id_item id_bid
  fetch(`${endpoint}/my_bidding/payment/stripe/`, {
    method: "POST",
    body: JSON.stringify({
      id_item: winning_item,
      id_bid: winning_bid,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: cookies.user,
    },
  })
    .then((res) => res.json())
    .then((post) => {
      console.log("send to striiipy");
      console.log(post.message);

      window.location.href = `${post.message}`;
    })
    .catch((err) => {
      console.log(err.message);
    });

  console.log("grooos fuck");
};
