import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutConfirmModalComponent } from '../logout-confirm-modal/logout-confirm-modal.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private router = inject(Router);
  private modalService = inject(NgbModal);

  logout(): void {
    const modalRef = this.modalService.open(LogoutConfirmModalComponent, {
      centered: true,
    });

    modalRef.result
      .then((result) => {
        if (result) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.router.navigate(['/login']);
        }
      })
      .catch(() => {});
  }
}
