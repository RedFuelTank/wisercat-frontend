export class PetData {
  public id: number
  public ownerUsername : string
  public code : string
  public name: string
  public type: PetType
  public furColor: FurColor
  public countryOrigin: CountryOrigin

  constructor(id: number, ownerUsername: string, code: string, name: string, type: string, furColor: string, countryOrigin: string) {
    this.id = id;
    this.ownerUsername = ownerUsername;
    this.code = code;
    this.name = name;
    this.type = type as PetType;
    this.furColor = furColor as FurColor;
    this.countryOrigin = countryOrigin as CountryOrigin;
  }
}

export enum CountryOrigin {
  Estonia = "ESTONIA",
  Finland = "FINLAND"
}

export const CountryOriginMapping : Record<CountryOrigin, string>= {
  [CountryOrigin.Estonia]: "Estonia",
  [CountryOrigin.Finland]: "Finland"
}

 export enum FurColor {
  Black = "BLACK",
  Brown = "BROWN"
}

export const FurColorMapping: Record<FurColor, string> = {
  [FurColor.Black]: "Black",
  [FurColor.Brown]: "Brown"
}

 export enum PetType {
  Rabbit = "RABBIT",
  Cat = "CAT"
}

export const PetTypeMapping: Record<PetType, string> = {
  [PetType.Rabbit]: "Rabbit",
  [PetType.Cat]: "Cat"
}
