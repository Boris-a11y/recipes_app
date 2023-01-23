import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.min(5)]],
    password: ['', Validators.required],
    age: [undefined, Validators.required],
  });

  hide = true;

  onSubmitRegister(): void {
    const { username, password, age }: User = this.registerForm.value;

    this.authService.register(username, password, age).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('clicked');
  }

  ngOnInit(): void {}
}
