'use client';
import { useActionState } from 'react';
import { NavLink } from 'react-router-dom';

async function registerAction(_, formData) {
    const json = Object.fromEntries(formData.entries());

    const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
         headers: {
      'Content-Type': 'application/json', // ✅ explicitly send JSON
    },

         body: JSON.stringify(json),

    });
    const data = await res.json();
  return data.message || 'Registration failed';
}

export default function RegisterForm() {
  const [message, formAction, isPending] = useActionState(registerAction, '', {
    withPending: true,
  });

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
             <NavLink to={`/login`} className="hover:text-blue-700">Login</NavLink>
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
          <h2 className="text-xl font-bold text-gray-900">Create your JobPortal profile</h2>
          <p className="mt-1 text-sm text-gray-500">Search & apply to jobs from India’s top companies</p>

          <form action={formAction} className="mt-6 space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                id="username"
                placeholder="Enter username"
                required
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email ID</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                required
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Minimum 6 characters"
                required
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded transition"
            >
              {isPending ? 'Registering...' : 'Register Now'}
            </button>

            {/* Response Message */}
            <p className="text-center text-sm text-gray-600">{message}</p>

            {/* Terms & Login Link */}
            <p className="text-center text-xs text-gray-500">
              By registering, you agree to our{' '}
              <a href="#" className="text-blue-700 hover:underline">Terms & Conditions</a>
            </p>
            <p className="text-center text-sm text-gray-600">
              Already registered?{' '}
              <a href="#" className="font-medium text-blue-700 hover:underline">Login here</a>
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