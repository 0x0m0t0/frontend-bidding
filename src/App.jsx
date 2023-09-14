import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

import "./src/../index.css";

import NoMatch from "./components/404";
import Auth from "./components/authi";

import Nav from "./components/navbar.jsx";
import Home from "./components/home.jsx";
import Profile from "./components/profile";
import Archive from "./components/archive";
import NewItem from "./components/newitem.jsx";
import Lobby from "./components/lobby.jsx";
import AllLobby from "./components/allLobby.jsx";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile users={users} />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/newitem" element={<NewItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alllobby" element={<AllLobby />} />
        <Route path="/lobby/:lobbyid" element={<Lobby />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
