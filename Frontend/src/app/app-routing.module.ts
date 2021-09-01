import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { StdformComponent } from './stdform/stdform.component';
import { StdhomeComponent } from './stdhome/stdhome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StdlistComponent } from './stdlist/stdlist.component';
import { StudentComponent } from './student/student.component';
import { NewemployerComponent } from './newemployer/newemployer.component';
import { StdregComponent } from './stdreg/stdreg.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ViewprofComponent } from './viewprof/viewprof.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'studentlogin',
    component: StudentloginComponent
  },
  {
    path: 'studentsignup',
    component: StudentsignupComponent
  },
  {
    path: 'studenthome',
    component: StudenthomeComponent,
    children: [
      {path: 'stdhome', component:StdhomeComponent},
      {path: 'stdhome/stdform', component:StdformComponent},
      {path: 'stdhome/viewprofile', component:ViewprofileComponent},
      {path: 'stdhome/editprofile', component:EditprofileComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'signup',
    component: SignupComponent 
  },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    children: [
      {path: 'dashboard', component:DashboardComponent},
      {path: 'dashboard/stdlist', component:StdlistComponent},
      {path: 'dashboard/stdlist/student', component:StudentComponent},
      {path: 'dashboard/stdreg', component:StdregComponent},
      {path: 'students', component:StudentsComponent},
      {path: 'students/viewprof', component:ViewprofComponent},
      {path: 'courses', component:CoursesComponent}
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
