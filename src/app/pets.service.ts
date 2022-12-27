import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pet} from "./model/Pet";

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private static REST_API_SERVER = "/api";

  constructor(private http: HttpClient) { }

  public getOffers(user: string) {
    return this.http.get<Pet[]>(PetsService.REST_API_SERVER + `/${user}/pets`);
  }
}
