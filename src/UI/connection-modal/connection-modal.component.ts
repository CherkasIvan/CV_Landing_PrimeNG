import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'cv-connection-modal',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './connection-modal.component.html',
  styleUrl: './connection-modal.component.scss',
})
export class ConnectionModalComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
