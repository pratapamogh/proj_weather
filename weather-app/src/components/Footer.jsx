import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full glass-card !rounded-none !border-x-0 !border-b-0 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">

                <p className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                    Designed & Developed with <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" /> by
                    <span className="text-accent font-semibold tracking-wide text-glow">Amogh Pratap Singh</span>
                </p>

                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#1DA1F2] hover:scale-110 transition-all hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.8)]">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#0A66C2] hover:scale-110 transition-all hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>

                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} WeatherSphere. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
