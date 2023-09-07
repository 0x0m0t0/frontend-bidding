import { useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Signup = (props) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    username: "",
  });

  const updateForm = (formKey, e) => {
    const { value } = e.target;

    setRegister((prevForm) => ({
      ...prevForm,
      [formKey]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${endpoint}/signup`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log(res.status);
          alert(`Err ${res.status}: Retry inputs`);
        }
        // else if (!res.ok) throw new err(res.status);
        else return res.json();
      })
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });

    return <h1>Ok, you signed up chief!</h1>;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Username{" "}
      </label>
      <input
        type="text"
        name="name"
        required
        value={register.name}
        className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          e.preventDefault();
          updateForm("name", e);
        }}
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Username{" "}
      </label>
      <input
        type="text"
        name="username"
        required
        value={register.username}
        className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          e.preventDefault();
          updateForm("username", e);
        }}
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Avatar{" "}
      </label>
      <input
        type="text"
        name="avatar"
        required
        value={register.avatar}
        className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          e.preventDefault();
          updateForm("avatar", e);
        }}
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Email{" "}
      </label>
      <input
        type="email"
        name="name"
        required
        value={register.email}
        className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          e.preventDefault();
          updateForm("email", e);
        }}
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Password{" "}
      </label>
      <input
        type="password"
        name="post"
        required
        value={register.password}
        className="w-full max-w-xs rounded-md border-0 py-1.5 m-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          e.preventDefault();
          updateForm("password", e);
        }}
      />
      <br />
      <button
        className="w-full  max-w-xs justify-center rounded-md bg-yellow-400 px-3 py-1.5 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        type="submit"
      >
        Register
      </button>

      <div>
        <p>Already have an account?</p>
        <button onClick={() => props.handleRegister()}>Login →</button>
      </div>
    </form>
  );
};

export default Signup;
