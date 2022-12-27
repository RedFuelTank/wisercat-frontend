import { Component, OnInit } from '@angular/core';
import {Pet} from "../model/Pet";
import {ActivatedRoute, Router} from "@angular/router";
import {PetsService} from "../pets.service";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  public petsOnPage!: Pet[];
  public userUsername!: string

  constructor(private service: PetsService, private activatedRoute: ActivatedRoute, private route: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
    this.loadCurrentUserPets()
  }

  public loadCurrentUserPets() {
    this.petsOnPage = []
    this.service.getOffers(this.userUsername).subscribe(
      pets => this.petsOnPage = pets
    )
  }

}
