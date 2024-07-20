import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { Game } from "./useGames";

interface Genre{
    id: number;
    name: string;
}

interface FetchGamesResponse{
    count: number;
    results: Genre[];
}

const useGenres = () =>{
    // set up the state variables for game object and error messages
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] =useState(false);

    // fetch the data from the API
    useEffect(() => {
    // handle cancellation
    const controller = new AbortController();

    setLoading(true);

    apiClient
        .get<FetchGamesResponse>("/genres", { signal: controller.signal })
        .then((res) => {
            setGenres(res.data.results);
        setLoading(false);
    })
        .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
    });
    
    // cleanup function
    return () => controller.abort();
    }, []);

    return {genres, error, loading};
}

export default useGenres;