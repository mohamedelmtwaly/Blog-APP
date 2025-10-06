import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Toast } from "@chakra-ui/react";

export default function EditPost({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://blog-back-production-f88f.up.railway.app/posts/${id}`)
      .then((res) => {
        const data = res.data;
        setTitle(data.title);
        setBody(data.body);
        setImage(data.image);
      })
      .catch((err) => console.error("❌ Error fetching post:", err));
  }, [id]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("posts")
      .upload(fileName, file);

    if (error) {
      toast.error("Error uploading image");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("posts")
      .getPublicUrl(fileName);

    setImage(publicUrlData.publicUrl);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      toast.error("You must be logged in to edit a post");
      return;
    }

    try {
      await axios.patch(
        `https://blog-back-production-f88f.up.railway.app/posts/${id}`,
        {
          title,
          body,
          image,
          updatedAt: new Date().toISOString(),
        }
      );

      toast.success("Post updated successfully");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("❌ Error updating post:", err);
      toast.error("Error updating post");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 shadow-lg rounded-xl mt-10">
      <div>
        <Toaster />
      </div>
      <h2 className="text-2xl font-bold mb-4"> Edit Post</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Change Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
        </div>

        {image && (
          <img
            src={image}
            alt="Current"
            className="w-full rounded-lg mb-2 shadow"
          />
        )}
        <div className="flex flex gap-3 pt-4">
          <button
            type="submit"
            className="btn btn-primary w-1/2 text-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Edit Post"
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
