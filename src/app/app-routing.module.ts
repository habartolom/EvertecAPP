import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/views/users/users.component';
import { AddUserComponent } from './components/views/add-user/add-user.component';
import { EditUserComponent } from './components/views/edit-user/edit-user.component';

const routes: Routes = [
    { path : '', component: UsersComponent },
    { path : 'add-user', component: AddUserComponent },
    { path : 'edit-user/:id', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
