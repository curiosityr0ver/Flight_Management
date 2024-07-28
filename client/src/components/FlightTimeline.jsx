import React, { useState, useMemo, useEffect } from "react";
import { Box, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Cell,
} from "recharts";
import "./FlightTimeline.css"; // Import your CSS file for custom styles

const FlightTimeline = ({ flights, airports }) => {
	const [selectedAirport, setSelectedAirport] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());

	const sortedAirports = useMemo(
		() => [...airports].sort((a, b) => a.name.localeCompare(b.name)),
		[airports]
	);

	const airportCodes = useMemo(
		() => airports.map((airport) => airport.code),
		[airports]
	);

	const flightDatesPerAirport = useMemo(() => {
		const flightDates = {};
		airportCodes.forEach((code) => {
			flightDates[code] = new Set();
		});
		flights.forEach((flight) => {
			if (flightDates[flight.departureAirport]) {
				flightDates[flight.departureAirport].add(
					new Date(flight.departureTime).toLocaleDateString("en-CA")
				);
			}
			if (flightDates[flight.arrivalAirport]) {
				flightDates[flight.arrivalAirport].add(
					new Date(flight.arrivalTime).toLocaleDateString("en-CA")
				);
			}
		});
		return flightDates;
	}, [flights, airportCodes]);

	const filteredFlights = useMemo(() => {
		if (!selectedAirport || !selectedDate) return [];

		const dateString = selectedDate.toLocaleDateString("en-CA");

		return flights
			.filter(
				(flight) =>
					(flight.departureAirport === selectedAirport &&
						new Date(flight.departureTime).toLocaleDateString("en-CA") ===
							dateString) ||
					(flight.arrivalAirport === selectedAirport &&
						new Date(flight.arrivalTime).toLocaleDateString("en-CA") ===
							dateString)
			)
			.map((flight) => ({
				...flight,
				isDeparture: flight.departureAirport === selectedAirport,
				relevantTime:
					flight.departureAirport === selectedAirport
						? flight.departureTime
						: flight.arrivalTime,
				relevantRunway:
					flight.departureAirport === selectedAirport
						? flight.departureRunway
						: flight.arrivalRunway,
				x:
					new Date(
						flight.departureAirport === selectedAirport
							? flight.departureTime
							: flight.arrivalTime
					).getHours() +
					new Date(
						flight.departureAirport === selectedAirport
							? flight.departureTime
							: flight.arrivalTime
					).getMinutes() /
						60,
				y:
					flight.departureAirport === selectedAirport
						? flight.departureRunway
						: flight.arrivalRunway,
			}));
	}, [flights, selectedAirport, selectedDate]);

	useEffect(() => {
		if (selectedAirport && selectedDate) {
			console.log("Selected Flights:", filteredFlights);
		}
	}, [filteredFlights, selectedAirport, selectedDate]);

	const selectedAirportData = airports.find(
		(airport) => airport.code === selectedAirport
	);

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const flight = payload[0].payload;
			return (
				<div className="custom-tooltip">
					<p>
						<strong>Flight Number:</strong> {flight.flightNumber}
					</p>
					<p>
						<strong>Airline:</strong> {flight.airline}
					</p>
					<p>
						<strong>
							{flight.isDeparture ? "Departure" : "Arrival"} Time:
						</strong>{" "}
						{new Date(flight.relevantTime).toLocaleTimeString()}
					</p>
					<p>
						<strong>Runway:</strong> {flight.relevantRunway}
					</p>
					<p>
						<strong>Status:</strong> {flight.status}
					</p>
				</div>
			);
		}
		return null;
	};

	const dayClassName = (date) => {
		const dateString = date.toLocaleDateString("en-CA");
		return flightDatesPerAirport[selectedAirport]?.has(dateString)
			? "flight-date"
			: undefined;
	};

	return (
		<div className="flight-schedule">
			<div className="controls">
				<Select
					value={selectedAirport}
					onChange={(e) => setSelectedAirport(e.target.value)}
					placeholder="Select Airport"
				>
					{sortedAirports.map((airport) => (
						<option key={airport.code} value={airport.code}>
							{airport.name} ({airport.code})
						</option>
					))}
				</Select>
				<Box>
					<DatePicker
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						dayClassName={dayClassName}
					/>
				</Box>
			</div>

			{selectedAirport && selectedDate && (
				<div className="chart-container">
					<h2>{`Flight Schedule for ${
						selectedAirportData?.name
					} (${selectedAirport}) on ${
						selectedDate.toISOString().split("T")[0]
					}`}</h2>
					<ScatterChart
						width={1000}
						height={500}
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 20,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							type="number"
							dataKey="x"
							name="Time"
							unit="h"
							domain={[0, 24]}
							ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
						/>
						<YAxis type="category" dataKey="y" name="Runway" />
						<Tooltip content={<CustomTooltip />} />
						<Scatter data={filteredFlights} shape="circle">
							{filteredFlights.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.isDeparture ? "#6a0dad" : "#00a86b"}
								/>
							))}
						</Scatter>
					</ScatterChart>
				</div>
			)}
		</div>
	);
};

export default FlightTimeline;
