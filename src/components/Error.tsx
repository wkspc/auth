import React, { ReactNode } from "react";

interface ErrorProps {
  children?: ReactNode;
}

export const Error = ({ children }: ErrorProps) => {
  return <p className="text-xs mt-1 pl-1 text-red-600">{children}</p>;
};
