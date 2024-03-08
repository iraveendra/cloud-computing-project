import axios from "axios";
import properties from "../config.json" assert { type: 'json' }
const uri = `${properties.http}${properties.hue.bridgeip}${properties.hue.path}`;
const uriWithAuth = `${uri}${properties.hue.username}`;

const handleAxiosError = (res, error) => {
    if (error.response) {
        const { status, data } = error.response;
        res.status(status).json(data);
    } else {
        res.status(500).json({ message: error.message });
    }
};

const getLights = async (req, res) => {
    try {
        const url = `${uriWithAuth}/lights`;
        axios({
            method: 'get',
            url: url,
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLight = async (req, res) => {
    try {
        const url = `${uriWithAuth}/lights/${Number(req.params.id)}`;
        console.log(url);
        axios({
            method: 'get',
            url: url,
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putLight = async (req, res) => {
    try {
        let url = `${uriWithAuth}/lights/${req.params.id}/state`; 
        let data;
        if (req.params.state == 'state') {
            data = req.body
        } else {
            let state = req.params.state == 'on' ? true : false;
            data = {
                "on": state
            }
        }
        axios({
            method: 'put',
            url: url,
            data: data,
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const adjustLight = async (req, res) => {
    try {
        const url = `${uriWithAuth}/lights/${req.params.id}/state`; 
        const data = {
            "on": true,
            "bri": Number(req.params.bri),
            "sat": Number(req.params.sat),
            "hue": Number(req.params.hue)
        }
        axios({
            method: 'put',
            url: url,
            data: data,
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const apiNewDeveloper = async (req, res) => {
    try {
        axios({
            method:'get',
            url: `${uri}newdeveloper`,
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerApp = async (req, res) => {
    try {
        axios({
            method:'post',
            url: uri,
            data: {
                devicetype: properties.devicetype
            },
            timeout: 5000
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            handleAxiosError(res, error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const test = async (req, res) => {
    try {
        var response = {
            status: "success",
            message: "Hello from Philips"
        }
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { test, apiNewDeveloper, registerApp, getLight, getLights, putLight, adjustLight }
