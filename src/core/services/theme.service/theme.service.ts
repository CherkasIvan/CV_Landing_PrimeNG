import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark-mode';
  private readonly LIGHT_THEME = 'light-mode';

  constructor() {}

  initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    const isDarkMode =
      savedTheme === this.DARK_THEME ||
      (!savedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    this.setTheme(isDarkMode);
    return isDarkMode;
  }
  setTheme(isDarkMode: boolean) {
    const theme = isDarkMode ? this.DARK_THEME : this.LIGHT_THEME;
    document.body.classList.toggle(this.DARK_THEME, isDarkMode);
    document.body.classList.toggle(this.LIGHT_THEME, !isDarkMode);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  get isDarkMode(): boolean {
    return document.body.classList.contains(this.DARK_THEME);
  }
}
