import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  detailForm!: FormGroup;
  loginFailed: boolean = false;
  credentials = {
    username: 'Admin',
    password: 'admin123'
  }

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.detailForm = this.createForm();
  }

  createForm(){
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
    });
  }

  closeFailedLoginAlert(){
    this.loginFailed = false;
  }

  onSubmit(){
    if(this.detailForm.value.username == this.credentials.username && this.detailForm.value.password == this.credentials.password){
      localStorage.setItem('token', 'token');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 300);
    }else{
      this.loginFailed = true;
      this.detailForm.setValue({username: this.detailForm.value.username, password: ''});
      console.log(this.detailForm);
    }
  }

}
