import { useEffect, useState } from "react";
import api from "../api";

function Payments() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get('/api/payments/pay');
                setPayments(response.data.payment);
            } catch (error) {
                console.error("Error fetching payments:", error);
                setError("Failed to load payment data.");
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Payment Records
            </h2>

            {/* Show error if any */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Payment Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Payment ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Project ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {payment._id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {payment.projectId}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        ₹{payment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {new Date(Date.now()).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Payments;
