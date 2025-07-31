import DarkModeToggle from "./DarkMode";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background text-text  backdrop-blur-lg transition-colors duration-300">
      <div className="border-b border-primary border-shadow mx-4 sm:mx-6 lg:mx-8">
        <div className="flex items-center justify-between px-2 sm:px-2 lg:px-2 py-3">
          {/* Brand */}
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center space-x-2">
            <span className="bg-clip-text text-transparent bg-text drop-shadow-md">
              PlantPal
            </span>
          </h1>

          {/* Navigation */}
          <nav className="flex items-center space-x-6 text-sm font-bold">
            <a
              href="#"
              className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent  hover:after:w-full after:transition-all"
            >
              My Plants
            </a>
            <a
              href="#"
              className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent  hover:after:w-full after:transition-all"
            >
              Add Plant
            </a>
            <DarkModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
