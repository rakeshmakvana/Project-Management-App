import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../api';

function Chart() {
    const [chartData, setChartData] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const projectsResponse = await api.get('/api/projects');
                const projectCount = Array.isArray(projectsResponse.data) ? projectsResponse.data.length : 0;
                setProjectCount(projectCount);

                const paymentsResponse = await api.get('/api/payments/pay');
                const paymentCount = Array.isArray(paymentsResponse.data.payment) ? paymentsResponse.data.payment.length : 0;
                setPaymentCount(paymentCount);

                const newChartData = [
                    { name: "Projects", count: projectCount },
                    { name: "Payments", count: paymentCount },
                ];
                setChartData(newChartData);
                console.log("Chart Data:", newChartData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setError("Failed to load chart data.");
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="w-full p-4 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Dashboard Overview</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {!error && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center justify-center bg-white p-4 shadow-lg rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700">Total Projects</h3>
                            <p className="text-3xl font-bold text-blue-500">{projectCount}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white p-4 shadow-lg rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700">Total Payments</h3>
                            <p className="text-3xl font-bold text-blue-500">{paymentCount}</p>
                        </div>
                    </div>

                    <div className="w-full h-96 bg-white shadow-xl rounded-lg p-6 flex items-center justify-center">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#333' }} />
                                    <YAxis tick={{ fontSize: 14, fill: '#333' }} />
                                    <Tooltip wrapperStyle={{ fontSize: '0.875rem' }} />
                                    <Legend />
                                    <Bar dataKey="count" fill="#36CFC9" radius={[8, 8, 0, 0]} barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-500">Loading chart data...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chart;
