import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PetForm} from "../model/pet-form";
import {Router} from "@angular/router";
import {PetsService} from "../pets.service";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  petFormHolder : PetForm = {
    code: "",
    name: "",
    type: "",
    furColor: "",
    countryOrigin: ""
  }

  private userUsername : string

  petForm: FormGroup = new FormGroup({
    "name": new FormControl(this.petFormHolder.name, [Validators.required]),
    "code": new FormControl(this.petFormHolder.code, [Validators.required]),
    "typeSelector": new FormControl(this.petFormHolder.type, [Validators.required]),
    "furColorSelector": new FormControl(this.petFormHolder.furColor, [Validators.required]),
    "countryOriginSelector": new FormControl(this.petFormHolder.countryOrigin, [Validators.required])
  });

  constructor(private service: PetsService, private route: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
  }

  submit() {
    this.petFormHolder.name = this.petForm.get("name")!.value
    this.petFormHolder.code = this.petForm.get("code")!.value
    this.petFormHolder.type = this.petForm.get("typeSelector")!.value.toUpperCase()
    this.petFormHolder.furColor = this.petForm.get("furColorSelector")!.value.toUpperCase()
    this.petFormHolder.countryOrigin = this.petForm.get("countryOriginSelector")!.value.toUpperCase()
    this.service.postPet(this.userUsername, this.petFormHolder)
    this.route.navigate(["/my-pets"])
  }
}
