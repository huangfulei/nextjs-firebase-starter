import { create } from "zustand";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme: string) => {
    applyTheme(theme);
    set({ theme });
  },
}));

/**
 * Apply theme to 'html' tag on DOM.
 */
const applyTheme = (theme = "light") => {
  const newTheme = theme;
  const html = document.getElementsByTagName("html")[0];
  localStorage.setItem("theme", theme);
  (html as HTMLElement).setAttribute("data-theme", newTheme);
};
