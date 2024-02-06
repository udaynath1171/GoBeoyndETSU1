import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm!: FormGroup; // Use the non-null assertion operator

  hide = true;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  getErrorMessage() {
    if (this.email?.hasError("required")) {
      // Use optional chaining
      return "You must enter a value";
    }

    return this.email?.hasError("email") ? "Not a valid email" : "";
  }

  login() {
    // Implement your login logic here
    console.log("Logging in...");
    if (this.loginForm.valid) {
      const formData = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(formData);
      // Make HTTP POST request to your API
      this.http
        .post<any>("http://localhost:8080/api/users/login", formData)
        .subscribe(
          (response) => {
            console.log("API response:", response);
            // Optionally, reset the form after successful login
            this.loginForm.reset();
            // Optionally, redirect the user to another page
          },
          (error) => {
            console.error("API error:", error);
            // Optionally, handle the error (e.g., display error message to the user)
          }
        );
    } else {
      // Form is invalid, handle accordingly (e.g., display error message)
    }
  }
}
