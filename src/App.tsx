import ItemsCatalog from "./components/ItemsCatalog.tsx";
import LoginButton from "./components/LogginButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import {useAuth0} from "@auth0/auth0-react";
import PermissionGuard from "./service/PermissionGuard.tsx";
import AddItemForm from "./components/AddItemForm.tsx";

function App() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>En chargement...</div>
    }
    return (
        <div className='container mt-5'>
            <h2>Items</h2>
            {isAuthenticated ? (
                <div>
                    <p>
                        Bonjour {user?.name} <LogoutButton></LogoutButton>
                    </p>

                    <PermissionGuard permissions={['read:all-items']}>
                        <ItemsCatalog/>
                    </PermissionGuard>
                    <PermissionGuard permissions={['write:item']}>
                        <AddItemForm/>
                    </PermissionGuard>
                </div>
            ) : (
                <LoginButton></LoginButton>
            )}
        </div>
    );
}

export default App;
