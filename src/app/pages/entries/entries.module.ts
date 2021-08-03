import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

registerLocaleData(localePt, 'pt')

@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ]
})
export class EntriesModule { }
