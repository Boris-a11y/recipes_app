import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.min(5)]],
    password: ['', Validators.required],
  });

  isSuccessful = false;
  errorMessage = '';

  onSubmit(): void {
    const { username, password }: User = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  ngOnInit(): void {}
}
