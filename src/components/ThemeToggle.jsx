import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // 1. عند تحميل المكون لأول مرة: قراءة وحفظ الثيم
  useEffect(() => {
    // قراءة الثيم المحفوظ أو استخدام 'light' كإعداد افتراضي
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.querySelector("html").setAttribute("data-theme", storedTheme);
  }, []);

  // 2. عند تغيير حالة 'theme': تطبيق الثيم وحفظه
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // حفظ الثيم في الـ localStorage
  }, [theme]);

  // دالة التبديل
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // الزر الدائري لتطبيق الثيم
  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
      {theme === "dark" ? (
        // أيقونة الشمس (Sun) عندما يكون الثيم Dark (للتغيير إلى Light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        // أيقونة القمر (Moon) عندما يكون الثيم Light (للتغيير إلى Dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}
