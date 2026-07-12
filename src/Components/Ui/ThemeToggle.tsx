import { useTheme } from "@/Context/ThemeContext";


export const ThemeToggle = () => {

    const { theme, toggleTheme } = useTheme();
    
    return (
    <div className="w-full">
        <button onClick={toggleTheme} className='bg-[#48e] dark:bg-slate-800 text-white px-4 py-2 rounded-md transition-colors duration-300'>
            {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
    </div>
    )
}