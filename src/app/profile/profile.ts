import { Component, inject } from '@angular/core';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  readonly dialog = inject(MatDialog)

  openDialog(){
    this.dialog.open(EditDialog)
  }
}

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.html',
  imports: [MatDialogModule, MatInputModule, MatAnchor, MatButtonModule]
})
export class EditDialog{

}
