import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  signupForm!: FormGroup;
  hide = true;
  skills = new FormControl([]);
  skillOptions: string[] = [
    "Java",
    "Angular",
    ".NET",
    "Microservices",
    "ReactJS",
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ["", Validators.required],
        role: ["", Validators.required],
        skills: this.skills,
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get email() {
    return this.signupForm.get("email");
  }

  // Custom validator for password pattern
  passwordPatternValidator(control: any): { [key: string]: boolean } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (control.value && !passwordPattern.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // Custom validator for password match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getErrorMessage() {
    if (this.email?.hasError("required")) {
      // Use optional chaining
      return "You must enter a value";
    }

    return this.email?.hasError("email") ? "Not a valid email" : "";
  }

  showSuccessToast() {
    console.log("success");
    this.snackBar.open("Wait for admin's approval", "Close", {
      duration: 5000, // Adjust the duration as needed
      panelClass: ["success-toast"], // Optional: Add custom CSS class for styling
    });
  }

  signup() {
    console.log("Signing up...");
    if (this.signupForm.valid) {
      const formData = {
        username: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: this.signupForm.value.role,
        technologyNames: this.signupForm.value.skills,
      };
      console.log(formData);
      this.http
        .post("http://localhost:8080/api/users/register", formData, { responseType: 'text' })
        .subscribe(
          (response) => {
            this.showSuccessToast();
            console.log("API response:", response);
            // Optionally, reset the form after successful submission
            this.signupForm.reset();
            // Optionally, show a success message to the user
          },
          (error) => {
            this.showSuccessToast();
            console.error("API error:", error);
            // Optionally, handle the error (e.g., display error message to the user)
          }
        );
    }
  }
}
