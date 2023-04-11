import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CivilStatusModel } from 'src/app/models/civil-status-model';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    public user!: UserModel;
    public civilStatuses!: CivilStatusModel[];
    public uploadedFile: any;
    public showNotification: boolean;
    public notificationMessage: string;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
        this.user = new UserModel();
        this.user.hasSilbings = false;
        this.showNotification = false;
        this.notificationMessage = '';
    }

    ngOnInit() {
        this.userService.getAllCivilStatuses().subscribe(response => {
            this.civilStatuses = response.data;
        })
    }

    public onPhotoUpload(event: any){
        this.uploadedFile = event.files[0];
        this.user.photo = event.files[0];
    }

    public addUser(){
        this.userService.createUser(this.user).subscribe(response => {
            if(response.header.code == 200){
                this.notificationMessage = 'Se ha creado el usuario con éxito';
                this.showNotification = true;
            }
            else{
                console.log('Entra')
                this.notificationMessage = 'Verifique que todos los campos estén diligenciados'
                this.showNotification = true;
            }
        }, error => {
            this.notificationMessage = 'Ha ocurrido un error, verifique que todos los campos han sido diligenciados'
            this.showNotification = true;
        })
    }

    public goBack(){
        this.router.navigate(['/']);
    }
}
