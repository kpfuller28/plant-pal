import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage and apply class
    const darkPref = localStorage.getItem("theme") === "dark";
    if (darkPref) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-1 rounded-md text-text border-2 border-text border-solid
          relative overflow-hidden
          after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:bg-text after:transition-all after:duration-200 after:-z-10
          hover:text-background hover:after:w-full transition duration-150 active:scale-90"
    >
      {isDark ? "◐" : "◐"}
    </button>
  );
}
