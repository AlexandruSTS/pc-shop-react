import { useState } from 'react';
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
    const [showRegister, setShowRegister] = useState(false);

    const handleToggleRegister = () => {
        setShowRegister(true);
    };

    const handleToggleLogin = () => {
        setShowRegister(false);
    };

    return (
        <>
            <div className="wrapper">
                <h1>App</h1>
                <div>
                    <button onClick={handleToggleRegister}>Register</button>
                    <button onClick={handleToggleLogin}>Login</button>
                </div>
                {showRegister ? <Register /> : <Login />}
            </div>
        </>
    );
}
