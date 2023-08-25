import { useState, useEffect } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const NewItem = () => {
  const [item, setItem] = useState({
    user_id: "129",
    itemName: "",
    auctionStart: new Date().toISOString(), // to be changed
    auctionDuration: 100,
    itemDescription: "",
    coverLobby: "",
  });

  const updateForm = (formKey, e) => {
    const { value } = e.target;

    setItem((prevForm) => ({
      ...prevForm,
      [formKey]: value,
    }));
  };

  const No = () => {
    useEffect(() => {
      fetch(`${endpoint}/historic/1`, {
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((post) => {
          console.log(post);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(item);

    fetch(`${endpoint}/my_auction`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <No />
      <label>
        Item name:
        <input
          type="text"
          name="name"
          value={item.itemName}
          onChange={(e) => {
            e.preventDefault();
            updateForm("itemName", e);
          }}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={item.itemDescription}
          onChange={(e) => {
            e.preventDefault();
            updateForm("itemDescription", e);
          }}
        />
      </label>

      <br />

      <label>
        Image cover:
        <input
          type="text"
          name="post"
          value={item.coverLobby}
          onChange={(e) => {
            e.preventDefault();
            updateForm("coverLobby", e);
          }}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewItem;
