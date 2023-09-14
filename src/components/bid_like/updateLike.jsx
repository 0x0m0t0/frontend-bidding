export const updateLike = (endpoint, lobbyid, cookies) => {
  if (cookies.user) {
    fetch(`${endpoint}/lobby/like`, {
      method: "POST",
      body: JSON.stringify({
        lobby_id: lobbyid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
        authentication: cookies.user,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        return err;
      });
  } else {
    alert("Not allowed, please login");
  }
};
