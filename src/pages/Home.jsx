import React, { useContext } from "react";
import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

export default function Home({ posts = [], users = [], comments = [] }) {
  const { user } = useContext(AuthContext);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 mt-4 mb-6">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 border border-base-300">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Share your voice with InkWave</h1>
          <p className="text-base md:text-lg text-base-content/70 mb-6 max-w-2xl">
            Publish ideas, tell stories, and connect with others. Start a wave of creativity.
          </p>
          <div className="flex gap-2 w-full md:w-[520px]">
            <input className="input input-bordered flex-1 rounded-2xl" placeholder="Search posts... (coming soon)" />
            <button className="btn btn-primary rounded-2xl">Explore</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-4">
        {sortedPosts.length === 0 ? (
          <div
            className="text-center text-gray-500 flex flex-col items-center justify-center mt-24 gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-primary/70">
              <path fill="currentColor" d="M6 4a2 2 0 0 0-2 2v12.5a1.5 1.5 0 0 0 2.323 1.277L9.5 18.25l3.177 1.527a1.5 1.5 0 0 0 1.346 0L17.5 18.25l3.177 1.527A1.5 1.5 0 0 0 23 18.5V6a2 2 0 0 0-2-2H6Zm0 2h15v11.689l-2.177-1.046a1.5 1.5 0 0 0-1.346 0L14.3 18.17l-3.177-1.527a1.5 1.5 0 0 0-1.346 0L6 18.69V6Zm3 2h9a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm0 4h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z"/>
            </svg>
            <p className="max-w-md">
              Nothing here yet. Start the wave by creating your first post!
            </p>
          </div>
        ) : (
          sortedPosts.map((post) => {
            const author = users.find((u) => u.id === post.authorId) || {};
            const postComments = (comments || [])
              .filter((c) => c.postId === post.id)

            return (
              <PostCard
                key={post.id}
                post={post}
                author={author}
                comments={postComments}
                currentUser={user}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
