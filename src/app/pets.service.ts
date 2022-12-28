import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PetForm} from "./model/pet-form";
import {PetsPage} from "./model/PetsPage";

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private static REST_API_SERVER = "/api";

  constructor(private http: HttpClient) { }

  public getPets(user: string, size: number, currentPage: number) {
    return this.http.get<PetsPage>(PetsService.REST_API_SERVER + `/${user}/pets?size=${size}&page=${currentPage}`);
  }
  public getPetsSort(user: string, size: number, currentPage: number, column: string, direction: string) {
    return this.http.get<PetsPage>(PetsService.REST_API_SERVER + `/${user}/pets?size=${size}&page=${currentPage}&sort=${column},${direction}`);
  }

  public postPet(user: string, pet: PetForm) {
    this.http.post<any>(PetsService.REST_API_SERVER + `/${user}/pets`, pet).subscribe()
  }
}
