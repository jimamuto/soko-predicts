import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding & Description */}
        <div className="space-y-4">
          <h6 className="text-xl font-bold">SokoPredicts</h6>
          <p className="text-gray-400 text-sm">
            AI-powered commodity price predictions for smarter trading decisions.
          </p>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">Product</h6>
          <Link to="/predict" className="block link link-hover">Predict</Link>
          <Link to="/history" className="block link link-hover">History</Link>
          <a href="#" className="block link link-hover">Insights</a>
        </div>

        {/* Company & Legal Links */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">Company</h6>
          <a href="#" className="block link link-hover">About Us</a>
          <a href="#" className="block link link-hover">Team</a>
          <a href="#" className="block link link-hover">Contact</a>
          <a href="#" className="block link link-hover">Privacy Policy</a>
        </div>
      </div>

      <div className="border-t border-neutral-content/20 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} SokoPredicts. All rights reserved.
      </div>
    </footer>
  );
}
