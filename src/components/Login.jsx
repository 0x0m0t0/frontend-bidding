import { useEffect, useState } from "react";


const Login=()=> {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


	return (

			<form onSubmit={""}>
				<label>
					Username or Email:
					<input type="text" name="name" onChange={""} />
				</label>
				<br />
				<label>
					Password:
					<input type="text" name="post" onChange={""} />
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>

	);
}


export default Login;
