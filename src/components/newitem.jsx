import { useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const NewItem = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [item, setItem] = useState({
    itemName: "",
    auctionStart: new Date().toISOString(), // isostring good
    auctionDuration: 10000, // ms
    itemDescription: "",
    coverLobby: "",
    tags: [],
    pictures: [],
  });

  const updateForm = (formKey, e) => {
    const { value } = e.target;

    setItem((prevForm) => ({
      ...prevForm,
      [formKey]: value,
    }));
  };

  const No = () => {
    fetch(`${endpoint}/historic/2`, {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(item);

    if (cookies.user) {
      fetch(`${endpoint}/my_auction`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authentication: cookies.user,
        },
      })
        .then((res) => res.json())
        .then((post) => {
          console.log(post);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Not allowed, please login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <No />
      <label>
        Item name:
        <input
          type="text"
          name="name"
          required
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
          type="url"
          name="post"
          required
          value={item.coverLobby}
          onChange={(e) => {
            e.preventDefault();
            updateForm("coverLobby", e);
          }}
        />
      </label>

      <label>
        Tags:
        <input
          type="text"
          name="tags"
          value={item.tags}
          onChange={(e) => {
            e.preventDefault();
            updateForm("tags", e);
          }}
        />
      </label>

      <label>
        Pictures:
        <input
          type="url"
          name="pictures"
          value={item.pictures}
          onChange={(e) => {
            e.preventDefault();
            updateForm("pictures", e);
          }}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewItem;
