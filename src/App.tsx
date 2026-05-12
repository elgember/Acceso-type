import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { AppRoutes } from "./Routes/AppRoutes";
import { SearchContextProvider } from "./Context/SearchContext";


function App() {

    return (   
            <ThemeContextProvider> 
                <SearchContextProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                </SearchContextProvider>
            </ThemeContextProvider>
    );
}

export default App;