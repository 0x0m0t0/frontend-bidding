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
          required
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
          type="password"
          required
          name="password"
          className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          className="flex max-w-xs w-full h-10 px-3 py-2 text-sm inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide bg-mustard text-midnightblue transition-colors duration-200 rounded-md hover:bg-midnightblue hover:text-mustard focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="pt-6">
        <p>No account with us yet?</p>
        <div className="w-full max-w-xs mx-auto flex p-1">
          <button
            type="submit"
            nClick={() => props.handleRegister()}
            className="flex w-full h-10 px-3 py-2 text-sm inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide bg-midnightblue text-mustard transition-colors duration-200 rounded-md hover:bg-mustard hover:text-midnightblue focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
          >
            Get Access →
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
