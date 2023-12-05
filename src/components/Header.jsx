import React from "react";
import {BellAlertIcon, ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500">
      <div className="flex items-center">
        <Link to={"/admin-dashboard"}>
        <h1 className="text-xl font-bold">Life Care Pure</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <button>
        <BellAlertIcon className="h-7 w-7 mr-6" />
        </button>
        <button>
        <ArrowLeftOnRectangleIcon className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
};

export default Header;
