"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/tasks" },
  ];
  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href="/" className="">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "text-gray-900": currentPathname === link.href,
                "text-gray-500": currentPathname !== link.href,
                "hover:text-gray-800 transition-colors duration-200 cursor-pointer":
                  true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
