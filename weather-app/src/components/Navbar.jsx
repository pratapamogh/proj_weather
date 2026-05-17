import { Search, MapPin, CloudSun, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ theme, toggleTheme, onSearch, onLocation }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            if (onSearch) onSearch(searchInput);
            setSearchInput('');
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass-card !rounded-none !border-x-0 !border-t-0 p-4 transition-all pr-4 sm:pr-8 pl-4 sm:pl-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <CloudSun className="text-accent w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                    <h1 className="text-2xl font-bold font-sans tracking-wider text-white text-glow">
                        Weather<span className="text-accent">Sphere</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto flex-1 max-w-md mx-4 group">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search city..."
                        className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-full py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all duration-300"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
                </form>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onLocation}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
                        title="Use current location"
                    >
                        <MapPin className="w-5 h-5 text-gray-300 group-hover:text-accent" />
                    </button>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
                        title="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-gray-300 group-hover:text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-300 group-hover:text-blue-400" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
