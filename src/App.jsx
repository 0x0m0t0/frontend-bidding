import { useEffect, useState } from "react";
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
import Home from "./components/home";

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
