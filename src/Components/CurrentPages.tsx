import { Dispatch, SetStateAction } from "react";

interface pagesProps {
    totalPage: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const CurrentPages = ({ totalPage, currentPage, setCurrentPage }: pagesProps) => {

    if (totalPage <= 0) return null;

    return (
    <div className="w-full md:max-w-5xl">
        <div className="flex justify-between px-2 pb-4">
            <button className="cursor-pointer" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1 ))} disabled={currentPage === 1}>Anterior</button>
            <span>Pagina {currentPage} de {totalPage} Paginas</span>
            <button className="cursor-pointer" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage ))} disabled={currentPage === totalPage}>Siguente</button>
        </div>
    </div>
    )
}