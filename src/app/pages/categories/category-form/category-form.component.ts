import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    // this.loadCategory();
    this.toastr.success('I\'m a toast!', 'Success!');
  }

  ngAfterContentChecked(): void {
  }

  // tslint:disable-next-line: typedef
  private setCurrentAction(): void {
    // tslint:disable-next-line: no-unused-expression
    this.route.snapshot.url[0].path === 'new' ? this.currentAction === 'new' : this.currentAction === 'edit';
  }

  // tslint:disable-next-line: typedef
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null]
    });
  }

}

// import { Component, OnInit, AfterContentChecked } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs/operators';

// import { Category } from '../shared/category.model';
// import { CategoryService } from '../shared/category.service';

// import toastr from 'toastr';
// import { Toast } from 'ngx-toastr';

// @Component({
//   selector: 'app-category-form',
//   templateUrl: './category-form.component.html',
//   styleUrls: ['./category-form.component.sass']
// })
// export class CategoryFormComponent implements OnInit, AfterContentChecked {

//   currentAction!: string;
//   categoryForm!: FormGroup;
//   pageTitle!: string;
//   serverErrorMessages: string[] = [];
//   submittingForm = false;
//   category: Category = new Category();

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private formBuilder: FormBuilder,
//     private categoryService: CategoryService,
//     private toastr: Toast
//   ) { }

//   ngOnInit(): void {
//     // this.setCurrentAction();
//     // this.buildCategoryForm();
//     // this.loadCategory();
//   }

//   ngAfterContentChecked(): void {

//   }

// }
