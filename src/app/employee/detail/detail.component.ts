import { Component, OnInit } from '@angular/core';
import { Employee, IEmployee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  employee!: Employee;

  constructor(private employeeservice:EmployeeService, private activeRoute:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.fillEmployee(id);
  }
  fillEmployee(id:string|number){
      this.employeeservice.getById(id).subscribe({
        next: (response) => {
          this.employee = new Employee(response);
        },
        error: () => {
          console.log("Error");
        }
      });
  }
  backButton(){
    this.router.navigate(['/employee']);
  }
}
