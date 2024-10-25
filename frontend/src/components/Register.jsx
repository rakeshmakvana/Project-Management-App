import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/auth/register", { username, email, password });
            window.alert("Registration successful!");
            navigate('/login');
        } catch (error) {
            console.error("Error registering");
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-blue-500">
            <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>

                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter password"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.952 10.952 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1s10 4.477 10 10a10.952 10.952 0 01-1.875 6.825m-3.7-4.575a6.978 6.978 0 00.575-3.25m-5.25-5.25a6.978 6.978 0 00-3.25.575" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M3 21l18-18M12 10.5l-3.5 3.5a3.979 3.979 0 01-.962-.387c-.188-.097-.371-.21-.558-.318M15 10.5a3.978 3.978 0 01-1.74.387c-.436 0-.857-.057-1.25-.162m6.25-1.25c.372.495.748.954 1.04 1.507M3 3l18 18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-teal-600 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
