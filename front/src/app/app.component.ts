import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}
  title = 'Recipe App!';

  LoggedIn = false;
  currentUser = '';

  ngOnInit() {
    return this.authService.me().subscribe({
      next: (data) => (this.currentUser = data.currentUser.user),
    });
  }
}
