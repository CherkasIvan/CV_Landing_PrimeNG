import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'cv-page-template',
  imports: [RouterOutlet, CardModule],
  standalone: true,
  templateUrl: './page-template.html',
  styleUrl: './page-template.scss',
})
export class PageTemplate {}
