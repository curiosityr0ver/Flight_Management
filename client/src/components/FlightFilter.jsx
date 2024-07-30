/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Select, Button, Input, Heading } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightFilter = ({
	flights,
	airports,
	filters,
	setFilters,
	setFilteredFlights,
}) => {
	const { airport, direction, date, search } = filters;
	const navigate = useNavigate();

	const handleFilterChange = (key, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[key]: value,
		}));
	};

	const clearFilters = () => {
		setFilters({
			airport: "",
			direction: "",
			date: null,
			search: "",
		});
	};

	useEffect(() => {
		const applyFilters = () => {
			const filtered = flights.filter((flight) => {
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
			setFilteredFlights(filtered);
		};

		applyFilters();
	}, [filters, flights, setFilteredFlights]);

	const uniqueAirports = airports.map((airport) => airport.code);

	return (
		<Box p={4} boxShadow="lg" borderRadius="lg" bg="white" mb={4}>
			<Heading as="h2" size="lg" mb={4} textAlign="center">
				Filter Flights
			</Heading>
			<Flex mb={4} align="center" justify="space-between" wrap="wrap">
				<Select
					placeholder="Filter by Airport"
					value={airport}
					onChange={(e) => handleFilterChange("airport", e.target.value)}
					width="20%"
					mb={2}
				>
					{uniqueAirports.map((airport) => (
						<option key={airport} value={airport}>
							{airport}
						</option>
					))}
				</Select>
				{airport && (
					<Select
						placeholder="Show All"
						value={direction}
						onChange={(e) => handleFilterChange("direction", e.target.value)}
						width="20%"
						mb={2}
					>
						<option value="">Show All</option>
						<option value="departures">Departures Only</option>
						<option value="arrivals">Arrivals Only</option>
					</Select>
				)}
				<DatePicker
					selected={date}
					onChange={(date) => handleFilterChange("date", date)}
					placeholderText="Filter by Date"
					className="chakra-input"
					style={{ width: "20%", marginBottom: "8px" }}
				/>
				<Input
					placeholder="Search by Flight No or Airline"
					value={search}
					onChange={(e) => handleFilterChange("search", e.target.value)}
					width="20%"
					mb={2}
				/>
				<Button onClick={clearFilters} colorScheme="teal" mb={2}>
					Clear Filters
				</Button>
				<Button onClick={() => navigate("/create")} colorScheme="blue" mb={2}>
					Add New Flight
				</Button>
			</Flex>
		</Box>
	);
};

export default FlightFilter;
