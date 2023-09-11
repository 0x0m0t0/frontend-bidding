import { useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "./../assets/css/datepick.css";

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
          <div className="w-full max-w-md mx-auto flex pb-2">
            <label className="w-60 max-w-xs  self-center"> Item name </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Name"
              name="name"
              required
              value={item.itemName}
              onChange={(e) => {
                e.preventDefault();
                updateForm("itemName", e);
              }}
            />
          </div>
          <div className="w-full max-w-md mx-auto flex pb-2">
            <label className="w-60 max-w-xs self-center"> Description</label>
            <textarea
              className="flex w-full h-10h-auto min-h-[80px] px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Product description"
              type="text"
              value={item.itemDescription}
              onChange={(e) => {
                e.preventDefault();
                updateForm("itemDescription", e);
              }}
            />
          </div>
          <div className="w-full max-w-md mx-auto flex pb-6">
            <label className="w-60 max-w-xs self-center"> Cover photo </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Cover photo"
              required
              value={item.coverLobby}
              onChange={(e) => {
                e.preventDefault();
                updateForm("coverLobby", e);
              }}
            />
          </div>
          <div className="w-full max-w-md mx-auto flex pb-4">
            <label className="w-60 max-w-xs self-center">
              {" "}
              Auction Start Date{" "}
            </label>

            <DateTimePicker
              className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
          <div className="w-full max-w-md mx-auto flex pb-2">
            <label className="w-60 max-w-xs self-center"> Tags </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tags"
              type="text"
              name="tags"
              value={item.tags}
              onChange={(e) => {
                e.preventDefault();
                updateForm("tags", e);
              }}
            />
          </div>

          <div className="w-full max-w-md mx-auto flex pb-4">
            <label className="w-60 max-w-xs self-center "> Pictures </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Auction Images"
              type="url"
              name="pictures"
              value={item.pictures}
              onChange={(e) => {
                e.preventDefault();
                updateForm("pictures", e);
              }}
            />
          </div>

          <div className="w-full max-w-md mx-auto flex pb-2">
            <button
              type="submit"
              className="flex w-full h-10 px-3 py-2 text-sm inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide bg-midnightblue text-mustard transition-colors duration-200 rounded-md hover:bg-mustard hover:text-midnightblue focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
            >
              Submit
            </button>
          </div>
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
