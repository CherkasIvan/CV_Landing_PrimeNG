import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { socialLinks } from '../../utils/constants/social-links.const';

@Component({
  selector: 'cv-description-template',
  imports: [CardModule],
  standalone: true,
  templateUrl: './description-template.component.html',
  styleUrl: './description-template.component.scss',
})
export class DescriptionTemplateComponent {
  public links = socialLinks;
}
