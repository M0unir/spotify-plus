import axios from 'axios';
import logger from './logger';
import { toast } from 'react-toastify';

/**
 * Axios Global Error Handling using interceptors
 */
axios.interceptors.response.use(null, error => {
    const ExpectedError =
        error.response &&
        error.response.status &&
        error.response.status >= 400 &&
        error.response.status < 500;

    // If Unexpected Errors (Shouldn't Happen under normal ciscumstances: Network Down, Server, DB down, Backend Bug,..)
    // => Log Them
    // => Dislay generic/friendly error message
    if (!ExpectedError) {
        // alert('Unexpected error: ', error);
        logger.log(error);
        toast.error(`An Unexpected Error occured. ${error}`)
    }

    // If Expected Errors (Client Errors => 404: not found, 400: Bad Request)
    // => Display Specific Errors (Post not found etc..)
    // Handle Expected errors in Component
    logger.log(error);
    console.log(error.response)
    // toast.error(<div>Couldn't reach {error.response.request.responseURL} .<br />Status:  {error.response.data.error.status}.<br />Reason: {error.response.data.error.message}</div>);


    return Promise.reject(error);
});

/**
 *  Setting up Axios Default URL & Request Headers
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Content-Type'] = 'application/json';
const setAccessToken = (accessToken) => axios.defaults.headers['Authorization'] = `Bearer ${accessToken}` // Set accessToken Function

const http = {
    get: axios.get,
    setAccessToken
}

export default http;