import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatSlideToggleModule, MatDivider, MatSelectModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

}
