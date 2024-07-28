import React, { useState, useEffect } from "react";
import FlightTable from "./components/FlightTable";
import FlightTimeline from "./components/FlightTimeline";
import { getFlights, getAirports } from "./api/Flight";

function App() {
	const [flights, setFlights] = useState([]);
	const [airports, setAirports] = useState([]);
	const [filters, setFilters] = useState({
		airport: "",
		direction: "",
		date: null,
		search: "",
	});

	useEffect(() => {
		getAirports().then((data) => {
			if (data) {
				setAirports(data);
			}
		});

		getFlights().then((data) => {
			if (data) {
				setFlights(data);
			}
		});
	}, []);

	useEffect(() => {
		const applyFilters = () => {
			getFlights().then((data) => {
				if (data) {
					const { airport, direction, date, search } = filters;
					const filtered = data.filter((flight) => {
						let match = true;

						if (airport) {
							match =
								match &&
								(flight.departureAirport === airport ||
									flight.arrivalAirport === airport);
						}

						if (direction) {
							if (direction === "departures") {
								match = match && flight.departureAirport === airport;
							} else if (direction === "arrivals") {
								match = match && flight.arrivalAirport === airport;
							}
						}

						if (date) {
							const flightDate = new Date(flight.departureTime).toDateString();
							match = match && flightDate === date.toDateString();
						}

						if (search) {
							const lowerCaseQuery = search.toLowerCase();
							match =
								match &&
								(flight.flightNumber.toLowerCase().includes(lowerCaseQuery) ||
									flight.airline.toLowerCase().includes(lowerCaseQuery));
						}

						return match;
					});
					setFlights(filtered);
				}
			});
		};

		applyFilters();
	}, [filters]);

	return (
		<div className="App">
			<FlightTable
				flights={flights}
				airports={airports}
				filters={filters}
				setFilters={setFilters}
			/>
			<FlightTimeline
				flights={flights}
				airport={filters.airport}
				date={filters.date}
			/>
		</div>
	);
}

export default App;
