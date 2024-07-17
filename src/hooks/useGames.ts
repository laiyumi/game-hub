// Custom hook to fetch games from the API

import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
    id: number;
    name: string;
  }

interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
// set up the state variables for game object and error messages
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  // fetch the data from the API
  useEffect(() => {
    // handle cancellation
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)});
    
    // cleanup function
    return () => controller.abort();
  }, []);

  return {games, error}
}

export default useGames;