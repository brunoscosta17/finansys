import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  submittingForm = false;
  category: Category = new Category();
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  private setCurrentAction(): void {
    this.route.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory(): void {
    this.route.params.subscribe(params => this.id = params.id);
    if (this.currentAction === 'edit') {
      this.categoryService.getById(this.id)
        .subscribe(category => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        }, (e) => this.toastr.error(e));
    }
  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de nova categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando categoria ' + categoryName;
    }
  }

}
