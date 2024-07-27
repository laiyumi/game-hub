// A axios instance with custom configuration
import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T>{
    count: number;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'477edb6a79d44d18a87f9677bc282d11'
    }
})

class APIClient<T>{
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig)=>{
        return axiosInstance.get<FetchResponse<T>>(this.endpoint, config)
        .then(res=>res.data)
    }
}

export default APIClient;