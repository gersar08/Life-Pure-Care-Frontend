import React from "react";
import {BellAlertIcon} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Life Care Pure</h1>
      </div>
      <div className="flex items-center">
        <button>
        <BellAlertIcon className="h-7 w-7 mr-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;

//TODO: Add breakpoints for mobile