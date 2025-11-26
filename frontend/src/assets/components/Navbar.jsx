import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral text-neutral-content shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-white transition-colors">
          SokoPredicts
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-200">
          <li>
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/predict" className="hover:text-white transition-colors">
              Generate
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-white transition-colors">
              History
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Menu & Search */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-gray-200 hover:text-white transition-colors" />
          </button>
          <button>
            <Search className="w-5 h-5 text-gray-200 hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-neutral text-neutral-content flex flex-col px-6 py-4 space-y-2 shadow-lg">
          <li>
            <Link to="/" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/predict" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              Generate
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              History
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
