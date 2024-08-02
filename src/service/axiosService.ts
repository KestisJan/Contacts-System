import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8090/api/'

const handleError = (err: any) => {
    console.error('Request failed: ', err);
    throw err;
}

export default {
    async fetchData (endpoint: string, params?: { [key: string]: any }) {
        try {
            const response = await axios.get(endpoint, { params });

            if (response) {
                const data = response.data
                
                return data
            } else {
                throw new Error('No data found in the response');
            }

        } catch (err: any) {
            handleError(err);
            throw err;
        }
    } 
}