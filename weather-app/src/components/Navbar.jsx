import { Search, MapPin, CloudSun, Moon, Sun, History, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar = ({ theme, toggleTheme, onSearch, onLocation, favorites = [], onSelectFavorite }) => {
    const [searchInput, setSearchInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [recentSearches, setRecentSearches] = useLocalStorage('weather-recent-searches', []);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            if (onSearch) onSearch(searchInput);
            setRecentSearches(prev => {
                const updated = [searchInput.trim(), ...prev.filter(s => s.toLowerCase() !== searchInput.trim().toLowerCase())].slice(0, 5);
                return updated;
            });
            setSearchInput('');
            setShowDropdown(false);
        }
    };

    const handleHistoryClick = (city) => {
        if (onSearch) onSearch(city);
        setShowDropdown(false);
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
                <div ref={dropdownRef} className="relative w-full sm:w-auto flex-1 max-w-md mx-4 z-50">
                    <form onSubmit={handleSearchSubmit} className="relative group">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Search city..."
                            className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-full py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all duration-300"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
                    </form>

                    {/* Dropdown for Recent and Favorites */}
                    {showDropdown && (recentSearches.length > 0 || (favorites && favorites.length > 0)) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                            {recentSearches.length > 0 && (
                                <div className="px-4 py-2">
                                    <div className="flex items-center text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                        <History className="w-3 h-3 mr-1" /> Recent
                                    </div>
                                    {recentSearches.map((city, idx) => (
                                        <button key={idx} onClick={() => handleHistoryClick(city)} className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded transition-colors text-sm text-gray-200">
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {favorites && favorites.length > 0 && (
                                <div className="px-4 py-2 border-t border-white/10 mt-1">
                                    <div className="flex items-center text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                        <Star className="w-3 h-3 mr-1" /> Favorites
                                    </div>
                                    {favorites.map((city, idx) => (
                                        <button key={idx} onClick={() => { if (onSelectFavorite) onSelectFavorite(city); setShowDropdown(false); }} className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded transition-colors text-sm text-gray-200 flex justify-between items-center">
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

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
