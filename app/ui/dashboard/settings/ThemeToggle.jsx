"use client";

import { useState, useEffect } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const buttonPosition = currentTheme === "light" ? "0%" : "110%";
  const themeMode = currentTheme === "light" ? "Light Mode" : "Dark Mode";

  return (
    <div className="custom-bg flex justify-between items-center shadow-lg rounded-md my-5 py-5 px-5">
      <h2>{themeMode}</h2>
      <div
        className={`w-[60px] rounded-full shadow-lg ${
          currentTheme === "light" ? "bg-yellow-100" : "bg-black"
        }`}
      >
        <button
          style={{ transform: `translateX(${buttonPosition})` }}
          className={`transition-transform duration-300 ease-in-out ${
            currentTheme === "light" ? "bg-yellow-500" : "bg-slate-600"
          } text-white p-2 shadow-md rounded-full`}
          onClick={toggleTheme}
        >
          {currentTheme === "light" ? <IoIosSunny /> : <IoIosMoon />}
        </button>
      </div>
    </div>
  );
}
