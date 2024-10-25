import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/projects');
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setData([]);
                    console.error("Data is not in array format.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-screen flex-col">
            <header className="flex items-center justify-between bg-gradient-to-br from-teal-500 to-blue-500 text-white px-6 py-4 shadow-md">
                <h1 className="flex items-center font-extrabold text-3xl">
                    <span className="text-5xl text-black">F</span>
                    <span className="text-3xl text-neutral-100 ml-1">reelancer</span>
                </h1>

                <button onClick={() => handlelogout()} className="text-red-200 text-lg hover:text-red-100 font-bold transition duration-200">
                    Logout
                </button>
            </header>

            <div className="flex flex-1">
                <aside className="w-1/5 bg-gradient-to-br from-teal-500 to-blue-500 text-white p-6 border-r border-teal-600 py-10">
                    <nav>
                        <ul className="space-y-8 text-center">
                            <li>
                                <Link to="/" className="block text-xl font-bold hover:text-teal-200 transition duration-150">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/projects" className="block text-xl font-bold hover:text-teal-200 transition duration-150">Projects</Link>
                            </li>
                            <li>
                                <Link to="/addproject" className="block text-xl font-bold hover:text-teal-200 transition duration-150">Add Project</Link>
                            </li>
                            <li>
                                <Link to="/payments" className="block text-xl font-bold hover:text-teal-200 transition duration-150">Payments</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
