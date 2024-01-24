import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DetailComponent } from './employee/detail/detail.component';
import { InsertComponent } from './employee/insert/insert.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './employee/update/update.component';
import { AuthGuard, UnauthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'employee',
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        component:EmployeeComponent
      },
      {
        path:'detail/:id',
        component:DetailComponent
      },
      {
        path:'insert',
        component:InsertComponent
      },
      {
        path:'update/:id',
        component:UpdateComponent
      }
    ]
  },
  {
    path:'login',
    canActivate: [UnauthGuard],
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'employee',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
