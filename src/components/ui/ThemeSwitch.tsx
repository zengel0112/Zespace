import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Set initial theme
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = theme === "dark" || (!theme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }

    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent) => {
      const newIsDark = e.detail.theme === "dark";
      setIsDark(newIsDark);
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(
        "themeChange",
        handleThemeChange as EventListener
      );
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Dispatch custom event for other components
    window.dispatchEvent(
      new CustomEvent("themeChange", { detail: { theme: newTheme } })
    );
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-colors shadow-lg"
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.div>
    </motion.button>
  );
};
