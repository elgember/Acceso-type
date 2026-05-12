import { createContext, useContext, useState } from "react"
import { githubSearch } from "@/Services/githubService";
import { User } from "@/interfaces/user_interface";

interface SearchContextProps {
    results: User[];
    loading: boolean;
    search: (query: string) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

        const search = async (query: string) => {
            if(!query.trim()) return;
            try {
                setLoading(true);
                const data = await githubSearch(query);
                setResults(data);
            } catch (error) {
                console.error('Error al buscar en GitHub:', error);
            } finally {
                setLoading(false);
            }
        }

    return (
        <SearchContext.Provider value={{ results, loading, search }}>
            {children}
        </SearchContext.Provider>
    );  
}

    export const useSearch = () => {
        const context = useContext(SearchContext);
        if (!context) throw new Error('userSearch debe usarse adentro');
        return context;
    }