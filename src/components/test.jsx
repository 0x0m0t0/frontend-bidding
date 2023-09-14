const yourfetch = () => {
  fetch(`url-here`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "https://auction.oxomoto.co/",
      // authentication: 'tokenhere',
    },
  })
    .then((res) => {
      if (!res.ok) throw new err(res.status);
      else return res.json();
    })
    .then((data) => {
      console.log(data);
      // setBid(data[0].amount);
    })
    .catch((err) => {
      return err;
    });
};
