import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user';
import { userService } from '../../core/services/user';
import { EditDialog } from '../../components/edit-dialog/edit-dialog';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatSlideToggleModule, MatDivider, MatSelectModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly route = inject(ActivatedRoute)
  private readonly userId = Number(this.route.snapshot.paramMap.get("id"))
  private readonly userService = inject(userService)
  protected user: WritableSignal<User> = signal({} as User)
  
  ngOnInit(): void{
    this.userService.getUser(this.userId!).subscribe((user)=>{
      this.user.set({
        id: user.id,
        createdAt: user.createdAt,
        profileName: user.profileName,
        profilePhoto: user.profilePhoto
      })
    })
  }
  
  readonly dialog = inject(MatDialog)

  openDialog(id: number){
    this.dialog.open(EditDialog, {
      data: {id}
    })
  }
}
