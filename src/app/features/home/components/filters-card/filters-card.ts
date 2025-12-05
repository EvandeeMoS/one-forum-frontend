import { Component, ElementRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CategoryService } from '../../../../core/services/category.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipOption, MatChipSelectionChange, MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { Category } from '../../model/category.model';
import { HomeService } from '../../home.service';
import { StatusFlag } from '../../model/status-flag.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters-card',
  imports: [
    MatCardModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatChipsModule, 
    MatButtonModule, 
    MatFormFieldModule
  ],
  templateUrl: './filters-card.html',
  styleUrl: './filters-card.css',
})
export class FiltersCard {
  private readonly categoryService = inject(CategoryService);
  private readonly homeService = inject(HomeService);
  readonly statusFlagEnumm = StatusFlag;

  statusFlag = signal(StatusFlag.OK);
  allCategories = signal<Category[]>([])

  selectedCategory: number | null = null;

  @ViewChildren('categoryOpt') categoryRefList!: QueryList<MatChipOption>;
  
  private categoryListChangesSubscription?: Subscription;
  private initSelectedChipSubscription?: Subscription;

  ngOnInit() {
    this.loadCategories();
    this.homeService.filters$.subscribe(state => {
      if (state.category) {
        this.allCategories
      }
    })
  }

  ngAfterViewInit() {
    this.categoryListChangesSubscription = this.categoryRefList.changes.subscribe(
      (newList: QueryList<MatChipOption>) => {        
        this.selectChipFromUrlFilter();
      }
    );
    
    if (this.categoryRefList.length > 0) {
      this.selectChipFromUrlFilter();
    }
  }

  ngOnDestroy() {
    this.categoryListChangesSubscription?.unsubscribe();
    this.initSelectedChipSubscription?.unsubscribe();
  }

  selectChipById(categoryId: number) {
    const chipToSelect = this.categoryRefList.find(
      (chipInstance: MatChipOption) => {
        const idAsString = chipInstance._elementRef.nativeElement.getAttribute('data-category-id');
        return idAsString === categoryId.toString();
      }
    );

    if (chipToSelect && !chipToSelect.selected) {
      chipToSelect.select()
    }
  }

  selectChipFromUrlFilter() {
    this.initSelectedChipSubscription = this.homeService.filters$.subscribe(data => {
      if (data.category !== null && data.category !== undefined) {
        this.selectChipById(data.category);
      }
    });
  }

  loadCategories() {
    this.statusFlag.set(StatusFlag.LOADING);
    this.categoryService.getAllCategories().subscribe({
      next: categoriesList => {
        this.allCategories.set(categoriesList);
        this.statusFlag.set(StatusFlag.OK);
      },
      error: err => {
        this.statusFlag.set(StatusFlag.ERROR);
      }
    });
  }

  selectFilter(event: MatChipSelectionChange, categoryId: number) {
    if (event.selected) {
      this.homeService.setFilters({category: categoryId});
      return;
    }
    this.homeService.setFilters({category: undefined});
  }
}
