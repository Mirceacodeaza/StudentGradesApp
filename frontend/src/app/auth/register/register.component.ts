import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: false
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.authService.register(data).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        console.log('Register success, token:', response.token);
      },
      error: (err: any) => {
        console.error('Register failed', err);
      }
    });
    
    this.authService.login(data).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        console.log('Login success, token:', response.token);
      },
      error: (err: any) => {
        console.error('Login failed', err);
      }
    });
  }
}


