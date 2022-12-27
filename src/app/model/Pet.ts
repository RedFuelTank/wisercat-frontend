export class Pet {
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

enum CountryOrigin {
  Estonia = "ESTONIA",
  Finland = "FINLAND"
}

enum FurColor {
  Black = "BLACK",
  Brown = "BROWN"
}

enum PetType {
  Rabbit = "RABBIT",
  Cat = "CAT"
}
