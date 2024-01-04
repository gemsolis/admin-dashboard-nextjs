"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`flex items-center px-2 py-3 my-1 text-black dark:text-white hover:bg-blue-900 hover:text-white hover:dark:text-white rounded-md  ${
        pathname === item.path ? "bg-blue-900 text-white" : ""
      }`}
    >
      <span className="pr-3">{item.icon}</span>
      <span className="max-md:hidden">{item.title}</span>
    </Link>
  );
};

export default MenuLink;
