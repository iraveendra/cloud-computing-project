import axios from "axios";
import properties from "../config.json" assert { type: 'json' };

const authToken = properties.lifx.token;
const apiUrl = "https://api.lifx.com/v1/lights";

const test = async (req, res) => {
    try {
        const response = {
            code: 1,
            msg: "Hello from LIFX"
        };
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const auth = async (req, res) => {
    try {
        const token = authToken;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${apiUrl}/all`, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLights = async (req, res) => {
    try {
        const token = authToken;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${apiUrl}/all`, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLight = async (req, res) => {
    try {
        const token = authToken;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${apiUrl}/${req.params.id}`, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setLightStateById = async (req, res) => {
    try {
        const token = authToken;
        const id = req.params.id;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = req.body;
        const response = await axios.put(`${apiUrl}/id:${id}/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const powerOffAllLights = async (req, res) => {
    try {
        const token = authToken;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "power": "off"
        };
        const response = await axios.put(`${apiUrl}/all/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const powerOnAllLights = async (req, res) => {
    try {
        const token = authToken;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "power": "on"
        };
        const response = await axios.put(`${apiUrl}/all/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setBrightnessById = async (req, res) => {
    try {
        const token = authToken;
        const id = req.params.id;
        const brightness = req.body.brightness;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "brightness": brightness
        };
        const response = await axios.put(`${apiUrl}/id:${id}/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setColorById = async (req, res) => {
    try {
        const token = authToken;
        const id = req.params.id;
        const color = req.body.color;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "color": color
        };
        const response = await axios.put(`${apiUrl}/id:${id}/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const turnOnById = async (req, res) => {
    try {
        const token = authToken;
        const id = req.params.id;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "power": "on"
        };
        const response = await axios.put(`${apiUrl}/id:${id}/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const turnOffById = async (req, res) => {
    try {
        const token = authToken;
        const id = req.params.id;
        const headers = {
            "Authorization": `Bearer ${token}`
        };
        const payload = {
            "power": "off"
        };
        const response = await axios.put(`${apiUrl}/id:${id}/state`, payload, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
