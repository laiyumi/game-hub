
import genres from "../data/genres";

export interface Genre{
    id: number;
    name: string;
    image_background: string;
}

// use static data 
const useGenres = () => ({data: genres, loading: false, error: null});


export default useGenres;