import { Component, OnInit } from '@angular/core';
import {PetData} from "../model/pet-data";
import {ActivatedRoute, Router} from "@angular/router";
import {PetsService} from "../pets.service";
import {SortEvent} from "../sortable-header.directive";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
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
    this.loadCurrentUserPets()
  }

  public loadCurrentUserPets() {
    this.petsOnPage = []
    this.service.getPets(this.userUsername, this.size, this.currentPage).subscribe(
      page => {
        this.petsOnPage = page.content
        this.totalElements = page.totalElements
      }
    )
  }

  onSort(event: SortEvent) {
    this.service.getPetsSort(
      this.userUsername, this.size, this.currentPage, event.column, event.direction)
      .subscribe(page => {
        this.petsOnPage = page.content
        this.totalElements = page.totalElements
      })
  }
}
