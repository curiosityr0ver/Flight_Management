import React, { useMemo } from "react";
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Select,
	Button,
	Flex,
	Heading,
	Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTable, useSortBy } from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { format, addMinutes } from "date-fns";
import "./FlightTable.css";

const FlightTable = ({ flights, airports, filters, setFilters }) => {
	const { airport, direction, date, search } = filters;

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

	const data = useMemo(() => {
		return flights;
	}, [flights]);

	const columns = useMemo(
		() => [
			{
				Header: "Flight Number",
				accessor: "flightNumber",
			},
			{
				Header: "Airline",
				accessor: "airline",
			},
			{
				Header: "Departure Airport",
				accessor: "departureAirport",
			},
			{
				Header: "Arrival Airport",
				accessor: "arrivalAirport",
			},
			{
				Header: "Departure Time",
				accessor: "departureTime",
				Cell: ({ value, row }) => {
					const delayedTime = addMinutes(new Date(value), row.original.delay);
					return format(delayedTime, "do MMM, h:mm a");
				},
			},
			{
				Header: "Arrival Time",
				accessor: "arrivalTime",
				Cell: ({ value, row }) => {
					const delayedTime = addMinutes(new Date(value), row.original.delay);
					return format(delayedTime, "do MMM, h:mm a");
				},
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ value, row }) => {
					const delay = row.original.delay;
					return delay > 0
						? `${
								value.charAt(0).toUpperCase() + value.slice(1)
						  } (Delayed by ${delay} mins)`
						: value.charAt(0).toUpperCase() + value.slice(1);
				},
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state: { sortBy },
	} = useTable({ columns, data }, useSortBy);

	const uniqueAirports = useMemo(() => {
		return airports.map((airport) => airport.code);
	}, [airports]);

	const getSortIcon = (column) => {
		const isSorted = column.isSorted;
		const isSortedDesc = column.isSortedDesc;

		if (!isSorted) {
			return <FaSort />;
		} else if (isSortedDesc) {
			return <FaSortDown />;
		} else {
			return <FaSortUp />;
		}
	};

	return (
		<Box
			className="flight-table-container"
			p={4}
			boxShadow="lg"
			borderRadius="lg"
			bg="white"
		>
			<Heading as="h2" size="lg" mb={4} textAlign="center">
				Flight Information
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
			</Flex>
			<Box overflowX="auto">
				<Table
					{...getTableProps()}
					className="flight-table"
					variant="striped"
					colorScheme="gray"
				>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<Th {...column.getHeaderProps(column.getSortByToggleProps())}>
										<Flex align="center">
											{column.render("Header")}
											<Box as="span" ml={2}>
												{getSortIcon(column)}
											</Box>
										</Flex>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<Tr {...row.getRowProps()} className={row.original.status}>
									{row.cells.map((cell) => (
										<Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
									))}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default FlightTable;
