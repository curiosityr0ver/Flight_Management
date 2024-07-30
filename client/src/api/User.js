import axios from 'axios';


const login = async (user) => {
    try {
        const response = await axios.post("http://localhost:3000/user/login", user);
        return response.data;
    } catch (error) {
        console.error("There was an error logging in!", error);
    }
};

const register = async (user) => {
    console.log("register");
    try {
        const response = await axios.post("http://localhost:3000/user/register", user);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("There was an error registering!", error);
    }
};

export {
    login,
    register
};