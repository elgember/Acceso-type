import { Icon } from "@iconify/react";

interface searchProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onAddClick: () => void;
}

export const SearchUser = ({searchTerm, setSearchTerm, onAddClick}: searchProps) => {
    return (
    <div className="relative w-full max-w-md flex">
        <Icon icon='material-symbols:search-rounded' height="24" className='absolute left-1/13 top-1/2 text-black transform -translate-y-1/2 md:max-w-md lg:max-w-lg' />
        <input className="bg-blue-50 w-sm rounded pl-10 ml-6 dark:text-black" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="py-1 pl-2 cursor-pointer dark:text-slate-400" type="submit" onClick={onAddClick}>Agregar</button>
    </div>
    )
}