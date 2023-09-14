export const removeLike = (lobbyid, endpoint, cookies) => {
  if (cookies.user) {
    fetch(`${endpoint}/lobby/like`, {
      method: "DELETE",
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
      .then((data) => console.log(data))
      .catch((err) => {
        return err;
      });
  } else {
    alert("Not allowed, please login");
  }
};
