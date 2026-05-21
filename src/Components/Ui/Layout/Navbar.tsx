import { IrToProfile } from "../IrToProfile";
import { SearchBar } from "../SearchBar";


export const Navbar = () => {
    return (
    <nav className="bg-white dark:bg-[#333] dark:text-white flex justify-between">
        <div className="co">
            <h2>Logo</h2>
        </div>
        <div>
            <SearchBar />
        </div>
        <div>
            <IrToProfile />
        </div>
    </nav>
    )
}