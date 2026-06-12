import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please fill all fields");

            setTimeout(() => {
                setMessage("");
            }, 3000);

            return;
        }

        try {
            const response = await axios.post(
                "https://cinewave-backend-six.vercel.app/login",
                {
                    email,
                    password,
                }
            );

            setMessage(response.data.message);

            setEmail("");
            setPassword("");

            // Redirect to Dashboard after success
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Server not reachable"
            );

            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">

            {/* Toast Notification */}
            {message && (
                <div
                    className={`fixed top-5 right-5 px-6 py-4 rounded-lg shadow-2xl text-white font-medium z-50 transition-all duration-300 ${message === "Login Successful"
                        ? "bg-green-600"
                        : "bg-red-600"
                        }`}
                >
                    {message === "Login Successful" ? "✅ " : "❌ "}
                    {message}
                </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-[400px]">

                <h1 className="text-4xl font-bold text-white text-center mb-2">
                    CineWave
                </h1>

                <p className="text-gray-300 text-center mb-8">
                    Welcome back
                </p>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition"
                    >
                        Sign In
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-6 text-sm">
                    Stream smarter. Watch anywhere.
                </p>

            </div>

        </div>
    );
}

export default Login;