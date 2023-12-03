"use client";
import React, { useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface ShowNavButtonProps {
  children?: React.ReactNode;
}

const ShowNavButton = ({ children }: ShowNavButtonProps) => {
  const { setActiveMenu, activeMenu } = useAuth();

  return (
    <div className="flex flex-row-reverse w-full">
      <button
        className="text-white absolute right-5 top-5 lg:hidden"
        type="button"
        aria-label="ShowNavbar"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <Bars3Icon className="h-7 w-7 cursor-pointer" />
      </button>
      <div className="w-full flex flex-col lg:flex-row justify-start items-center ">
        {activeMenu && children}
      </div>
    </div>
  );
};

export default ShowNavButton;
