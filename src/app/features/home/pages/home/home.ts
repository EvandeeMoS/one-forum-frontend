import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { TopicList } from "../../components/topic-list/topic-list";
import { AuthService } from '../../../../core/services/auth.service';
import { HomeService } from '../../home.service';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AsyncPipe } from '@angular/common';
import { TopicDialog } from '../../../../shared/components/topic-dialog/topic-dialog';
import { MatDialog } from '@angular/material/dialog';
import { TopicService } from '../../../../core/services/topics.service';
import { CategoryService } from '../../category.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    TopicList,
    SearchBar,
    AsyncPipe,
    MatIcon
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(AuthService);
  homeService = inject(HomeService);
  dialogService = inject(MatDialog);
  topicService = inject(TopicService);
  categoryService = inject(CategoryService);

  ngOnInit() {
  }

  createTopicBtnClick() {
    this.dialogService.open(TopicDialog, {
      
      width: 'auto',
      maxWidth: 'none',
      data: {
        mode: 'create'
      }
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.topicService.createTopic({
        content: result.content,
        categories: result.categories,
        title: result.title
      }).subscribe({
        complete: () => {
          this.homeService.refreshResults();
          this.categoryService.reloadCategories();
        }
      });
    });
    
  }
}
