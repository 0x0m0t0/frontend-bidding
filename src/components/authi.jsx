import { useEffect, useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Login = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    fetch(`${endpoint}/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="name"
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="name"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
      </label>

      <br />

      <label>
        Password:
        <input
          type="text"
          name="post"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
