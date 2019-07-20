import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// imports de Angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

// imports de componentes y servicios propios
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { DataCourseComponent } from './components/data-course/data-course.component';
import { CoursesManagementComponent } from './components/courses-management/courses-management.component';
import { ConfigContentComponent } from './components/config-content/config-content.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RequestsComponent } from './components/requests/requests.component';
import { NewsManagementComponent } from './components/news-management/news-management.component';
import { DataNewsComponent } from './components/data-news/data-news.component';
import { DataCategoriesComponent } from './components/data-categories/data-categories.component';
import { CategoriesManagementComponent } from './components/categories-management/categories-management.component';
import { MessagesManagementComponent } from './components/messages-management/messages-management.component';
import { DataDeviceComponent } from './components/data-device/data-device.component';
import { DevicesManagementComponent } from './components/devices-management/devices-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    InfoDialogComponent,
    AboutUsComponent,
    ContactComponent,
    DataCourseComponent,
    CoursesManagementComponent,
    ConfigContentComponent,
    ConfirmDialogComponent,
    RequestsComponent,
    NewsManagementComponent,
    DataNewsComponent,
    DataCategoriesComponent,
    CategoriesManagementComponent,
    MessagesManagementComponent,
    DataDeviceComponent,
    DevicesManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatBadgeModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  entryComponents: [
    InfoDialogComponent,
    DataCourseComponent,
    ConfirmDialogComponent,
    DataCategoriesComponent,
    DataDeviceComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
