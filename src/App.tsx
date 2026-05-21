import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { AppRoutes } from "./Routes/AppRoutes";
import { SearchContextProvider } from "./Context/SearchContext";
import { UserAuth } from './Hooks/UserAuth';


function App() {

    return (   
            <ThemeContextProvider> 
                <SearchContextProvider>
                    <UserAuth>
                        <Router>
                            <AppRoutes />
                        </Router>
                    </UserAuth>
                </SearchContextProvider>
            </ThemeContextProvider>
    );
}

export default App;