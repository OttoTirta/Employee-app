import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee, IEmployee } from '../employee.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  groups: string[] = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile', 'Tester', 'Manager', 'HR', 'Accountant', 'UI/UX'];

  constructor(private activeRoute:ActivatedRoute, private employeeServices:EmployeeService, private formBuilder:FormBuilder, private router:Router) { }
  ngOnInit(): void {
    this.updateForm = this.createForm();
    
    let id = this.activeRoute.snapshot.params['id'];
    this.getEmployee(id);
  }

  getEmployee(id:string|number){
      this.employeeServices.getById(id).subscribe({
        next: (response) => {
          let employee = new Employee(response);
          this.updateForm.setValue({
            id: employee.id,
            username: employee.username,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            birthdate: employee.getbirthdateString(),
            basicSalary: employee.basicSalary,
            status: employee.status,
            group: employee.group,
            description: employee.description
          });
        },
        error: () => {
          console.log("Error");
        }
      });
  }
  createForm() {
    return this.formBuilder.group({
      id: [],
      username: ['', Validators.required], 
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      birthdate: ['', Validators.required],
      basicSalary: ['', Validators.compose([Validators.required, Validators.min(0)])], 
      status: [],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onSubmit(){
    let editedEmployee = {
      id: this.updateForm.value.id,
      username: this.updateForm.value.username,
      firstName: this.updateForm.value.firstName,
      lastName: this.updateForm.value.lastName,
      email: this.updateForm.value.email,
      birthDate: this.changeFormatDate(this.updateForm.value.birthdate),
      basicSalary: this.updateForm.value.basicSalary,
      status: this.updateForm.value.status? this.updateForm.value.status : false,
      group: this.updateForm.value.group,
      description: this.updateForm.value.description
    }
    this.employeeServices.update(editedEmployee).subscribe({
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
  get formValidation(){
    return {
      username: this.updateForm.controls['username'],
      firstName: this.updateForm.controls['firstName'],
      lastName: this.updateForm.controls['lastName'],
      email: this.updateForm.controls['email'],
      birthdate: this.updateForm.controls['birthdate'],
      basicSalary: this.updateForm.controls['basicSalary'],
      group: this.updateForm.controls['group'],
      description: this.updateForm.controls['description']
    }
  }
}
