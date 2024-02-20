import axios from "axios";

const getAllArguments = () => {
    return axios.get(`/getArguments`);
}

const findArgumentsInText = (text) => {
    return axios.post('/findArgumentsInText', {
        text
    });
}

const generateTextResponse = (argumentsIds) => {
    return axios.post('/generateResponse', {
        argumentsIds
    });
}

const getPlaylistByLink = (link) => {
    return axios.get(`/getPlaylistByLink/${link}`);
}

export { getAllArguments, findArgumentsInText, generateTextResponse, getPlaylistByLink }
