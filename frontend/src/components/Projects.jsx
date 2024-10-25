import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegCheckCircle } from "react-icons/fa";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("unpaid");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to load projects.");
            }
        };

        fetchProjects();
    }, []);

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/projects/${id}`);
            window.alert("Project deleted");
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error("Error deleting project");
        }
    };

    const handleStatusClick = (project) => {
        setSelectedProject(project);
        setAmount("");
        setStatus("unpaid");
        setShowStatusModal(true);
    };

    const handleStatusSave = async () => {
        try {
            await api.post(`/api/payments/add`, {
                projectId: selectedProject._id,
                amount,
                status,
            });
            setShowStatusModal(false);
            window.alert("Project status updated");
            navigate('/payments');
        } catch (error) {
            console.error("Error updating project status:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Our Projects
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex flex-wrap justify-center gap-10">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="max-w-sm w-full bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="p-6 space-y-4">
                                <h3 className="text-3xl font-semibold text-gray-800">
                                    {project.name}
                                </h3>
                                <p className="text-gray-700 leading-relaxed break-words">
                                    {project.description}
                                </p>
                                <p className="text-2xl font-semibold text-green-700">
                                    ₹{project.budget.toLocaleString()}
                                </p>

                                <div className="mt-6 flex justify-between space-x-3">
                                    <button
                                        onClick={() => handleEdit(project._id)}
                                        className="flex-1 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200"
                                    >
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition duration-200"
                                    >
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                    <button
                                        onClick={() => handleStatusClick(project)}
                                        className="flex-1 bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 transition duration-200"
                                    >
                                        <FaRegCheckCircle className="mr-2" /> Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No projects available.</p>
                )}
            </div>

            {showStatusModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md max-w-sm w-full">
                        <h3 className="text-2xl font-bold mb-4">Update Project Status</h3>

                        <div className="mb-4">
                            <input
                                type="text"
                                value={selectedProject._id}
                                readOnly
                                className="w-full p-2 border rounded-md bg-gray-100"
                                hidden
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Amount
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStatusSave}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;
