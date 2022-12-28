import {PetData} from "./pet-data";

export interface PetsPage {
  content : PetData[],
  totalElements: number
}
