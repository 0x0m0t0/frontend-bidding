import { useEffect, useState } from "react";
import beehiveLogo from './assets/img/beehive.png'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from "react-router-dom";

import "./App.css";
import Login from "./components/login.jsx";
import NoMatch from "./components/404";
// import Example from "./components/navbar";

const Home=()=> {
	return (
		<div style={{ padding: 20 }}>
			<h2>Home</h2>
      <img width={60} height= {60}src={beehiveLogo}/>
			<p>Welcome to Bidhive</p>
		</div>
	);
}


const App = () => {
	const [users, setUsers] = useState([]);

	const fetchData = async () => {
		await fetch("https://auction.oxomoto.co")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				setUsers(data);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Router>
			<nav style={{ margin: 10 }}>
				<Link to="/" style={{ padding: 5 }}>
					Home
				</Link>
				<Link to="/login" style={{ padding: 5 }}>
					Login
				</Link>
				
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Router>
	);
};

export default App
