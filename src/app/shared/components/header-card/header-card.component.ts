import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-card',
  imports: [RouterLink],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})
export class HeaderCardComponent implements OnInit {
  userName = '';

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      const currentUser = JSON.parse(user);
      this.userName = currentUser.userName;
    }
  }
}
