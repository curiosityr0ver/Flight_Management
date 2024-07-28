import { useState, useEffect } from "react";
import FlightTable from "./components/FlightTable";
import FlightTimeline from "./components/FlightTimeline";
import FlightFilter from "./components/FlightFilter";
import { getFlights, getAirports } from "./api/Flight";

function App() {
	const [flights, setFlights] = useState([]);
	const [filteredFlights, setFilteredFlights] = useState([]);
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
				setFilteredFlights(data);
			}
		});
	}, []);

	return (
		<div className="App">
			<FlightFilter
				flights={flights}
				airports={airports}
				filters={filters}
				setFilters={setFilters}
				setFilteredFlights={setFilteredFlights}
			/>
			<FlightTable flights={filteredFlights} airports={airports} />
			<FlightTimeline
				flights={filteredFlights}
				airports={airports}
				airport={airports.find((airport) => airport.code === filters.airport)}
				date={filters.date}
			/>
		</div>
	);
}

export default App;
