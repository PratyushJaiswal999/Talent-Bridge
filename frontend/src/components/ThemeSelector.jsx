import { PaletteIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const THEMES = [
  "light", "dark", "bumblebee", "forest"
];

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end ml-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" title="Theme">
        <PaletteIcon className="size-5 text-base-content/80" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 text-base-content rounded-box z-[1] w-40 p-2 shadow-2xl"
      >
        {THEMES.map((themeName) => (
          <li key={themeName}>
            <button
              className={`w-full text-left btn btn-sm btn-ghost justify-start mb-1 ${
                theme === themeName ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => {
                setTheme(themeName);
                // close dropdown after selection
                const elem = document.activeElement;
                if (elem) {
                  elem?.blur();
                }
              }}
            >
              <span className="capitalize">{themeName}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSelector;
