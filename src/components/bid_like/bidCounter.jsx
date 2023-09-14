export const fetchBidAmount = (endpoint, lobbyId, cookies, currentBitTotal) => {
  console.log(currentBitTotal);
  if (cookies.user) {
    fetch(`${endpoint}/lobby/bid`, {
      method: "POST",
      body: JSON.stringify({
        lobby_id: lobbyId,
        bidAmount: currentBitTotal,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": endpoint,

        authentication: cookies.user,
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        return err;
      });
  } else {
    alert("Not allowed, please login");
  }
};
