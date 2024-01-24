import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee, IEmployee } from './employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  private employeesDatas!: Employee[];
  employees: Employee[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPage!: number;
  filterKeyword: string = '';
  private sortBy = {
    column: '',
    isAscending: true,
  };
  

  constructor(private employeeService: EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.fillEmployees();
  }

  private loadTableInfo() {
    const tableInfo = localStorage.getItem('tableInfo');
    if (tableInfo) {
      localStorage.removeItem('tableInfo');
      const info = JSON.parse(tableInfo);
      this.filterKeyword = info.filterKeyword;
      this.filterEmployees();
      this.sortBy = info.sortBy;
      this.pageSize = info.pageSize;
      this.pageNumber = info.pageNumber;
    }
  }

  fillEmployees() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employeesDatas = (response as any[]).map((employee) => {
          return new Employee(employee);
        });
        this.employees = this.employeesDatas;
        this.totalPage = Math.ceil(this.employees.length / this.pageSize);
        this.loadTableInfo();
      },
      error: () => {
        this.employeesDatas = [];
      },
    });
  }

  getEmployees(): Employee[] {
    return this.employees.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageNumber * this.pageSize
    );
  }

  filterEmployees() {
    this.employees = this.employeesDatas.filter((employee) =>
      employee.isContain(this.filterKeyword)
    );
    this.resetPage();
  }

  changePageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

 resetPage() {
    this.totalPage = Math.ceil(this.employees.length / this.pageSize);
    this.totalPage = this.totalPage == 0? 1 : this.totalPage;
    this.pageNumber = 1;
  }

  changeSort(column: string) {
    if (this.sortBy.column == column) {
      this.sortBy.isAscending = !this.sortBy.isAscending;
    } else {
      this.sortBy.column = column;
      this.sortBy.isAscending = true;
    }
    this.sortEmployees();
  }

  private sortEmployees() {
    this.employees = this.employees.sort((a, b) => {
      if (this.sortBy.isAscending) {
        return a[this.sortBy.column as keyof Employee].toString().toLowerCase() > b[this.sortBy.column as keyof Employee].toString().toLowerCase() ? 1 : -1;
      } else {
        return a[this.sortBy.column as keyof Employee].toString().toLowerCase() < b[this.sortBy.column as keyof Employee].toString().toLowerCase() ? 1 : -1;
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure?')) {
      this.employeeService.delete(id).subscribe({
        next: (response) => {
          alert('Delete success');
          this.fillEmployees();
        },
        error: () => {
          console.log('Error');
        },
      });
    }
  }
  editEmployee(id: string) {
    this.router.navigate([`/employee/update/${id}`]);
  }
  seeDetail(id: string) {
    const tableInfo = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      filterKeyword: this.filterKeyword,
      sortBy: this.sortBy,
    };
    localStorage.setItem('tableInfo', JSON.stringify(tableInfo));
    this.router.navigate([`/employee/detail/${id}`]);
  }
  logout(){
    localStorage.removeItem('tableInfo');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
