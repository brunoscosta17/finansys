import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.sass']
})
export class EntryListComponent implements OnInit {

  constructor(
    private entryService: EntryService,
    private toastr: ToastrService
    ) { }

  entries: Entry[] = [];

  ngOnInit(): void {

    this.entryService
      .getAll()
      .subscribe(entries => this.entries = entries, error => alert('Erro ao carregar lançamentogit add s!'));
  }

  deleteEntry(entry: Entry): void {
    this.entryService.delete(entry.id)
      .subscribe(
        () => {
          this.entries = this.entries.filter(element => element !== entry);
          this.toastr.success('Lançamento excluido com sucesso!');
        },
        () => this.toastr.error('Erro ao tentar excluir lançamentogit add !')
      );
  }

}
