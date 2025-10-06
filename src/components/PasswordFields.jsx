import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordFields({ formData, setFormData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setError("Passwords do not match ");
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="input input-bordered w-full pr-10"
          onChange={handleChange}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className={`input input-bordered w-full pr-10 ${
            error ? "input-error" : ""
          }`}
          onChange={handleChange}
          required
        />
        <span
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </>
  );
}
