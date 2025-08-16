import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cv-projects',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
})
export class ProjectsPage {}
