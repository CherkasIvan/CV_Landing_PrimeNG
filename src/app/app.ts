import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cv-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'CV_Landing_PrimeNG';
}
