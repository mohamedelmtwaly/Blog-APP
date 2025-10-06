import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import AnimatedRoutes from "./components/AnimatedRoutes";

export default function App() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, usersRes, commentsRes] = await Promise.all([
        axios.get("https://blog-back-production-f88f.up.railway.app/posts"),
        axios.get("https://blog-back-production-f88f.up.railway.app/users"),
        axios.get("https://blog-back-production-f88f.up.railway.app/comments"),
      ]);

      // Sanitize and rebrand content and users
      const nameMap = new Map([
        ["omar", { name: "mohamed elmtwaly" }],
        ["ahmed", { name: "karim nasser" }],
        ["mohamed", { name: "youssef saeed" }],
      ]);

      // Transform users: rename known names and set avatar to UI Avatars
      const transformedUsers = (usersRes.data || []).map((u) => {
        const key = (u?.username || "").toLowerCase();
        if (nameMap.has(key)) {
          const newName = nameMap.get(key).name;
          return {
            ...u,
            username: newName,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              newName
            )}&background=6C63FF&color=fff`,
          };
        }
        return u;
      });

      // Transform posts: replace occurrences of old names in title/body and remove unwanted phrases
      const sanitizeText = (text = "") => {
        let t = text || "";
        for (const [oldKey, v] of nameMap.entries()) {
          const re = new RegExp(oldKey, "ig");
          t = t.replace(re, v.name);
        }
        // Remove/replace phrases like "hello from linkedin" and "blogy app/bology app"
        const phraseReplacements = [
          { re: /hello\s+from\s+linkedin/ig, to: "Hello everyone" },
          { re: /linkedin/ig, to: "" },
          { re: /blogy\s*app/ig, to: "InkWave" },
          { re: /bology\s*app/ig, to: "InkWave" },
        ];
        phraseReplacements.forEach(({ re, to }) => {
          t = t.replace(re, to);
        });
        // Collapse extra spaces after removals
        t = t.replace(/\s{2,}/g, " ").trim();
        return t;
      };

      const transformedPosts = (postsRes.data || []).map((p) => ({
        ...p,
        title: sanitizeText(p.title),
        body: sanitizeText(p.body),
      }));

      // Fallback virtual authors (negative IDs to avoid collision)
      const fallbackUsers = [
        { id: -1, username: "lina barakat", avatar: "https://ui-avatars.com/api/?name=Lina+Barakat&background=00BFA6&color=fff" },
        { id: -2, username: "zeyad kamal", avatar: "https://ui-avatars.com/api/?name=Zeyad+Kamal&background=6C63FF&color=fff" },
        { id: -3, username: "salma fathi", avatar: "https://ui-avatars.com/api/?name=Salma+Fathi&background=FF6584&color=fff" },
      ];

      // Fallback posts with distinct content and recent dates
      const now = Date.now();
      const fallbackPosts = [
        {
          id: -101,
          authorId: -1,
          title: "5 lessons I learned shipping side projects",
          body: "Small scope, daily progress, and honest feedback. Here's what really helped me keep momentum.",
          createdAt: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
        },
        {
          id: -102,
          authorId: -2,
          title: "Designing calm UIs with whitespace",
          body: "Whitespace is not empty; it's a rhythm. Tips to make interfaces feel breathable and focused.",
          createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
        },
        {
          id: -103,
          authorId: -3,
          title: "From notes to narrative: writing better posts",
          body: "Outline first, draft fast, refine late. A simple workflow to turn scattered ideas into readable stories.",
          createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
        },
      ];

      // Merge and randomize a bit to avoid obvious ordering
      const mergedUsers = [...transformedUsers, ...fallbackUsers];
      const mergedPosts = [...transformedPosts, ...fallbackPosts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Overlay: local-only posts + local edits + local deletions (sessionStorage only)
      let tempPosts = [];
      let tempEdits = {};
      let tempDeleted = [];
      try {
        tempPosts = JSON.parse(sessionStorage.getItem("temp_posts") || "[]");
      } catch (_) {}
      try {
        tempEdits = JSON.parse(sessionStorage.getItem("temp_edits") || "{}");
      } catch (_) {}
      try {
        tempDeleted = JSON.parse(sessionStorage.getItem("temp_deleted_ids") || "[]");
      } catch (_) {}
      const deletedSet = new Set(tempDeleted);

      const base = [...tempPosts, ...mergedPosts].filter((p) => !deletedSet.has(p.id));
      const postsWithOverlay = base.map((p) =>
        tempEdits && tempEdits[p.id] ? { ...p, ...tempEdits[p.id] } : p
      );

      setPosts(postsWithOverlay);
      setUsers(mergedUsers);
      setComments(commentsRes.data);
    };
    fetchData();
  }, []);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <AnimatedRoutes
        user={user}
        posts={posts}
        users={users}
        comments={comments}
      />
    </>
  );
}
