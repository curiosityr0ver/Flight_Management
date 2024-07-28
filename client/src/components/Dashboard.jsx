// Dashboard.js
import React, { useState } from "react";
import {
	Button,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Select,
} from "@chakra-ui/react";
import { getFlightById, updateFlight, createFlight } from "../api/Flight";

const Dashboard = () => {
	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onClose: onCreateClose,
	} = useDisclosure();
	const {
		isOpen: isUpdateOpen,
		onOpen: onUpdateOpen,
		onClose: onUpdateClose,
	} = useDisclosure();
	const [flightId, setFlightId] = useState("");
	const [flightDetails, setFlightDetails] = useState({
		flightNumber: "",
		airline: "",
		departureAirport: "",
		arrivalAirport: "",
		departureTime: "",
		arrivalTime: "",
		departureRunway: "",
		arrivalRunway: "",
		gate: "",
		terminal: "",
		delay: 0,
		status: "on-time",
	});

	const handleCreateFlight = async () => {
		try {
			await createFlight(flightDetails);
			onCreateClose();
			alert("Flight created successfully!");
		} catch (error) {
			console.error("Error creating flight:", error);
			alert("Failed to create flight.");
		}
	};

	const handleUpdateFlight = async () => {
		try {
			await updateFlight(flightId, flightDetails);
			onUpdateClose();
			alert("Flight updated successfully!");
		} catch (error) {
			console.error("Error updating flight:", error);
			alert("Failed to update flight.");
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFlightDetails({
			...flightDetails,
			[name]: value,
		});
	};

	return (
		<Box p={5}>
			<Button colorScheme="blue" onClick={onCreateOpen}>
				Create Flight
			</Button>
			<Button colorScheme="green" ml={4} onClick={onUpdateOpen}>
				Update Flight
			</Button>

			{/* Create Flight Modal */}
			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Flight</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{[
							{ label: "Flight Number", name: "flightNumber" },
							{ label: "Airline", name: "airline" },
							{ label: "Departure Airport", name: "departureAirport" },
							{ label: "Arrival Airport", name: "arrivalAirport" },
							{
								label: "Departure Time",
								name: "departureTime",
								type: "datetime-local",
							},
							{
								label: "Arrival Time",
								name: "arrivalTime",
								type: "datetime-local",
							},
							{ label: "Departure Runway", name: "departureRunway" },
							{ label: "Arrival Runway", name: "arrivalRunway" },
							{ label: "Gate", name: "gate" },
							{ label: "Terminal", name: "terminal" },
							{ label: "Delay", name: "delay", type: "number" },
							{
								label: "Status",
								name: "status",
								type: "select",
								options: ["on-time", "delayed", "cancelled"],
							},
						].map((field) => (
							<FormControl key={field.name} mt={4}>
								<FormLabel>{field.label}</FormLabel>
								{field.type === "select" ? (
									<Select
										name={field.name}
										onChange={handleInputChange}
										value={flightDetails[field.name]}
									>
										{field.options.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</Select>
								) : (
									<Input
										placeholder={field.label}
										name={field.name}
										type={field.type || "text"}
										onChange={handleInputChange}
										value={flightDetails[field.name]}
									/>
								)}
							</FormControl>
						))}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleCreateFlight}>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Update Flight Modal */}
			<Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Flight</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Flight ID</FormLabel>
							<Input
								placeholder="Flight ID"
								value={flightId}
								onChange={(e) => setFlightId(e.target.value)}
							/>
						</FormControl>
						{[
							{ label: "Flight Number", name: "flightNumber" },
							{ label: "Airline", name: "airline" },
							{ label: "Departure Airport", name: "departureAirport" },
							{ label: "Arrival Airport", name: "arrivalAirport" },
							{
								label: "Departure Time",
								name: "departureTime",
								type: "datetime-local",
							},
							{
								label: "Arrival Time",
								name: "arrivalTime",
								type: "datetime-local",
							},
							{ label: "Departure Runway", name: "departureRunway" },
							{ label: "Arrival Runway", name: "arrivalRunway" },
							{ label: "Gate", name: "gate" },
							{ label: "Terminal", name: "terminal" },
							{ label: "Delay", name: "delay", type: "number" },
							{
								label: "Status",
								name: "status",
								type: "select",
								options: ["on-time", "delayed", "cancelled"],
							},
						].map((field) => (
							<FormControl key={field.name} mt={4}>
								<FormLabel>{field.label}</FormLabel>
								{field.type === "select" ? (
									<Select
										name={field.name}
										onChange={handleInputChange}
										value={flightDetails[field.name]}
									>
										{field.options.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</Select>
								) : (
									<Input
										placeholder={field.label}
										name={field.name}
										type={field.type || "text"}
										onChange={handleInputChange}
										value={flightDetails[field.name]}
									/>
								)}
							</FormControl>
						))}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="green" onClick={handleUpdateFlight}>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Dashboard;
