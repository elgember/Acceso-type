import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { AppRoutes } from "./Routes/AppRoutes";
import { SearchContextProvider } from "./Context/SearchContext";
import { UserAuth } from "./Hooks/UserAuth";
import { AuthContextProvider } from "./Context/AuthContext";


function App() {

    return (   
            <ThemeContextProvider> 
                <SearchContextProvider>
                    <UserAuth>
                        <AuthContextProvider>
                            <Router>
                                <AppRoutes />
                            </Router>
                        </AuthContextProvider>
                    </UserAuth>
                </SearchContextProvider>
            </ThemeContextProvider>
    );
}

export default App;