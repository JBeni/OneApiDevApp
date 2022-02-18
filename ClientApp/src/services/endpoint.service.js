import { APIEndpoint } from './ApiConfiguration';
import { notifyToastError } from './helper.service';
const axios = require("axios");

const apiUrl = `${APIEndpoint.apiUrl}`;

export async function getBooksData() {
    return axios.get(`${apiUrl}/books`)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data?.title + ' ' + error.response.data?.detail);
    });
}

export async function getBookChapters(bookId) {
    return axios.get(`${apiUrl}/book/chapters?bookId=${bookId}`)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data?.title + ' ' + error.response.data?.detail);
    });
}
