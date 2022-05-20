import axios from "axios";
import { BASE_URL } from "../constants";

const httpClient = axios.create({
    baseURL : `${BASE_URL}`,
})

export function setDefaultHeader(token, value) {
    httpClient.defaults.headers.common['Authorization'] = `Basic ${value}`;
    httpClient.defaults.headers.common[token] = `Basic ${value}`;
  }


