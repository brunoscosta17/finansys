import { Component, OnInit } from '@angular/core';

import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.sass']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll()
      .subscribe(
        entries => {
          this.entries = entries;
        console.log(entries);
      },
        error => alert('Erro ao carregar a lista'));
  }

  deleteEntry(entry: Entry) {
    const mustConfirm = confirm('Deseja realmente excluir este item?');
    if(mustConfirm) {
      this.entryService
        .delete(entry.id)
        .subscribe(
          () => this.entries = this.entries.filter(element => element != entry),
          () => alert('Erro ao tentar excluir!'));
    }
  }

}
