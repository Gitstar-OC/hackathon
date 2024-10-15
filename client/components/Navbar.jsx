"use client"
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme, setTheme } = useTheme();


  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-neutral-950 text-black dark:text-white dark:border-neutral-700 border-neutral-300 border-b-0">
      <h1 className="text-xl font-bold">Eco-Friendly Recipe Finder</h1>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`px-4 py-2  border rounded-lg ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        Change Theme
      </button>
    </nav>
  );
}
