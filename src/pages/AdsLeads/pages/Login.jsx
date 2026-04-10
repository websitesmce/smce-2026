import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE - LOGIN */}
      <div className="flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          
          <div className="flex justify-center mb-6">
            <img src="/src/assets/logo/logo.png" alt="SMCE Logo" className="h-16" />
          </div>

          <h1 className="text-2xl font-semibold text-center text-[#800000] mb-2">
            Admin Login
          </h1>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Access admission leads dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003180] text-white py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative z-10 flex items-center justify-center h-full mt-20 px-10 text-grey">
          <div className="max-w-md text-center space-y-4">
            {/* <h2 className="text-3xl font-semibold">
              Welcome to SMCE Dashboard
            </h2> */}
            <p className="text-sm text-grey/50">
              Manage admission enquiries, track leads, and streamline your workflow efficiently.
            </p>
            <p className="text-sm font-medium">
              Need help? Contact: 8008932032
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden lg:block">
        <img
          src="/src/assets/home/Hero-imgs/9.jpg"
          alt="College"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#003180]/20"></div>

       
      </div>
    </div>
  );
}

export default Login;