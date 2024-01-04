"use client";

import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

import { useState, useEffect } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useTheme } from "next-themes";

const Navbar = () => {
  const pathname = usePathname();

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

  const buttonPosition = currentTheme === "light" ? "0%" : "130%";
  return (
    <div className="global-bg flex gap-5 items-center px-5 py-3 ">
      <h1 className="flex-1 font-bold text-lg capitalize">
        {pathname.split("/").pop()}
      </h1>
      <div>
        <form className="flex items-center relative">
          <MdSearch className="absolute left-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] bg-transparent pl-8 py-3 rounded-md border-2 border-slate-400 dark:border-slate-700 "
          />
        </form>
      </div>
      <div
        className={`w-[50px] rounded-full shadow-lg ${
          currentTheme === "light" ? "bg-yellow-100" : "bg-slate-700"
        }`}
      >
        <button
          style={{ transform: `translateX(${buttonPosition})` }}
          className={`transition-transform duration-300 ease-in-out ${
            currentTheme === "light" ? "bg-yellow-500" : "bg-slate-600"
          } text-white p-1 shadow-md rounded-full`}
          onClick={toggleTheme}
        >
          {currentTheme === "light" ? <IoIosSunny /> : <IoIosMoon />}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <MdOutlineChat size={20} />
        <MdNotifications size={20} />
        <MdPublic size={20} />
      </div>
    </div>
  );
};

export default Navbar;
