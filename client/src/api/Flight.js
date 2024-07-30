import axios from 'axios';

const env = process.env.NODE_ENV || 'development';

const BASE_URL = env === 'development' ? 'http://localhost:3000' : '';

const getFlights = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/flights`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the flight data!", error);
    }
};

const getFlightById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/flights/${id}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the flight data!", error);
    }
};

const createFlight = async (flight) => {
    try {
        const response = await axios.post(`${BASE_URL}/flights`, flight);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the flight!", error);
    }
};

const updateFlight = async (flightID, flight) => {
    try {
        const response = await axios.put(`${BASE_URL}/flights/${flightID}`, flight);
        if (response.data.status === 400) {
            return { error: response.data.error };
        } else {
            return response.data;
        }

    } catch (error) {
        console.error("There was an error updating the flight!", error);
        return { error: error.response.data.error };
    }
};



const getAirports = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/config`);
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