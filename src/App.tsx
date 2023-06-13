import PaginationComponent from "./components/PaginationComponent.tsx";
import LoginButton from "./LogginButton.tsx";
import LogoutButton from "./LogoutButton.tsx";
import {useAuth0} from "@auth0/auth0-react";

function App() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    // if (isLoading) {
    //     return <div>En chargement...</div>
    // }

    return (
        <div className='container mt-5'>
            <h2>Items</h2>
            {isAuthenticated ?
                <div>
                    <p> Bonjour {user?.name} <LogoutButton/> </p>
                    <PaginationComponent/>
                </div> : <LoginButton/>}
        </div>
    );
}

export default App;
