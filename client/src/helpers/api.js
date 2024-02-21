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

const togglePlaylistWithText = (id, withText) => {
    return axios.post(`/toggleWithText`, {
        id, withText
    });
}

const updatePlaylist = (id, recipientName, link) => {
    return axios.post(`/updatePlaylist`, {
        id, recipientName,
        link: link.split('/').slice(-1)[0]
    });
}

const getFullTextResponse = (argumentsIds) => {
    return axios.post('/getFullResponse', {
        argumentsIds
    });
}

export { getAllArguments, findArgumentsInText, generateTextResponse,
    getPlaylistByLink, togglePlaylistWithText, updatePlaylist, getFullTextResponse }
