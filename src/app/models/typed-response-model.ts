import { ResponseModel } from "./response-model";

export class TypedResponseModel<T> extends ResponseModel{
    public data!: T;
}
