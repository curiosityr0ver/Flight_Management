/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Flex,
	Heading,
	Button,
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { format, addMinutes } from "date-fns";
import "./FlightTable.css";

const FlightTable = ({ flights }) => {
	const navigate = useNavigate();
	const data = useMemo(() => flights, [flights]);

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
			{
				Header: "Modify",
				accessor: "id",
				Cell: ({ value }) => (
					<Flex justify="center">
						<Button
							colorScheme="blue"
							size="sm"
							onClick={() => navigate(`/update/${value}`)}
						>
							Update
						</Button>
					</Flex>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

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
			<Box overflowX="auto">
				<Table
					{...getTableProps()}
					className="flight-table"
					variant="striped"
					colorScheme="gray"
				>
					<Thead>
						{headerGroups.map((headerGroup, index) => (
							<Tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<Th
										key={index}
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
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
						{rows.map((row, index) => {
							prepareRow(row);
							return (
								<Tr
									key={index}
									{...row.getRowProps()}
									className={row.original.status}
								>
									{row.cells.map((cell, index) => (
										<Td key={index} {...cell.getCellProps()}>
											{cell.render("Cell")}
										</Td>
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
