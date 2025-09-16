import React from "react";
import { ModeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <div className="flex w-full p-1 justify-between">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
        Mock Tracker
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
