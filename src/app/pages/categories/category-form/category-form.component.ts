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
    private toastr: ToastrService,
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
    this.currentAction === 'new' ? this.pageTitle = 'Cadastro de Nova Categoria' : this.pageTitle = `Editando Categoria: ${categoryName}`;
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(category: Category) {
    this.toastr.success('Solicitação processada com sucesso!');
    this.router.navigate(['categories']);
    // this.router
    //   .navigateByUrl('categories', { skipLocationChange: true })
    //   .then(() => this.router.navigate(['categories', 'edit', category.id]));
  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    error.status === 422 ? this.serverErrorMessages = JSON.parse(error._body).errors : this.serverErrorMessages = [`Status: ${error.status}. ${error.statusText}. Falha na comunicação com o servidor.`];
  }

  // PUBLIC METHODS

  submitForm() {
    this.submittingForm = true;
    this.currentAction === 'new' ? this.createCategory() : this.updateCategory();
  }

}
