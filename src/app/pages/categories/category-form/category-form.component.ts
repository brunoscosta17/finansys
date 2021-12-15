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
  form !: FormGroup;
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
    this.form  = this.formBuilder.group({
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
          this.form .patchValue(this.category);
        }, (e) => this.toastr.error(e));
    }
  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de nova categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando categoria: ' + categoryName;
    }
  }

  private createCategory(): void {
    const category: Category = Object.assign(new Category(), this.form .value);
    this.categoryService.create(category)
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private updateCategory(): void {
    const category: Category = Object.assign(new Category(), this.form .value);
    this.categoryService.update(category)
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(category: Category): void {
    if (this.currentAction === 'edit') {
      this.toastr.success('Categoria atualizada com sucesso!');
      this.router.navigate(['/categories']);
    } else {
      this.toastr.success('Categoria criada com sucesso!');
      this.router.navigate(['/categories']);
    }
  }

  private actionsForError(error: any): void {
    this.toastr.error('Erro ao salvar categoria!');
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor.'];
    }
  }

  // tslint:disable-next-line: typedef
  handleSubmit(): void {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

}
