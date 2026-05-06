import { useTheme } from "@/Context/ThemeContext";


export const ThemeToggle = () => {

    const { theme, toggleTheme } = useTheme();
    
    return (
    <div>
        <button onClick={toggleTheme} className='bg-amber-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors duration-300'>
            {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
    </div>
    )
}