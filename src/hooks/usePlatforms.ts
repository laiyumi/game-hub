import useData from "./useData";

interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePatforms = ()=> useData<Platform>("/platforms/lists/parents");

export default usePatforms;