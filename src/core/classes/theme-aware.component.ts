import { inject } from '@angular/core';
import { ThemeService } from '../services/theme.service/theme.service';

export abstract class ThemeAwareComponent {
  protected themeService = inject(ThemeService);
  protected isDarkMode = this.themeService.isDarkMode;
}
