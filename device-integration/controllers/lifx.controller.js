import axios from "axios";
import properties from "../config.json" assert { type: 'json' };

const authToken = properties.lifx.token;
const apiUrl = "https://api.lifx.com/v1/lights";

// Define global headers
const headers = {
    "Authorization": `Bearer ${authToken}`
};

const axiosInstance = axios.create({
    timeout: 5000, // Set a timeout of 5 seconds
    headers: headers // Attach headers to the instance
});

const handleAxiosError = (res, error) => {
    if (error.response) {
        const { status, data } = error.response;
        res.status(status).json(data);
    } else {
        res.status(500).json({ message: error.message });
    }
};

const test = async (req, res) => {
    try {
        const response = {
            status: "success",
            message: "Hello from LIFX"
        };
        res.send(response);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const auth = async (req, res) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/all`);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const getLights = async (req, res) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/all`);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const getLight = async (req, res) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/${req.params.id}`);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const setLightStateById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const response = await axiosInstance.put(`${apiUrl}/id:${id}/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const powerOffAllLights = async (req, res) => {
    try {
        const payload = {
            "power": "off"
        };
        const response = await axiosInstance.put(`${apiUrl}/all/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const powerOnAllLights = async (req, res) => {
    try {
        const payload = {
            "power": "on"
        };
        const response = await axiosInstance.put(`${apiUrl}/all/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const setBrightnessById = async (req, res) => {
    try {
        const id = req.params.id;
        const brightness = req.body.brightness;
        const payload = {
            "brightness": brightness
        };
        const response = await axiosInstance.put(`${apiUrl}/id:${id}/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const setColorById = async (req, res) => {
    try {
        const id = req.params.id;
        const color = req.body.color;
        const payload = {
            "color": color
        };
        const response = await axiosInstance.put(`${apiUrl}/id:${id}/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const turnOnById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = {
            "power": "on"
        };
        const response = await axiosInstance.put(`${apiUrl}/id:${id}/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

const turnOffById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = {
            "power": "off"
        };
        const response = await axiosInstance.put(`${apiUrl}/id:${id}/state`, payload);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(res, error);
    }
};

export { 
    test, 
    auth, 
    getLights, 
    getLight, 
    setLightStateById, 
    powerOffAllLights, 
    powerOnAllLights, 
    setBrightnessById, 
    setColorById, 
    turnOnById, 
    turnOffById 
};
