import {useState} from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [message, setMessage] = useState('');

    const handleRegistration = () => {
        const userData = {
            firstName,
            lastName,
            email,
            password,
            dob
        };

        axios.post('/pc-shop/api/auth/register', userData)
            .then(response => {
                setMessage('Registration successful!');
                console.log('Response:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    setMessage('Error during registration: ' + error.response.data);
                    console.error('Error during registration:', error.response.data);
                } else {
                    setMessage('Error during registration: ' + error.message);
                    console.error('Error during registration:', error.message);
                }
            });
    };

    return (
        <>
            <div className="wrapper">
                <h1>Registration</h1>
                <form>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </label>
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
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            value={dob || '2022-01-01'} // Set a default date if dob is null or empty
                            onChange={e => setDob(e.target.value)}
                        />
                    </label>
                    <button type="button" onClick={handleRegistration}>
                        Register
                    </button>
                    <p>{message}</p>
                </form>
            </div>
        </>
    );
}
