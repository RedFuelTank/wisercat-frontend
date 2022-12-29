import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PetForm} from "./model/pet-form";
import {PetsPage} from "./model/PetsPage";
import {SortColumn, SortDirection} from "./sortable-header.directive";
import {PetData} from "./model/pet-data";

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

  public getAllPets(size: number, currentPage: number) {
    return this.http.get<PetsPage>(PetsService.REST_API_SERVER + `/pets?size=${size}&page=${currentPage}`)
  }

  public getAllPetsSort(size: number, currentPage: number, column: SortColumn, direction: SortDirection) {
    return this.http.get<PetsPage>(PetsService.REST_API_SERVER + `/pets?size=${size}&page=${currentPage}&sort=${column},${direction}`)
  }

  public getPet(user: string, id: number) {
    return this.http.get<PetData>(PetsService.REST_API_SERVER + `/${user}/pets/${id}`)
  }

  public editPet(user: string, petData: PetData) {
    this.http.put<any>(PetsService.REST_API_SERVER + `/${user}/pets`, petData).subscribe()
  }

  public deletePet(user: string, id: number) {
    this.http.delete(PetsService.REST_API_SERVER + `/${user}/pets/${id}`).subscribe()
  }

  getPetAdmin(id: number) {
    return this.http.get<PetData>(PetsService.REST_API_SERVER + `/pets/${id}`)
  }
}
