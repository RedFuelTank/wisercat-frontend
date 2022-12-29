import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {PetsService} from "../pets.service";
import {
  CountryOrigin,
  CountryOriginMapping,
  FurColor,
  FurColorMapping,
  PetData,
  PetType,
  PetTypeMapping,
} from "../model/pet-data";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  public pet!: PetData
  public id!: number
  public userUsername!: string
  public petTypeMapping = PetTypeMapping
  public furColorMapping = FurColorMapping
  public countryOriginMapping = CountryOriginMapping

  public petTypes = Object.values(PetType)
  public furColors = Object.values(FurColor)
  public countriesOrigin = Object.values(CountryOrigin)

  petForm!: FormGroup

  constructor(private service: PetsService, private activeRoute: ActivatedRoute, private route: Router) {
    activeRoute.params.subscribe(params => this.id = params['id'])
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
    this.loadPet(this.userUsername, this.id)
  }

  loadPet(user: string, id: number) {
    this.service.getPet(user, id).subscribe(pet => {
      this.pet = pet
      this.petForm = new FormGroup({
        "name": new FormControl(this.pet.name, [Validators.required]),
        "code": new FormControl(this.pet.code, [Validators.required]),
        "typeSelector": new FormControl(this.petTypeMapping[this.pet.type], [Validators.required]),
        "furColorSelector": new FormControl(this.furColorMapping[this.pet.furColor], [Validators.required]),
        "countryOriginSelector": new FormControl(this.countryOriginMapping[this.pet.countryOrigin], [Validators.required])
      });
    })
  }

  submit() {
    this.pet.name = this.petForm.get("name")!.value
    this.pet.code = this.petForm.get("code")!.value
    this.pet.type = this.petForm.get("typeSelector")!.value.toUpperCase()
    this.pet.furColor = this.petForm.get("furColorSelector")!.value.toUpperCase()
    this.pet.countryOrigin = this.petForm.get("countryOriginSelector")!.value.toUpperCase()
    this.service.editPet(this.userUsername, this.pet);
    this.route.navigate(["/my-pets"])
  }

  delete() {
    this.service.deletePet(this.userUsername, this.id)
    this.route.navigate(["/my-pets"])
  }
}
