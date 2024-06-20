import axios from 'axios';
import { axiosConfig } from '../config/axiosConfig.js';

export async function get_dish_ajax () {
    try {
        const response = await axios.get(`/api/dish/`, axiosConfig);
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        return result;

    } catch (error) {
        return null;
    }
}

export async function get_country_code_ajax () {
    try {
        const response = await axios.get(`/api/country_code/`, axiosConfig);
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        return result;

    } catch (error) {
        return null;
    }
}