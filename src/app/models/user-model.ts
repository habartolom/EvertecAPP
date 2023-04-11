import { CivilStatusModel } from "./civil-status-model";

export class UserModel {
    public userId! : string;
    public name! : string;
    public lastName! : string;
    public birthdate! : Date;
    public photoUrl! : string;
    public civilStatus! : CivilStatusModel;
    public hasSilbings! : boolean;
    public photo!: File;
}
