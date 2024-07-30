import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FlightTable from "./components/FlightTable";
import FlightTimeline from "./components/FlightTimeline";
import FlightFilter from "./components/FlightFilter";
import Dashboard from "./components/Dashboard";
import LoginRegisterPage from "./components/HomePage";
import { getFlights, getAirports } from "./api/Flight";
import NotFound from "./components/NotFoundPage";

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
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginRegisterPage />} />
				<Route path="/register" element={<LoginRegisterPage />} />
				<Route path="/update/:id" element={<Dashboard airports={airports} />} />
				<Route path="/create" element={<Dashboard airports={airports} />} />

				<Route
					path="/"
					element={
						<>
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
								airport={airports.find(
									(airport) => airport.code === filters.airport
								)}
								date={filters.date}
							/>
						</>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
