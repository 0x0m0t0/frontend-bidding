export const amountLikes = (lobbyid, endpoint, cookies, setBid, setLikes) => {
  fetch(`${endpoint}/lobby/update_lobby/${lobbyid}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": endpoint,
      authentication: cookies.user,
    },
  })
    .then((res) => {
      if (!res.ok) throw new err(res.status);
      else return res.json();
    })
    .then((data) => {
      setBid(data[0].amount);
      setLikes(data[0].likes);
    })
    .catch((err) => {
      return err;
    });
};
