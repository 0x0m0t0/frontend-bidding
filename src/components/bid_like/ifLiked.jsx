export const ifLiked = (endpoint, cookies, setLikedLobbies) => {
  fetch(`${endpoint}/account/like/${cookies.user_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "https://platform.oxomoto.co/",
      authentication: cookies.user,
    },
  })
    .then((res) => {
      if (!res.ok) throw new err(res.status);
      else return res.json();
    })
    .then((data) => {
      setLikedLobbies(data);
      console.log(data);
    })
    .catch((err) => {
      return err;
    });
};
