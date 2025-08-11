import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const token = response.token; 
        this.authService.saveToken(token);
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.errorMessage = 'Email sau parolă incorecte.';
        console.error('Login error:', err);
      }
    });
  }
}
