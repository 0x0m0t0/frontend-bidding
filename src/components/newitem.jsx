import { useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useNavigate } from "react-router-dom";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const NewItem = () => {
  const [isSent, setisSent] = useState(true);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [cookies, setCookie] = useCookies(["user"]);
  const [item, setItem] = useState({
    itemName: "",
    auctionStart: "", // isostring good
    auctionDuration: 10000, // ms
    itemDescription: "",
    coverLobby: "",
    tags: [],
    pictures: [],
  });

  const handleDateChange = (newValue) => {
    setDate(newValue); // Update the DateTimePicker value state
    // Update the auctionStart field in the item state with the selected date and time
    setItem((prevForm) => ({
      ...prevForm,
      auctionStart: newValue.toISOString(),
    }));
  };

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

  const Redirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSent ? setisSent(false) : setisSent(true);

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
          console.log(value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Not allowed, please login");
    }
  };

  return (
    <>
      {isSent ? (
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
          <br />
          <label>
            Start Time:
            <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              maxDetail="second"
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={handleDateChange}
              secondAriaLabel="Second"
              value={date}
              yearAriaLabel="Year"
            />
          </label>
          <br />
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
          <br />
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
      ) : (
        <>
          <p>Thank you, you'll be redirected in 3 seconds to the homepage</p>
          <Redirect />
        </>
      )}
    </>
  );
};

export default NewItem;
