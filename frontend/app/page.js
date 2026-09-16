import TestApiConnection from '../components/TestApiConnection';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl font-bold text-center">
                P15 Internship Management Platform
            </h1>

            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
                Internship, Apprenticeship and Credit-Mapped Work Experience
                Management Platform
            </p>

            <p className="mt-6 text-gray-500">
                Welcome to P15
            </p>

            {/* Test API Connection Component */}
            <TestApiConnection />
        </main>
    );
}