import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center px-4">
      <div className="border-1 bg-gray-50 border-gray-200 rounded-2xl w-full max-w-md py-8 px-12 space-y-6">
        <div className="text-center flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500">Log in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-md text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 text-sm block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Please enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block text-sm bg-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Please enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full text-lg font-semibold mt-10 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
        <div>
          Copyright &copy; 2025 ABC Company Limited. All rights reserved.
        </div>
        <div className="space-x-2">
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
}
