import { useSearch } from "@/Context/SearchContext"
import React, { useState } from "react"
import { UserCard } from "./UserCard";

export const SearchBar = () => {
    const [val, setVal] = useState('');

    const {search, loading, results} = useSearch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search(val);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <input className="shadow-2xl bg-[#eee] text-black rounded px-2 py-1 mr-2" type="text" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Buscar usuario en gitHib" />
            <button className="border rounded px-2" type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
            <div>
                {!loading && results.length > 0 && (
                    <div>
                        {results.map((users) => (
                            <UserCard key={users.id} users={users} />
                        ))}
                    </div>
                )}
            </div>
        </form>
    )
}