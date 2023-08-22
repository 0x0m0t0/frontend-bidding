import { useEffect, useState } from "react";
import beehiveLogo from "./assets/img/beehive.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

import "./index.css";

import NoMatch from "./components/404";
import Login from "./components/authi";
import Nav from "./components/navbar";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <img width={60} height={60} src={beehiveLogo} />
      <p>Welcome to Bidhive</p>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("https://auction.oxomoto.co/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
