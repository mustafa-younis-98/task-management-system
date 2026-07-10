import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logout-confirm-modal',
  imports: [],
  templateUrl: './logout-confirm-modal.component.html',
  styleUrl: './logout-confirm-modal.component.css',
})
export class LogoutConfirmModalComponent {
  readonly modal = inject(NgbActiveModal);
}
