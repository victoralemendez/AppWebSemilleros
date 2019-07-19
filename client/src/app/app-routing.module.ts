import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes Propios
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConfigContentComponent } from './components/config-content/config-content.component';
import { CoursesManagementComponent } from './components/courses-management/courses-management.component';
import { NoticeManagementComponent } from './components/notice-management/notice-management.component';
import { EventManagementComponent } from './components/event-managemet/event-managemet.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "contact", component: ContactComponent },
  { path: "config-content", component: ConfigContentComponent },
  //BORRAR LUEGO, LOS SIGUIENTES SON PRUEBAS
  
  { path: "notice-management", component: NoticeManagementComponent },
  { path: "event-management", component: EventManagementComponent },
  { path: 'courses-management', component: CoursesManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
