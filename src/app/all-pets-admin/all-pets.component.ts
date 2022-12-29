import { Component, OnInit } from '@angular/core';
import {PetData} from "../model/pet-data";
import {PetsService} from "../pets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SortEvent} from "../sortable-header.directive";

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.scss']
})
export class AllPetsComponent implements OnInit {

  public petsOnPage!: PetData[];
  public userUsername!: string
  public totalElements!: number
  public currentPage: number = 1
  public size: number = 2;
  public maxPagesRange: number = 5;

  constructor(private service: PetsService, private activatedRoute: ActivatedRoute, private route: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
    this.loadAllPets()
  }

  public loadAllPets() {
    this.petsOnPage = []
    this.service.getAllPets(this.size, this.currentPage).subscribe(
      page => {
        this.petsOnPage = page.content
        this.totalElements = page.totalElements
      }
    )
  }

  onSort(event: SortEvent) {
    this.service.getAllPetsSort(
      this.size, this.currentPage, event.column, event.direction)
      .subscribe(page => {
        this.petsOnPage = page.content
        this.totalElements = page.totalElements
      })
  }

  getUrl(pet: PetData) {
  }
}
