import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import image from "../assets/inkwave-illustration.svg";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://blog-back-production-f88f.up.railway.app/users?email=${formData.email}&password=${formData.password}`
      );
      if (res.data.length > 0) {
        login(res.data[0]);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again");
    }
  };
  console.log(login);

  return (
    <div className="flex min-h-screen bg-base-200">
      <Toaster />

      <div className="hidden md:flex w-1/2 items-center justify-between py-1">
        <img
          src={image}
          alt="Login illustration"
          className="w-3/ rounded-lg scale-x-[-1] "
        />
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <form
          onSubmit={handleSubmit}
          className="card w-full max-w-md bg-base-100 shadow-xl p-8 space-y-4"
        >
          <h2 className="text-3xl font-bold text-center">Sign in to InkWave</h2>
          <p className="text-center text-gray-500">Capture ideas. Share stories.</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <p className="text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="underline text-violet-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
