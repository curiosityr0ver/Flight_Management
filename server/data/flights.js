const flights = [
  {
    id: "FL1001",
    flightNumber: "AI101",
    airline: "Air India",
    departureAirport: "DEL",
    arrivalAirport: "BOM",
    departureTime: "2024-07-26T06:00:00Z",
    arrivalTime: "2024-07-26T08:00:00Z",
    departureRunway: "09/27",
    arrivalRunway: "09/27",
    gate: "A1",
    terminal: "3",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1001",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "9876543210"
      },
      {
        id: "P1002",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "8765432109"
      }
    ]
  },
  {
    id: "FL1002",
    flightNumber: "6E202",
    airline: "IndiGo",
    departureAirport: "BOM",
    arrivalAirport: "MAA",
    departureTime: "2024-07-26T07:30:00Z",
    arrivalTime: "2024-07-26T09:30:00Z",
    departureRunway: "14/32",
    arrivalRunway: "07/25",
    gate: "B2",
    terminal: "2",
    delay: 15,
    status: "delayed",
    passengers: [
      {
        id: "P1003",
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "7654321098"
      },
      {
        id: "P1004",
        name: "Sneha Reddy",
        email: "sneha.reddy@example.com",
        phone: "6543210987"
      }
    ]
  },
  {
    id: "FL1003",
    flightNumber: "SG303",
    airline: "SpiceJet",
    departureAirport: "MAA",
    arrivalAirport: "BLR",
    departureTime: "2024-07-26T08:00:00Z",
    arrivalTime: "2024-07-26T09:30:00Z",
    departureRunway: "12/30",
    arrivalRunway: "09/27",
    gate: "C3",
    terminal: "1",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1005",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        phone: "5432109876"
      },
      {
        id: "P1006",
        name: "Deepa Menon",
        email: "deepa.menon@example.com",
        phone: "4321098765"
      }
    ]
  },
  {
    id: "FL1004",
    flightNumber: "UK404",
    airline: "Vistara",
    departureAirport: "BLR",
    arrivalAirport: "COK",
    departureTime: "2024-07-26T09:00:00Z",
    arrivalTime: "2024-07-26T10:30:00Z",
    departureRunway: "09R/27L",
    arrivalRunway: "09/27",
    gate: "D4",
    terminal: "2",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1007",
        name: "Arjun Nair",
        email: "arjun.nair@example.com",
        phone: "3210987654"
      },
      {
        id: "P1008",
        name: "Meera Iyer",
        email: "meera.iyer@example.com",
        phone: "2109876543"
      }
    ]
  },
  {
    id: "FL1005",
    flightNumber: "G8505",
    airline: "Go First",
    departureAirport: "COK",
    arrivalAirport: "PNQ",
    departureTime: "2024-07-26T10:00:00Z",
    arrivalTime: "2024-07-26T12:00:00Z",
    departureRunway: "09/27",
    arrivalRunway: "10/28",
    gate: "E5",
    terminal: "1",
    delay: 30,
    status: "delayed",
    passengers: [
      {
        id: "P1009",
        name: "Ravi Desai",
        email: "ravi.desai@example.com",
        phone: "1098765432"
      },
      {
        id: "P1010",
        name: "Anita Saxena",
        email: "anita.saxena@example.com",
        phone: "9876543210"
      }
    ]
  },
  {
    id: "FL1006",
    flightNumber: "I5606",
    airline: "AirAsia India",
    departureAirport: "PNQ",
    arrivalAirport: "DEL",
    departureTime: "2024-07-26T11:00:00Z",
    arrivalTime: "2024-07-26T13:00:00Z",
    departureRunway: "10/28",
    arrivalRunway: "11/29",
    gate: "F6",
    terminal: "3",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1011",
        name: "Suresh Pillai",
        email: "suresh.pillai@example.com",
        phone: "8765432109"
      },
      {
        id: "P1012",
        name: "Kavita Gupta",
        email: "kavita.gupta@example.com",
        phone: "7654321098"
      }
    ]
  },
  {
    id: "FL1007",
    flightNumber: "AI707",
    airline: "Air India",
    departureAirport: "DEL",
    arrivalAirport: "MAA",
    departureTime: "2024-07-26T12:00:00Z",
    arrivalTime: "2024-07-26T14:30:00Z",
    departureRunway: "10/28",
    arrivalRunway: "07/25",
    gate: "A7",
    terminal: "3",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1013",
        name: "Rajesh Khanna",
        email: "rajesh.khanna@example.com",
        phone: "6543210987"
      },
      {
        id: "P1014",
        name: "Sunita Rao",
        email: "sunita.rao@example.com",
        phone: "5432109876"
      }
    ]
  },
  {
    id: "FL1008",
    flightNumber: "6E808",
    airline: "IndiGo",
    departureAirport: "BOM",
    arrivalAirport: "BLR",
    departureTime: "2024-07-26T13:00:00Z",
    arrivalTime: "2024-07-26T14:30:00Z",
    departureRunway: "09/27",
    arrivalRunway: "09/27",
    gate: "B8",
    terminal: "2",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1015",
        name: "Arun Joshi",
        email: "arun.joshi@example.com",
        phone: "4321098765"
      },
      {
        id: "P1016",
        name: "Pooja Mehta",
        email: "pooja.mehta@example.com",
        phone: "3210987654"
      }
    ]
  },
  {
    id: "FL1009",
    flightNumber: "SG909",
    airline: "SpiceJet",
    departureAirport: "COK",
    arrivalAirport: "DEL",
    departureTime: "2024-07-26T14:00:00Z",
    arrivalTime: "2024-07-26T17:00:00Z",
    departureRunway: "09/27",
    arrivalRunway: "09/27",
    gate: "C9",
    terminal: "3",
    delay: 20,
    status: "delayed",
    passengers: [
      {
        id: "P1017",
        name: "Vijay Malhotra",
        email: "vijay.malhotra@example.com",
        phone: "2109876543"
      },
      {
        id: "P1018",
        name: "Neha Sharma",
        email: "neha.sharma@example.com",
        phone: "1098765432"
      }
    ]
  },
  {
    id: "FL1010",
    flightNumber: "UK110",
    airline: "Vistara",
    departureAirport: "PNQ",
    arrivalAirport: "MAA",
    departureTime: "2024-07-26T15:00:00Z",
    arrivalTime: "2024-07-26T17:00:00Z",
    departureRunway: "10/28",
    arrivalRunway: "12/30",
    gate: "D10",
    terminal: "1",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1019",
        name: "Sanjay Kapoor",
        email: "sanjay.kapoor@example.com",
        phone: "9876543210"
      },
      {
        id: "P1020",
        name: "Rashmi Singh",
        email: "rashmi.singh@example.com",
        phone: "8765432109"
      }
    ]
  },
  {
    id: "FL1011",
    flightNumber: "G8211",
    airline: "Go First",
    departureAirport: "BLR",
    arrivalAirport: "BOM",
    departureTime: "2024-07-26T16:00:00Z",
    arrivalTime: "2024-07-26T17:30:00Z",
    departureRunway: "09R/27L",
    arrivalRunway: "14/32",
    gate: "E11",
    terminal: "1",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1021",
        name: "Alok Nath",
        email: "alok.nath@example.com",
        phone: "7654321098"
      },
      {
        id: "P1022",
        name: "Preeti Verma",
        email: "preeti.verma@example.com",
        phone: "6543210987"
      }
    ]
  },
  {
    id: "FL1012",
    flightNumber: "I5312",
    airline: "AirAsia India",
    departureAirport: "MAA",
    arrivalAirport: "COK",
    departureTime: "2024-07-26T17:00:00Z",
    arrivalTime: "2024-07-26T18:30:00Z",
    departureRunway: "07/25",
    arrivalRunway: "09/27",
    gate: "F12",
    terminal: "1",
    delay: 15,
    status: "delayed",
    passengers: [
      {
        id: "P1023",
        name: "Rohit Agarwal",
        email: "rohit.agarwal@example.com",
        phone: "5432109876"
      },
      {
        id: "P1024",
        name: "Anjali Deshmukh",
        email: "anjali.deshmukh@example.com",
        phone: "4321098765"
      }
    ]
  },
  {
    id: "FL1013",
    flightNumber: "AI513",
    airline: "Air India",
    departureAirport: "DEL",
    arrivalAirport: "BLR",
    departureTime: "2024-07-26T18:00:00Z",
    arrivalTime: "2024-07-26T20:30:00Z",
    departureRunway: "11/29",
    arrivalRunway: "09R/27L",
    gate: "A13",
    terminal: "3",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1025",
        name: "Kiran Bedi",
        email: "kiran.bedi@example.com",
        phone: "3210987654"
      },
      {
        id: "P1026",
        name: "Manish Tiwari",
        email: "manish.tiwari@example.com",
        phone: "2109876543"
      }
    ]
  },
  {
    id: "FL1014",
    flightNumber: "6E414",
    airline: "IndiGo",
    departureAirport: "BOM",
    arrivalAirport: "PNQ",
    departureTime: "2024-07-26T19:00:00Z",
    arrivalTime: "2024-07-26T20:00:00Z",
    departureRunway: "14/32",
    arrivalRunway: "10/28",
    gate: "B14",
    terminal: "2",
    delay: 0,
    status: "on-time",
    passengers: [
      {
        id: "P1027",
        name: "Shanti Devi",
        email: "shanti.devi@example.com",
        phone: "1098765432"
      },
      {
        id: "P1028",
        name: "Ramesh Sippy",
        email: "ramesh.sippy@example.com",
        phone: "9876543210"
      }
    ]
  }
];

module.exports = flights;