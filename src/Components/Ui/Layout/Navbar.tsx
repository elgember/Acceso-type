import { IrToProfile } from "../IrToProfile";
import { SearchBar } from "../SearchBar";
import caballero from '@/assets/Logo-caballeroRealista.png';


export const Navbar = () => {
    return (
    <nav className="bg-white dark:bg-[#333] dark:text-white flex justify-between items-center py-1 px-2">
        <div>
            <img className="w-15" src={caballero} alt="logo caballero medieval" />
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