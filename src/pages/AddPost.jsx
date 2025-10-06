import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Demo mode: no file upload, UI only

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Local overlay only: store in sessionStorage so it appears on Home without saving to API
    const newPost = {
      id: -Date.now(),
      title: formData.title,
      body: formData.body,
      image: formData.image || "",
      authorId: user?.id || 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const key = "temp_posts";
      const list = JSON.parse(sessionStorage.getItem(key) || "[]");
      list.unshift(newPost);
      sessionStorage.setItem(key, JSON.stringify(list));
      toast.success("Post added (local only)");
      navigate("/");
    } catch (err) {
      console.error("Failed to store temp post", err);
      toast.error("Failed to add post locally");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 p-6">
      <div>
        <Toaster />
      </div>

      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg bg-base-100 shadow-2xl rounded-2xl p-8 space-y-5 border border-base-300"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Add Post
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full text-lg"
          onChange={handleChange}
          required
        />

        <textarea
          name="body"
          placeholder="Body"
          className="textarea textarea-bordered w-full text-lg min-h-32"
          onChange={handleChange}
          required
        ></textarea>

        <div className="space-y-2">
          <label className="font-semibold text-sm text-gray-600">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://..."
            className="input input-bordered w-full"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex gap-3 pt-4">
          <button
            type="submit"
            className="btn btn-primary w-1/2 text-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Add Post"
            )}
          </button>

          <Link
            to="/"
            className="btn btn-secondary w-1/2 text-lg hover:bg-secondary/80"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
