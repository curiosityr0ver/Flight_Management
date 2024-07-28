import React, { useMemo } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Cell,
	Legend,
} from "recharts";
import { format } from "date-fns";
import { Box, Text } from "@chakra-ui/react";
import "./FlightTimeline.css"; // Import your CSS file for custom styles

const FlightTimeline = ({ flights, airport, date }) => {
	const selectedDate = date ? new Date(date) : new Date();
	const selectedAirport = airport;

	const filteredFlights = useMemo(() => {
		if (!selectedAirport) return [];

		const dateString = format(selectedDate, "yyyy-MM-dd");

		return flights
			.filter(
				(flight) =>
					(flight.departureAirport === selectedAirport &&
						format(new Date(flight.departureTime), "yyyy-MM-dd") ===
							dateString) ||
					(flight.arrivalAirport === selectedAirport &&
						format(new Date(flight.arrivalTime), "yyyy-MM-dd") === dateString)
			)
			.map((flight) => {
				const departureTime = new Date(flight.departureTime);
				const arrivalTime = new Date(flight.arrivalTime);
				const departureTimeWithDelay = new Date(departureTime);
				departureTimeWithDelay.setMinutes(
					departureTimeWithDelay.getMinutes() + flight.delay
				);
				const arrivalTimeWithDelay = new Date(arrivalTime);
				arrivalTimeWithDelay.setMinutes(
					arrivalTimeWithDelay.getMinutes() + flight.delay
				);

				return {
					...flight,
					isDeparture: flight.departureAirport === selectedAirport,
					scheduledTime:
						flight.departureAirport === selectedAirport
							? departureTime
							: arrivalTime,
					actualTime:
						flight.departureAirport === selectedAirport
							? departureTimeWithDelay
							: arrivalTimeWithDelay,
					relevantRunway:
						flight.departureAirport === selectedAirport
							? flight.departureRunway
							: flight.arrivalRunway,
					x:
						(flight.departureAirport === selectedAirport
							? departureTimeWithDelay
							: arrivalTimeWithDelay
						).getHours() +
						(flight.departureAirport === selectedAirport
							? departureTimeWithDelay
							: arrivalTimeWithDelay
						).getMinutes() /
							60,
					y:
						flight.departureAirport === selectedAirport
							? flight.departureRunway
							: flight.arrivalRunway,
				};
			});
	}, [flights, selectedAirport, selectedDate]);

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
							{flight.isDeparture ? "Scheduled Departure" : "Scheduled Arrival"}{" "}
							Time:
						</strong>{" "}
						{format(new Date(flight.scheduledTime), "hh:mm a")}
					</p>
					<p>
						<strong>
							{flight.isDeparture ? "Actual Departure" : "Actual Arrival"} Time:
						</strong>{" "}
						{format(new Date(flight.actualTime), "hh:mm a")}
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

	if (!selectedAirport) {
		return (
			<Box className="flight-schedule">
				<Text>Please select an airport to view its schedule.</Text>
			</Box>
		);
	}

	if (filteredFlights.length === 0) {
		return (
			<Box className="flight-schedule">
				<Text>No flights available on the selected date.</Text>
			</Box>
		);
	}

	return (
		<Box className="flight-schedule">
			<Box
				className="chart-container"
				boxShadow="lg"
				p="6"
				rounded="md"
				bg="white"
			>
				<Text
					as="h2"
					fontSize="2xl"
					fontWeight="bold"
					mb="4"
				>{`Flight Schedule for ${selectedAirport} on ${format(
					selectedDate,
					"PPP"
				)}`}</Text>
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
						tickLine={false}
						tick={{ fontSize: 14, fontWeight: "bold" }}
					/>
					<YAxis
						type="category"
						dataKey="y"
						name="Runway"
						tickLine={false}
						tick={{ fontSize: 14, fontWeight: "bold" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend />
					<Scatter
						name="Departures"
						data={filteredFlights.filter((f) => f.isDeparture)}
						fill="#6a0dad"
					>
						{filteredFlights
							.filter((f) => f.isDeparture)
							.map((entry, index) => (
								<Cell key={`cell-${index}`} />
							))}
					</Scatter>
					<Scatter
						name="Arrivals"
						data={filteredFlights.filter((f) => !f.isDeparture)}
						fill="#00a86b"
					>
						{filteredFlights
							.filter((f) => !f.isDeparture)
							.map((entry, index) => (
								<Cell key={`cell-${index}`} />
							))}
					</Scatter>
				</ScatterChart>
			</Box>
		</Box>
	);
};

export default FlightTimeline;
