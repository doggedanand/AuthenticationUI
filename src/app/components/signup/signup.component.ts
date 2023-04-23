import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validateform';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  typeemail: string = "email";
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]

    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.valid);
      // perform logic for signup
      this.auth.signUp(this.signUpForm.value).
        subscribe({
          next: (res) => {
            alert(res.message)
            this.signUpForm.reset();
            this.router.navigate(['']);
          }, error: (err) => {
            alert(err.error.message)
          }
        });

    } else {
      //logic for throwing error
      ValidateForm.validateAllFormField(this.signUpForm);
    }
  }
  // private validateAllFormField(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field=>{
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf:true})
  //     }else if(control instanceof FormGroup){
  //       this.validateAllFormField(control);
  //     }
  //   })
  // }
}
