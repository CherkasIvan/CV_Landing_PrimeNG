import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { socialLinks } from '../../utils/constants/social-links.const';

@Component({
  selector: 'cv-description-template',
  imports: [CardModule],
  standalone: true,
  templateUrl: './description-template.html',
  styleUrl: './description-template.scss',
})
export class DescriptionTemplate {
  public links = socialLinks;
}
