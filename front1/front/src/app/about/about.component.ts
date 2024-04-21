import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    imports: [RouterOutlet, NavbarComponent]
})
export class AboutComponent {

}
