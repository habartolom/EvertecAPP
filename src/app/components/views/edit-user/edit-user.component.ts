import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { CivilStatusModel } from 'src/app/models/civil-status-model';
import { TypedResponseModel } from 'src/app/models/typed-response-model';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
    public user!: UserModel;
    public civilStatuses!: CivilStatusModel[];
    public birthdate!: Date;
    public showNotification: boolean;
    public notificationMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    )
    {
        this.showNotification = false;
        this.notificationMessage = '';
    }

    ngOnInit() {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId !== null) {

            zip(
                this.userService.getUserById(userId),
                this.userService.getAllCivilStatuses()
            ).subscribe(results => {
                const userResult: TypedResponseModel<UserModel> = results[0];
                const civilStatusesResult: TypedResponseModel<CivilStatusModel[]> = results[1]

                this.user = userResult.data;
                this.birthdate = new Date(userResult.data.birthdate);
                this.civilStatuses = civilStatusesResult.data;
            });
        }
    }

    public onPhotoUpload(event: any){
        this.user.photo = event.files[0];
    }

    public editUser(){
        if(this.birthdate)
            this.user.birthdate = this.birthdate;

        this.userService.editUser(this.user).subscribe(response => {
            if(response.header.code == 200){
                this.user = response.data;
                this.notificationMessage = 'Se ha actualizado el usuario con éxito';
                this.showNotification = true;
            }
            else{
                console.log('Entra')
                this.notificationMessage = 'Ha ocurrido un error, vuelva a intentarlo'
                this.showNotification = true;
            }
        }, error=> {
            this.notificationMessage = 'Ha ocurrido un error, vuelva a intentarlo'
            this.showNotification = true;
        })
    }

    public goBack(){
        this.router.navigate(['/']);
    }
}
