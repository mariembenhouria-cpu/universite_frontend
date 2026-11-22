
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('Universite');

  constructor(
    public authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    let isloggedin = localStorage.getItem('isloggedIn');
    let loggedUser = localStorage.getItem('loggedUser');

    if (isloggedin !== 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
