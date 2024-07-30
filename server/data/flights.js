const flights = [
  {
    id: "FL1234",
    flightNumber: "DL123",
    airline: "Delta Airlines",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "2024-07-26T10:00:00Z",
    arrivalTime: "2024-07-26T13:00:00Z",
    departureRunway: "4L",
    arrivalRunway: "25R",
    gate: "B23",
    terminal: "4",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P123",
        name: "John Doe",
        email: "2041013063.ishumehta@gmail.com",
        phone: "123-456-7890"
      },
      {
        id: "P124",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "123-456-7891"
      }
    ]
  },
  {
    id: "FL5678",
    flightNumber: "AA456",
    airline: "American Airlines",
    departureAirport: "LAX",
    arrivalAirport: "ORD",
    departureTime: "2024-07-26T12:00:00Z",
    arrivalTime: "2024-07-26T17:00:00Z",
    departureRunway: "25L",
    arrivalRunway: "10C",
    gate: "C11",
    terminal: "5",
    delay: 0,
    status: "cancelled",
    passengers: [
      {
        id: "P125",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "123-456-7892"
      },
      {
        id: "P126",
        name: "Bob Brown",
        email: "bob.brown@example.com",
        phone: "123-456-7893"
      }
    ]
  },
  {
    id: "FL9101",
    flightNumber: "UA789",
    airline: "United Airlines",
    departureAirport: "ORD",
    arrivalAirport: "MIA",
    departureTime: "2024-07-26T14:00:00Z",
    arrivalTime: "2024-07-26T19:00:00Z",
    departureRunway: "22R",
    arrivalRunway: "09",
    gate: "D4",
    terminal: "1",
    delay: 30,
    status: "delayed",
    passengers: [
      {
        id: "P127",
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        phone: "123-456-7894"
      },
      {
        id: "P128",
        name: "Dana White",
        email: "dana.white@example.com",
        phone: "123-456-7895"
      }
    ]
  },
  {
    id: "FL1123",
    flightNumber: "SW123",
    airline: "Southwest Airlines",
    departureAirport: "MIA",
    arrivalAirport: "DFW",
    departureTime: "2024-07-26T16:00:00Z",
    arrivalTime: "2024-07-26T21:00:00Z",
    departureRunway: "12",
    arrivalRunway: "17C",
    gate: "E20",
    terminal: "G",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P129",
        name: "Evan Harris",
        email: "evan.harris@example.com",
        phone: "123-456-7896"
      },
      {
        id: "P130",
        name: "Fiona Clark",
        email: "fiona.clark@example.com",
        phone: "123-456-7897"
      }
    ]
  },
  {
    id: "FL1345",
    flightNumber: "JB123",
    airline: "JetBlue Airways",
    departureAirport: "DFW",
    arrivalAirport: "ATL",
    departureTime: "2024-07-26T18:00:00Z",
    arrivalTime: "2024-07-26T23:00:00Z",
    departureRunway: "18L",
    arrivalRunway: "09R",
    gate: "F5",
    terminal: "A",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P131",
        name: "George Lewis",
        email: "george.lewis@example.com",
        phone: "123-456-7898"
      },
      {
        id: "P132",
        name: "Hannah Walker",
        email: "hannah.walker@example.com",
        phone: "123-456-7899"
      }
    ]
  },
  {
    id: "FL1456",
    flightNumber: "NK123",
    airline: "Spirit Airlines",
    departureAirport: "ATL",
    arrivalAirport: "JFK",
    departureTime: "2024-07-26T20:00:00Z",
    arrivalTime: "2024-07-27T01:00:00Z",
    departureRunway: "08L",
    arrivalRunway: "22R",
    gate: "G10",
    terminal: "N",
    delay: 15,
    status: "delayed",
    passengers: [
      {
        id: "P133",
        name: "Ian Scott",
        email: "ian.scott@example.com",
        phone: "123-456-7900"
      },
      {
        id: "P134",
        name: "Jessica Baker",
        email: "jessica.baker@example.com",
        phone: "123-456-7901"
      }
    ]
  },
  {
    id: "FL1678",
    flightNumber: "AS123",
    airline: "Alaska Airlines",
    departureAirport: "SEA",
    arrivalAirport: "SFO",
    departureTime: "2024-07-27T08:00:00Z",
    arrivalTime: "2024-07-27T10:00:00Z",
    departureRunway: "16L",
    arrivalRunway: "28L",
    gate: "A1",
    terminal: "B",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P135",
        name: "Kyle Murphy",
        email: "kyle.murphy@example.com",
        phone: "123-456-7902"
      },
      {
        id: "P136",
        name: "Laura King",
        email: "laura.king@example.com",
        phone: "123-456-7903"
      }
    ]
  },
  {
    id: "FL1789",
    flightNumber: "F913",
    airline: "Frontier Airlines",
    departureAirport: "DEN",
    arrivalAirport: "MCO",
    departureTime: "2024-07-27T09:00:00Z",
    arrivalTime: "2024-07-27T14:00:00Z",
    departureRunway: "17R",
    arrivalRunway: "18L",
    gate: "C3",
    terminal: "D",
    delay: 0,
    status: "cancelled",
    passengers: [
      {
        id: "P137",
        name: "Matthew Young",
        email: "matthew.young@example.com",
        phone: "123-456-7904"
      },
      {
        id: "P138",
        name: "Natalie Hill",
        email: "natalie.hill@example.com",
        phone: "123-456-7905"
      }
    ]
  },
  {
    id: "FL1890",
    flightNumber: "HA123",
    airline: "Hawaiian Airlines",
    departureAirport: "HNL",
    arrivalAirport: "LAX",
    departureTime: "2024-07-27T12:00:00Z",
    arrivalTime: "2024-07-27T18:00:00Z",
    departureRunway: "08R",
    arrivalRunway: "24R",
    gate: "B12",
    terminal: "2",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P139",
        name: "Oliver Wright",
        email: "oliver.wright@example.com",
        phone: "123-456-7906"
      },
      {
        id: "P140",
        name: "Penelope Martin",
        email: "penelope.martin@example.com",
        phone: "123-456-7907"
      }
    ]
  },
  {
    id: "FL1901",
    flightNumber: "SW132",
    airline: "Southwest Airlines",
    departureAirport: "DAL",
    arrivalAirport: "PHX",
    departureTime: "2024-07-27T15:00:00Z",
    arrivalTime: "2024-07-27T16:30:00Z",
    departureRunway: "13R",
    arrivalRunway: "26",
    gate: "E4",
    terminal: "1",
    delay: 10,
    status: "delayed",
    passengers: [
      {
        id: "P141",
        name: "Quinn Torres",
        email: "quinn.torres@example.com",
        phone: "123-456-7908"
      },
      {
        id: "P142",
        name: "Rachel Reed",
        email: "rachel.reed@example.com",
        phone: "123-456-7909"
      }
    ]
  },
  {
    id: "FL2002",
    flightNumber: "G4133",
    airline: "Allegiant Air",
    departureAirport: "LAX",
    arrivalAirport: "DEN",
    departureTime: "2024-07-27T17:00:00Z",
    arrivalTime: "2024-07-27T21:00:00Z",
    departureRunway: "7R",
    arrivalRunway: "17R",
    gate: "D8",
    terminal: "3",
    delay: 0,
    status: "cancelled",
    passengers: [
      {
        id: "P143",
        name: "Sam Rogers",
        email: "mehta.ishu14@gmail.com",
        phone: "123-456-7910"
      },
      {
        id: "P144",
        name: "Taylor Moore",
        email: "ishu@cuvette.tech",
        phone: "123-456-7911"
      }
    ]
  },
  {
    id: "FL2113",
    flightNumber: "SY134",
    airline: "Sun Country Airlines",
    departureAirport: "MSP",
    arrivalAirport: "TPA",
    departureTime: "2024-07-27T19:00:00Z",
    arrivalTime: "2024-07-28T00:00:00Z",
    departureRunway: "12L",
    arrivalRunway: "19R",
    gate: "H7",
    terminal: "E",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P145",
        name: "Uma Patel",
        email: "uma.patel@example.com",
        phone: "123-456-7912"
      },
      {
        id: "P146",
        name: "Victor Collins",
        email: "victor.collins@example.com",
        phone: "123-456-7913"
      }
    ]
  },
  {
    id: "FL2224",
    flightNumber: "AC135",
    airline: "Air Canada",
    departureAirport: "YYZ",
    arrivalAirport: "YVR",
    departureTime: "2024-07-27T20:00:00Z",
    arrivalTime: "2024-07-28T23:00:00Z",
    departureRunway: "23",
    arrivalRunway: "26R",
    gate: "F10",
    terminal: "1",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P147",
        name: "Willie Allen",
        email: "willie.allen@example.com",
        phone: "123-456-7914"
      },
      {
        id: "P148",
        name: "Xena Edwards",
        email: "xena.edwards@example.com",
        phone: "123-456-7915"
      }
    ]
  },
  {
    id: "FL2335",
    flightNumber: "WS136",
    airline: "WestJet",
    departureAirport: "YYC",
    arrivalAirport: "LAX",
    departureTime: "2024-07-27T21:00:00Z",
    arrivalTime: "2024-07-28T23:59:00Z",
    departureRunway: "17L",
    arrivalRunway: "25L",
    gate: "B5",
    terminal: "A",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P149",
        name: "Yasmin Griffin",
        email: "yasmin.griffin@example.com",
        phone: "123-456-7916"
      },
      {
        id: "P150",
        name: "Zachary Bennett",
        email: "zachary.bennett@example.com",
        phone: "123-456-7917"
      }
    ]
  },
  {
    id: "FL2446",
    flightNumber: "QF137",
    airline: "Qantas",
    departureAirport: "SYD",
    arrivalAirport: "LAX",
    departureTime: "2024-07-28T08:00:00Z",
    arrivalTime: "2024-07-28T16:00:00Z",
    departureRunway: "34L",
    arrivalRunway: "24R",
    gate: "G20",
    terminal: "2",
    delay: 45,
    status: "delayed",
    passengers: [
      {
        id: "P151",
        name: "Amy Martinez",
        email: "amy.martinez@example.com",
        phone: "123-456-7918"
      },
      {
        id: "P152",
        name: "Brian Scott",
        email: "brian.scott@example.com",
        phone: "123-456-7919"
      }
    ]
  },
  {
    id: "FL2557",
    flightNumber: "BA138",
    airline: "British Airways",
    departureAirport: "LHR",
    arrivalAirport: "JFK",
    departureTime: "2024-07-28T10:00:00Z",
    arrivalTime: "2024-07-28T13:00:00Z",
    departureRunway: "27R",
    arrivalRunway: "22L",
    gate: "B15",
    terminal: "5",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P153",
        name: "Catherine Lee",
        email: "catherine.lee@example.com",
        phone: "123-456-7920"
      },
      {
        id: "P154",
        name: "David Harris",
        email: "david.harris@example.com",
        phone: "123-456-7921"
      }
    ]
  }
];

module.exports = flights;