import {useState} from 'react';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        const userData = {
            email,
            password
        };

        axios.post('/pc-shop/api/auth/login', userData)
            .then(response => {
                setMessage('Login successful!');
                console.log('Response:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    setMessage('Error during login: ' + error.response.data);
                    console.error('Error during login:', error.response.data);
                } else {
                    setMessage('Error during login: ' + error.message);
                    console.error('Error during login:', error.message);
                }
            });
    };

    return (
        <>
            <div className="wrapper">
                <h1>Login</h1>
                <form>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                    <p>{message}</p>
                </form>
            </div>
        </>
    );
}
