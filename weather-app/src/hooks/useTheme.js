import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
    const [theme, setTheme] = useLocalStorage('weather-theme', 'dark');

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark'); // standard for tailwind
            document.body.classList.add('bg-background', 'text-white');
            document.body.classList.remove('bg-gray-100', 'text-gray-900');
        } else {
            root.classList.remove('dark');
            document.body.classList.add('bg-gray-100', 'text-gray-900');
            document.body.classList.remove('bg-background', 'text-white');
        }
    }, [theme]);

    return { theme, toggleTheme };
}
