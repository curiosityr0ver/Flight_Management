/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	SimpleGrid,
	useToast,
	Text,
	IconButton,
	Select,
	HStack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { createFlight, updateFlight, getFlightById } from "../api/Flight";

const Dashboard = ({ airports }) => {
	const navigate = useNavigate();
	const [type, setType] = useState("create");
	const [flight, setFlight] = useState({
		flightNumber: "",
		airline: "",
		departureAirport: "",
		arrivalAirport: "",
		departureDate: "",
		departureTime: "",
		arrivalDate: "",
		arrivalTime: "",
		departureRunway: "",
		arrivalRunway: "",
		gate: "",
		terminal: "",
		delay: 0,
		status: "on-time",
		passengers: [],
	});

	const [passenger, setPassenger] = useState({
		id: "",
		name: "",
		email: "",
		phone: "",
	});

	const [departureRunways, setDepartureRunways] = useState([]);
	const [arrivalRunways, setArrivalRunways] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const path = window.location.pathname.split("/");
		if (path[1] === "update") {
			setType("update");
			const flightID = path[2];
			getFlightById(flightID).then((data) => {
				const arrival = new Date(data.arrivalTime);
				const departure = new Date(data.departureTime);
				const arrivalDate = arrival.toISOString().split("T")[0];
				const arrivalTime = arrival.toISOString().split("T")[1].slice(0, 5);
				const departureDate = departure.toISOString().split("T")[0];
				const departureTime = departure.toISOString().split("T")[1].slice(0, 5);

				setFlight({
					...data,
					arrivalDate,
					arrivalTime,
					departureDate,
					departureTime,
				});
			});
		}
	}, []);

	useEffect(() => {
		const departureAirport = airports.find(
			(airport) => airport.code === flight.departureAirport
		);
		setDepartureRunways(departureAirport ? departureAirport.runways : []);
	}, [flight.departureAirport, airports]);

	useEffect(() => {
		const arrivalAirport = airports.find(
			(airport) => airport.code === flight.arrivalAirport
		);
		setArrivalRunways(arrivalAirport ? arrivalAirport.runways : []);
	}, [flight.arrivalAirport, airports]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFlight({ ...flight, [name]: value });
	};

	const handlePassengerInputChange = (e) => {
		const { name, value } = e.target;
		setPassenger({ ...passenger, [name]: value });
	};

	const addPassenger = () => {
		if (passenger.id && passenger.name && passenger.email && passenger.phone) {
			setFlight({
				...flight,
				passengers: [...flight.passengers, passenger],
			});
			setPassenger({ id: "", name: "", email: "", phone: "" });
		} else {
			toast({
				title: "Incomplete passenger details",
				description: "Please fill all passenger fields",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const removePassenger = (id) => {
		setFlight({
			...flight,
			passengers: flight.passengers.filter((p) => p.id !== id),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const flightData = {
				...flight,
				departureTime: `${flight.departureDate}T${flight.departureTime}:00Z`,
				arrivalTime: `${flight.arrivalDate}T${flight.arrivalTime}:00Z`,
			};
			if (type === "update") {
				const response = await updateFlight(
					window.location.pathname.split("/")[2],
					flightData
				);
				if (response.error) {
					toast({
						title: "Error",
						description: response.error,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Flight updated.",
						description: `Flight ${response.flightNumber} has been updated successfully.`,
						status: "success",
						duration: 5000,
						isClosable: true,
					});
					setFlight({
						flightNumber: "",
						airline: "",
						departureAirport: "",
						arrivalAirport: "",
						departureDate: "",
						departureTime: "",
						arrivalDate: "",
						arrivalTime: "",
						departureRunway: "",
						arrivalRunway: "",
						gate: "",
						terminal: "",
						delay: 0,
						status: "on-time",
						passengers: [],
					});
				}
			} else {
				const response = await createFlight(flightData);
				console.log("Flight created:", response);
				toast({
					title: "Flight created.",
					description: `Flight ${response.flightNumber} has been created successfully.`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
			// Reset form
		} catch (error) {
			console.error("Error creating flight:", error);
			toast({
				title: "Error",
				description: "Failed to create flight. Please try again.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Box p={5}>
			<Heading mb={5}>
				{type === "create" ? "Create Flight" : "Update Flight"}
				<Button ml={5} onClick={() => navigate("/")}>
					Back to Flights
				</Button>
			</Heading>
			<form onSubmit={handleSubmit}>
				<SimpleGrid columns={2} spacing={5}>
					<VStack align="start" spacing={4}>
						<FormControl isRequired>
							<FormLabel>Flight Number</FormLabel>
							<Input
								name="flightNumber"
								value={flight.flightNumber}
								onChange={handleInputChange}
								placeholder="DL123"
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Airline</FormLabel>
							<Input
								name="airline"
								value={flight.airline}
								onChange={handleInputChange}
								placeholder="Delta Airlines"
							/>
						</FormControl>
						<HStack width="100%" spacing={4}>
							<FormControl isRequired>
								<FormLabel>Departure Airport</FormLabel>
								<Select
									name="departureAirport"
									value={flight.departureAirport}
									onChange={handleInputChange}
									placeholder="Select departure airport"
								>
									{airports.map((airport) => (
										<option key={airport.code} value={airport.code}>
											{airport.name} ({airport.code})
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel>Departure Runway</FormLabel>
								<Select
									name="departureRunway"
									value={flight.departureRunway}
									onChange={handleInputChange}
									placeholder="Select departure runway"
								>
									{departureRunways.map((runway) => (
										<option key={runway} value={runway}>
											{runway}
										</option>
									))}
								</Select>
							</FormControl>
						</HStack>
						<HStack width="100%" spacing={4}>
							<FormControl isRequired>
								<FormLabel>Departure Date</FormLabel>
								<Input
									name="departureDate"
									type="date"
									value={flight.departureDate}
									onChange={handleInputChange}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Departure Time</FormLabel>
								<Input
									name="departureTime"
									type="time"
									value={flight.departureTime}
									onChange={handleInputChange}
								/>
							</FormControl>
						</HStack>
					</VStack>
					<VStack align="start" spacing={4}>
						<HStack width="100%" spacing={4}>
							<FormControl isRequired>
								<FormLabel>Arrival Airport</FormLabel>
								<Select
									name="arrivalAirport"
									value={flight.arrivalAirport}
									onChange={handleInputChange}
									placeholder="Select arrival airport"
								>
									{airports.map((airport) => (
										<option key={airport.code} value={airport.code}>
											{airport.name} ({airport.code})
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel>Arrival Runway</FormLabel>
								<Select
									name="arrivalRunway"
									value={flight.arrivalRunway}
									onChange={handleInputChange}
									placeholder="Select arrival runway"
								>
									{arrivalRunways.map((runway) => (
										<option key={runway} value={runway}>
											{runway}
										</option>
									))}
								</Select>
							</FormControl>
						</HStack>
						<HStack width="100%" spacing={4}>
							<FormControl isRequired>
								<FormLabel>Arrival Date</FormLabel>
								<Input
									name="arrivalDate"
									type="date"
									value={flight.arrivalDate}
									onChange={handleInputChange}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Arrival Time</FormLabel>
								<Input
									name="arrivalTime"
									type="time"
									value={flight.arrivalTime}
									onChange={handleInputChange}
								/>
							</FormControl>
						</HStack>
						<FormControl>
							<FormLabel>Gate</FormLabel>
							<Input
								name="gate"
								value={flight.gate}
								onChange={handleInputChange}
								placeholder="B23"
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Terminal</FormLabel>
							<Input
								name="terminal"
								value={flight.terminal}
								onChange={handleInputChange}
								placeholder="4"
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Delay (minutes)</FormLabel>
							<Input
								name="delay"
								type="number"
								value={flight.delay}
								onChange={handleInputChange}
								placeholder="0"
							/>
						</FormControl>
					</VStack>
				</SimpleGrid>

				<VStack align="start" spacing={4} mt={5}>
					<Heading size="md">Passengers</Heading>
					<SimpleGrid columns={4} spacing={4} width="100%">
						<Input
							placeholder="Passenger ID"
							name="id"
							value={passenger.id}
							onChange={handlePassengerInputChange}
						/>
						<Input
							placeholder="Name"
							name="name"
							value={passenger.name}
							onChange={handlePassengerInputChange}
						/>
						<Input
							placeholder="Email"
							name="email"
							value={passenger.email}
							onChange={handlePassengerInputChange}
						/>
						<Input
							placeholder="Phone"
							name="phone"
							value={passenger.phone}
							onChange={handlePassengerInputChange}
						/>
					</SimpleGrid>
					<Button leftIcon={<AddIcon />} onClick={addPassenger}>
						Add Passenger
					</Button>

					{flight.passengers.map((p, index) => (
						<Box
							key={p.id}
							p={2}
							borderWidth={1}
							borderRadius="md"
							width="100%"
						>
							<Text>
								{index + 1}. {p.name} ({p.id}) - {p.email} - {p.phone}
								<IconButton
									icon={<DeleteIcon />}
									size="sm"
									ml={2}
									onClick={() => removePassenger(p.id)}
									aria-label="Remove passenger"
								/>
							</Text>
						</Box>
					))}
				</VStack>

				<Button mt={5} colorScheme="blue" type="submit">
					{type === "create" ? "Create Flight" : "Update Flight"}
				</Button>
			</form>
		</Box>
	);
};

export default Dashboard;
