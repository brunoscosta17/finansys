import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = [];

  ngOnInit(): void {

    this.categoryService
      .getAll()
      .subscribe(categories => {
        this.categories = categories;
      }, error => alert('Erro ao carregar categorias!'));
  
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id)
      .subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('Erro ao tentar excluir!')
      );
  }

}