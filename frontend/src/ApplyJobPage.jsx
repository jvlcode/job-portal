import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ApplyJobPage() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { jobId } = useParams(); // get job ID from URL


  const handleApply = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch("http://localhost:8000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job: jobId,
          applicant: userId,
        }),
      });

      if (res.ok) {
        setMessage("Application submitted successfully");
      } else {
        const data = await res.json();
        setError(data.detail || "You have already applied for this job");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">My Applications</a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, Logesh</span>
            <div className="bg-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">L</div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Apply for this job</h2>
          <p className="mt-1 text-sm text-gray-500">Your profile will be shared with the recruiter</p>

          <form onSubmit={handleApply} className="mt-5 space-y-4">
            <button
              type="submit"
              className="w-full rounded-lg py-2.5 font-semibold text-white bg-blue-700 hover:bg-gray-200 hover:text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Apply Now
            </button>

            {message && <p className="text-center text-sm text-green-600">{message}</p>}
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}