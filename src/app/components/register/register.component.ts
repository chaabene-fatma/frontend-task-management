import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        if(response) {
          this.message = 'Registration successful.';
          this.messageClass = 'alert alert-info';
        }
      },
      error: () => {
        this.message = 'Registration failed';
        this.messageClass = 'alert alert-danger';
      }
    });
  }
}
