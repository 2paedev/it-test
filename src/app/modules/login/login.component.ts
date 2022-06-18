import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IApiError } from './../../shared/models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: IApiError;

  get fc() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.user && this.authService.user.id !== -1) {
      this.router.navigate(['/']);
    }
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const bodyParams = {
      username: this.fc['username'].value,
      password: this.fc['password'].value,
    };

    this.authService
      .login(bodyParams)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        complete: () => {},
        error: (error: IApiError) => {
          this.error = error;
        },
      });
  }
}
