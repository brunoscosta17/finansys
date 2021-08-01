import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Category } from './../shared/category.model';
import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string = '';
  categoryForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // PRIVATE METHODS
  private setCurrentAction() {
    this.route.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params: Params) => this.categoryService.getById(params.get('id')))
        )
        .subscribe(
          (category) => {
            this.category = category;
            this.categoryForm?.patchValue(category);
          },
          (error) => alert('Erro no servidor. Tente novamente mais tarde.')
        );
    }
  }

  private setPageTitle() {
    const categoryName = this.category.name || '';
    this.currentAction === 'new' ? this.pageTitle = 'Cadastro de Nova Categoria' : this.pageTitle = `Editando Categoria ${categoryName}`;
  }

}
