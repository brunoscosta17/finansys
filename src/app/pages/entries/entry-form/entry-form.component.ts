import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.sass']
})
export class EntryFormComponent implements OnInit {

  currentAction: string = '';
  entryForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // PRIVATE METHODS

  private setCurrentAction() {
    this.route.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
      type: [null, [Validators.required]],
      value: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params: Params) => this.entryService.getById(params.get('id')))
        )
        .subscribe(
          (entry) => {
            this.entry = entry;
            this.entryForm?.patchValue(entry);
          },
          (error) => alert('Erro no servidor. Tente novamente mais tarde.')
        );
    }
  }

  private setPageTitle() {
    const entryName = this.entry.name || '';
    this.currentAction === 'new' ? this.pageTitle = 'Cadastro de Novo Lançamento' : this.pageTitle = `Editando Lançamento: ${entryName}`;
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(entry: Entry) {
    this.toastr.success('Solicitação processada com sucesso!');
    this.router
      .navigateByUrl('categories', { skipLocationChange: true })
      .then(() => this.router.navigate(['categories', 'edit', entry.id]));
  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    error.status === 422 ? this.serverErrorMessages = JSON.parse(error._body).errors : this.serverErrorMessages = [`Status: ${error.status}. ${error.statusText}. Falha na comunicação com o servidor.`];
  }

  // PUBLIC METHODS

  submitForm() {
    this.submittingForm = true;
    this.currentAction === 'new' ? this.createEntry() : this.updateEntry();
  }

}
