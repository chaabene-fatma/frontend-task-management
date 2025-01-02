import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: User = { email: '', password: '' };
  message: string = '';
  messageClass: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        if(response) {
          this.message = 'Registration successful';
          this.messageClass = 'text-success';
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.message = 'Registration failed';
        this.messageClass = 'text-danger';
      }
    });
  }
}
