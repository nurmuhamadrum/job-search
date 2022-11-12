import axios from "axios";

const BASE_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

export const getJobList = async (page) => {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `${BASE_URL}?page=${page}`
            // const url = `${BASE_URL}`
            const response = await axios.get(url);

            if (response?.status === 200) {
                resolve(response?.data)
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(false)
            console.log('error@getJobList', error);
        }
    })
}

export const getDetailJob = async (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
            // const url = `${BASE_URL}`
            const response = await axios.get(url);

            if (response?.status === 200) {
                resolve(response?.data)
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(false)
            console.log('error@getDetailJob', error);
        }
    })
}

export const getJobListSearch = async (description, location) => {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `${BASE_URL}/?description=${description}&location=${location}`
            const response = await axios.get(url);

            if (response?.status === 200) {
                resolve(response?.data)
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(false)
            console.log('error@getJobListSearch', error);
        }
    })
}