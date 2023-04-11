import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    public users!: UserModel[];
    public showNotification: boolean;
    public notificationMessage: string;

    constructor(
        private router: Router,
        private userService: UserService
    )
    {
        this.showNotification = false;
        this.notificationMessage = '';
    }

    ngOnInit(): void {
        this.userService.getAllUsers()
            .subscribe(response => {
                this.users = response.data;
            });
    }

    public createUser(){
        this.router.navigate(['/add-user']);
    }

    public editUser(userId: string){
        this.router.navigate(['/edit-user', userId]);
    }

    public removeUser(userId: string){
        this.userService.deleteUser(userId)
            .subscribe(response => {
                if(response.header.code == 200){
                    this.users = this.users.filter(x => x.userId != userId);
                    this.notificationMessage = 'Se ha eliminado el usuario con éxito';
                    this.showNotification = true;
                }
                else{
                    this.notificationMessage = 'Ha ocurrido un error, vuelva a intentarlo más tarde'
                    this.showNotification = true;
                }
            }, error => {
                this.notificationMessage = 'Ha ocurrido un error, vuelva a intentarlo más tarde'
                this.showNotification = true;
            });
    }
}
