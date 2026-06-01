import { IrToProfile } from "../IrToProfile";
import { SearchBar } from "../SearchBar";


export const Navbar = () => {
    return (
    <nav className="bg-white dark:bg-[#333] dark:text-white flex justify-between py-4 px-2">
        <div className="">
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