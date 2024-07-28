import axios from 'axios';




const getFlights = async () => {
    try {
        const response = await axios.get("http://localhost:3000/flights");
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the flight data!", error);
    }
};

const getFlightById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/flights/${id}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the flight data!", error);
    }
};

const createFlight = async (flight) => {
    try {
        const response = await axios.post("http://localhost:3000/flights", flight);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the flight!", error);
    }
};

const updateFlight = async (flight) => {
    try {
        const response = await axios.put(`http://localhost:3000/flights/${flight.id}`, flight);
        return response.data;
    } catch (error) {
        console.error("There was an error updating the flight!", error);
    }
};



const getAirports = async () => {
    try {
        const response = await axios.get("http://localhost:3000/config");
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the airport data!", error);
    }
};

export {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    getAirports
};