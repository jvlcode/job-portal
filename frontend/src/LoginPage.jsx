'use client';
import { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginAction(_, formData) {
    const json = Object.fromEntries(formData.entries());

    const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('userId', data.user_id); // ✅ store user ID
        localStorage.setItem('username', data.username); // optional
    }

    return data.message || 'Login failed';
}

export default function LoginPage() {
    const [message, formAction, isPending] = useActionState(loginAction, '', {
        withPending: true,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (message === 'Login successful') {
            navigate('/jobs');
        }
    }, [message, navigate]);


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
            {/* HEADER */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="text-2xl font-bold text-blue-700">JobPortal</div>
                    <nav className="hidden gap-6 text-sm font-medium text-gray-700 md:flex">
                        <a href="#" className="hover:text-blue-700">Jobs</a>
                        <a href="#" className="hover:text-blue-700">Companies</a>
                        <a href="#" className="hover:text-blue-700">Services</a>
                        <a href="#" className="hover:text-blue-700">Login</a>
                    </nav>
                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 flex-grow">
                {/* LEFT INFO */}
                <section className="hidden md:block">
                    <h1 className="text-3xl leading-snug font-bold">Find your dream job now</h1>
                    <p className="mt-4 max-w-md text-gray-600">
                        Register with JobPortal and get matched with the right opportunities. Build your profile and apply to jobs in top companies.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-gray-700">
                        <li>✔ Trusted by thousands of recruiters</li>
                        <li>✔ Personalized job recommendations</li>
                        <li>✔ Easy apply & profile visibility</li>
                    </ul>
                </section>

                {/* RIGHT FORM */}
                <section className="mx-auto w-full max-w-md rounded-lg border bg-white p-8">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-blue-700 text-center">JobPortal</h1>
                    <p className="text-sm text-gray-500 text-center mt-1">Login to your account</p>

                    {/* Form */}
                    <form action={formAction} className="mt-6 space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                                required
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-700 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded transition disabled:opacity-50"
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Response Message */}
                        <p className="text-center text-sm text-gray-600">{message}</p>

                        {/* Register Link */}
                        <p className="text-sm text-center text-gray-600">
                            New to JobPortal?{' '}
                            <a href="#" className="text-blue-700 font-medium hover:underline">
                                Register here
                            </a>
                        </p>
                    </form>

                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div>
    );
}