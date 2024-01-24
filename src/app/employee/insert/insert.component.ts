import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee, IEmployee } from '../employee.model';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {
    insertForm!: FormGroup;
    groups: string[] = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile', 'Tester', 'Manager', 'HR', 'Accountant', 'UI/UX'];

    constructor(private formBuilder:FormBuilder, private router:Router, private employeeService:EmployeeService) {
      this.insertForm = this.createForm();
    }

    createForm() {
      return this.formBuilder.group({
        username: ['', Validators.required], 
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        birthdate: ['', Validators.required],
        basicSalary: ['', Validators.required], 
        status: [],
        group: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
    onSubmit(){ 
      console.log(this.insertForm);
      let newEmployee = {
        username: this.insertForm.value.username,
        firstName: this.insertForm.value.firstName,
        lastName: this.insertForm.value.lastName,
        email: this.insertForm.value.email,
        birthDate: this.changeFormatDate(this.insertForm.value.birthdate),
        basicSalary: this.insertForm.value.basicSalary,
        status: this.insertForm.value.status? this.insertForm.value.status : false,
        group: this.insertForm.value.group,
        description: this.insertForm.value.description
      }
      this.employeeService.insert(newEmployee).subscribe({
        next: () => {
          this.router.navigate(['/employee']);
        },
        error: () => {
          console.log("Error");
        }
      });
    }
    private changeFormatDate(date:string){
      const splitDate = date.split('T')[0].split('-');
      return [splitDate[1], splitDate[2], splitDate[0]].join('/');
    }
}
