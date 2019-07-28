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
import { ResourcesComponent } from './components/resources/resources.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "contact", component: ContactComponent },
  { path: "config-content", component: ConfigContentComponent },
  { path: "resources", component: ResourcesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
