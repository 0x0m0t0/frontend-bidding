import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Login = (props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [cookiesUser, setCookieUser] = useCookies(["user_id"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${endpoint}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log(res.status);
          alert(`Err ${res.status}: Wrong email or password`);
        }

        // else if (!res.ok) throw new err(res.status);
        else {
          console.log(res.status);
          return res.json();
        }
      })

      .then((post) => {
        setEmail("");
        setPassword("");
        setCookie("user", post.token, { path: "/" });
        setCookieUser("user_id", post.id, { path: "/" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <input
          type="text"
          name="name"
          className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />

        <label className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <input
          type="text"
          name="post"
          className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          className="w-full  max-w-xs justify-center rounded-md bg-yellow-400 px-3 py-1.5 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          type="submit"
        >
          Login
        </button>
      </form>

      <div>
        <p>No account with us yet?</p>
        <button onClick={() => props.handleRegister()}>Get Access →</button>
      </div>
    </>
  );
};

export default Login;
