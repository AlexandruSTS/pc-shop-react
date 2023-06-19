import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemsCatalog from "./components/ItemsCatalog.tsx";
import PermissionGuard from "./service/PermissionGuard.tsx";
import AddItemForm from "./components/AddItemForm.tsx";

const App = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
                <h1>PC Shop</h1>
                {isAuthenticated ? (
                    <p>
                        Bonjour {user?.name} <LogoutButton></LogoutButton>
                    </p>

                ) : (
                    <div>
                        Please log in. <LoginButton></LoginButton>
                    </div>
                )}
            </div>

            <div className="row flex-grow-1">
                <div className="col-md-6">
                    <ItemsCatalog />
                </div>
                <div className="col-md-6">
                    <PermissionGuard permissions={['write:item']}>
                        <AddItemForm />
                    </PermissionGuard>
                </div>
            </div>
        </div>
    );
};

export default App;
