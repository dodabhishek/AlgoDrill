import { Linkedin, X, Instagram } from "lucide-react";
import React from "react";
import logo from '../assets/cudolio.png';

export default function Footer() {
    return (
        <footer className="w-full bg-[#18181b] px-6 py-6 flex flex-col items-center justify-center shadow-inner">
           
            <div className="text-gray-400 text-sm text-center mt-25 mb-2">
                © {new Date().getFullYear()} Cudolio. All rights reserved.
            </div>
            {/* Social Icons Centered */}
            <div className="flex items-center gap-4 justify-center">
                <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><X /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><Instagram /></a>
            </div>
        </footer>
    );
}