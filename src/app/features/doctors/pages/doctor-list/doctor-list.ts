import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DoctorCard } from "../../components/doctor-card/doctor-card";

@Component({
  selector: 'app-doctor-list',
  imports: [RouterLink, DoctorCard],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.scss',
})
export class DoctorList {

}
