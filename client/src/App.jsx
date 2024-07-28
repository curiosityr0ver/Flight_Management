import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightTable from "./components/FlightTable";
import FlightTimeline from "./components/FlightTimeline";

function App() {
	const [flights, setFlights] = useState([]);
	const [airports, setAirports] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:3000/config")
			.then((response) => {
				setAirports(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the airport data!", error);
			});

		axios
			.get("http://localhost:3000/flights")
			.then((response) => {
				console.log(response.data);
				setFlights(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the flight data!", error);
			});
	}, []);
	return (
		<div className="App">
			{flights.length > 0 && airports.length > 0 ? (
				<FlightTable flights={flights} airports={airports} />
			) : (
				<p>Loading</p>
			)}
			<FlightTimeline flights={flights} airports={airports} />
		</div>
	);
}

export default App;
