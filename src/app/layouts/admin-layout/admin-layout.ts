import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {

}

