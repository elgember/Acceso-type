import { SearchBar } from "../SearchBar";


export const Navbar = () => {
    return (
    <nav className="bg-white dark:bg-[#333] dark:text-white flex justify-between gap-2 p-3 w-screen">
        <div>
            <h2>Logo</h2>
        </div>
        <div>
            <SearchBar />
        </div>
        <div>
            <h2>Perfil</h2>
        </div>
    </nav>
    )
}