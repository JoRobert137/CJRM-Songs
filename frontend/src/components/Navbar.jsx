import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/image.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky navbar */}
      <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-blue-600 to-pink-500 shadow-lg">
        <div className="px-6">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="CJRM Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
              />
              <h1 className="text-white font-extrabold text-3xl tracking-wide">
                CJRM Ministries
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12 text-lg">
              <Link
                to="/songs"
                className="text-white hover:text-pink-200 transition font-medium"
              >
                Songs
              </Link>
              <Link
                to="/download"
                className="text-white hover:text-pink-200 transition font-medium"
              >
                Download Songs
              </Link>
              <Link
                to="/upload-songs"
                className="text-white hover:text-pink-200 transition font-medium"
              >
                Upload
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-pink-200 transition font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-pink-200 focus:outline-none"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-500 to-pink-500 px-4 py-4 space-y-4 text-lg">
            <Link
              to="/songs"
              className="block text-white hover:text-pink-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Songs
            </Link>
            <Link
              to="/download"
              className="block text-white hover:text-pink-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Download Songs
            </Link>
            <Link
              to="/upload-songs"
              className="block text-white hover:text-pink-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Upload
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-pink-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* Add top padding to prevent content being hidden behind sticky navbar */}
      <div className="pt-20" />
    </>
  );
}
