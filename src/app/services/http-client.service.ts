import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient){ }

  public sendDeleteRequest(endPoint: string, baseUrl?: string, params?: any){
    const url = this.getUrl(baseUrl, endPoint, params);
    return this.httpClient.delete<any>(url);
  }

  public sendGetRequest(endPoint: string, baseUrl?: string, params?: any){
    const url = this.getUrl(baseUrl, endPoint, params);
    return this.httpClient.get<any>(url);
  }

  public sendPostRequest(endPoint: string, contract: any, baseUrl?: string, params?: any){
    const url = this.getUrl(baseUrl, endPoint, params);
    return this.httpClient.post<any>(url, JSON.stringify(contract));
  }

  public sendPostFormDataRequest(endPoint: string, formData: FormData, baseUrl?: string, params?: any){
    const url = this.getUrl(baseUrl, endPoint, params);
    return this.httpClient.post<any>(url, formData);
  }

  public sendPutFormDataRequest(endPoint: string, formData: FormData, baseUrl?: string, params?: any){
    const url = this.getUrl(baseUrl, endPoint, params);
    return this.httpClient.put<any>(url, formData);
  }

  private getUrl(baseUrl?: string, endPoint?: string, params?: any): string {
    let url = baseUrl ?? environment.webApi;
    url += endPoint;

    if(params){
      const urlSearchParams = new URLSearchParams();
      Object.keys(params).forEach(key => urlSearchParams.set(key, params[key]));
      const queryString = urlSearchParams.toString();
      if(queryString) { url += `?${queryString}` }
    }
    return url;
  }

}
