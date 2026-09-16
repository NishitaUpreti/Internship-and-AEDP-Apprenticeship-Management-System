"use client";

import { useState, useEffect } from 'react';

export default function TestApiConnection() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${apiUrl}/api/test`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setMessage(data.message);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, []);

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">API Connection Status</h2>
            
            {loading && (
                <div className="flex items-center text-blue-600">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Testing connection...
                </div>
            )}
            
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
                    <p className="font-medium">Connection Failed</p>
                    <p className="text-sm mt-1">{error}</p>
                    <p className="text-xs mt-2 text-red-500">Ensure the backend is running on {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</p>
                </div>
            )}
            
            {message && (
                <div className="p-3 bg-green-50 text-green-700 rounded border border-green-200">
                    <p className="font-medium flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Connection Successful
                    </p>
                    <p className="text-sm mt-1">Response: {message}</p>
                </div>
            )}
        </div>
    );
}
