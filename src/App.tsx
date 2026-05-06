import { ThemeContextProvider } from "./Context/ThemeContext";
import { Dashboard } from "./Views/Dashboard";


function App() {

    return (
        <div>
            <ThemeContextProvider> 
                <Dashboard />
            </ThemeContextProvider>
        </div>
    );
}

export default App;