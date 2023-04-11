import { AddUserComponent } from './components/views/add-user/add-user.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditUserComponent } from './components/views/edit-user/edit-user.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from './services/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { UsersComponent } from './components/views/users/users.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    InputSwitchModule,
    InputTextModule,
    RadioButtonModule,
    TableModule,
    ToggleButtonModule
  ],
  providers: [
    HttpClientService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
