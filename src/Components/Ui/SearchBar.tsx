import { useSearch } from "@/Context/SearchContext"
import React, { useState } from "react"

export const SearchBar = () => {
    const [val, setVal] = useState('');

    const {search, loading} = useSearch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search(val);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Buscar usuario en gitHib" />
            <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
        </form>
    )
}