import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { TypedResponseModel } from '../models/typed-response-model';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs';
import { CivilStatusModel } from '../models/civil-status-model';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private createUserEndpoint : string;
    private deleteUserEndpoint : string;
    private editUserEndpoint : string;
    private getAllUsersEndpoint : string;
    private getUserByIdEndpoint : string;
    private getAllCivilStatusesEndpoint : string;

    constructor(private httpClient : HttpClientService) {
        this.createUserEndpoint = 'users/create';
        this.deleteUserEndpoint = 'users/delete';
        this.editUserEndpoint = 'users/edit';
        this.getAllCivilStatusesEndpoint = 'civilStatuses/all';
        this.getAllUsersEndpoint = 'users/all';
        this.getUserByIdEndpoint = 'users/get/';
    }

    public createUser(user: UserModel): Observable<TypedResponseModel<UserModel>>{
        const formData = new FormData();
        formData.append('Name', user.name);
        formData.append('Lastname', user.lastName);
        formData.append('Birthdate', user.birthdate.toISOString());
        formData.append('Photo', user.photo);
        formData.append('CivilStatusId', '' + user.civilStatus.civilStatusId);
        formData.append('HasSilbings', '' + user.hasSilbings);
        return this.httpClient.sendPostFormDataRequest(this.createUserEndpoint, formData);
    }

    public editUser(user: UserModel): Observable<TypedResponseModel<UserModel>>{
        const formData = new FormData();
        formData.append('UserId', user.userId);
        formData.append('HasSilbings', '' + user.hasSilbings);
        if (user.name) formData.append('Name', user.name);
        if (user.lastName) formData.append('Lastname', user.lastName);
        if (user.birthdate) formData.append('Birthdate', user.birthdate.toISOString());
        if (user.photo) formData.append('Photo', user.photo);
        if (user.civilStatus?.civilStatusId) formData.append('CivilStatusId', '' + user.civilStatus?.civilStatusId);
        return this.httpClient.sendPutFormDataRequest(this.editUserEndpoint, formData);
    }

    public deleteUser(userId: string): Observable<ResponseModel>{
        return this.httpClient.sendDeleteRequest(this.deleteUserEndpoint, undefined, { userId: userId })
    }

    public getAllCivilStatuses() : Observable<TypedResponseModel<CivilStatusModel[]>>{
        return this.httpClient.sendGetRequest(this.getAllCivilStatusesEndpoint)
    }

    public getAllUsers() : Observable<TypedResponseModel<UserModel[]>>{
        return this.httpClient.sendGetRequest(this.getAllUsersEndpoint)
    }

    public getUserById(userId: string) : Observable<TypedResponseModel<UserModel>>{
        return this.httpClient.sendGetRequest(this.getUserByIdEndpoint + userId)
    }


}
