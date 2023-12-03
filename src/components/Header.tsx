import React from "react";
import ShowNavButton from "./button/ShowNavBtn";
import { menuLinks } from "@/utils/menuLinks";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-black text-white fixed">
      <div className="flex flex-col lg:flex-row lg:justify-evenly justify-center items-center">
        <Link
          className="lg:pl-4 text-4xl font-medium h-20 flex justify-center items-center"
          href="/"
        >
          Estagie<span className="text-[#00804b]">IFCE</span>
        </Link>
        <ShowNavButton>
          <nav className="transition-all duration-500 ease-in-out w-full">
            <ul className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 w-full bg-black ">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className="text-2xl lg:text-lg font-bold hover:text-[#00804b] transition-colors duration-200 ease-in-out"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ShowNavButton>
      </div>
    </header>
  );
};

export default Header;
