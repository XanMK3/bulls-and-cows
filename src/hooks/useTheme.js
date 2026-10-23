import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ui-theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
    }
    catch (e) {
        // Ignore localStorage error
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
};

export const applyTheme = (theme) => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#f8f7f4');
    }
};

const useTheme = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        }
        catch (e) {
            // Ignore error
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    return {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
    };
};

export default useTheme;
