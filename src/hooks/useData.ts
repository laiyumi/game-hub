import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T>{
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?:AxiosRequestConfig, deps?: any[]) =>{
    // set up the state variables for game object and error messages
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] =useState(false);

    // fetch the data from the API
    useEffect(() => {
    // handle cancellation
    const controller = new AbortController();

    setLoading(true);

    apiClient
        .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
        .then((res) => {
            setData(res.data.results);
        setLoading(false);
    })
        .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
    });
    
    // cleanup function
    return () => controller.abort();
    }, deps?[...deps]:[]);

    return {data, error, loading};
}

export default useData;