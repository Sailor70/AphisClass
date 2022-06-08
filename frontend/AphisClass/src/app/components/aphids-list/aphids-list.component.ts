import { Component, OnInit } from '@angular/core';
import { Aphid } from 'src/app/models/aphid.model';
import { AphisApiService } from 'src/app/services/aphis-api.service';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-aphids-list',
  templateUrl: './aphids-list.component.html',
  styleUrls: ['./aphids-list.component.scss']
})
export class AphidsListComponent implements OnInit {

  aphids?: Aphid[];
  currentAphid: Aphid = {};
  currentIndex = -1;
  searchPattern = '';

  readonly mainFg: FormGroup;
  readonly nameFc: FormControl;



  constructor(private aphisApiService: AphisApiService) {
    this.nameFc = new FormControl();
    this.mainFg = new FormGroup({
      name: this.nameFc,
    });

    this.mainFg.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(() => this.searchName());

  }
  ngOnInit(): void {
    this.retrieveAphids();
  }
  retrieveAphids(): void {
    this.aphisApiService.getAll()
      .subscribe({
        next: (data) => {
          this.aphids = data;
          console.log(data);
          this.currentAphid = this.aphids[0];
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveAphids();
    this.currentAphid = {};
    this.currentIndex = -1;
  }
  setActiveAphid(aphid: Aphid, index: number): void {
    this.currentAphid = aphid;
    this.currentIndex = index;
  }
  removeAllAphids(): void {
    this.aphisApiService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchName(): void {
    this.currentAphid = {};
    this.currentIndex = -1;
    this.aphisApiService.findByName(this.nameFc.value)
      .subscribe({
        next: (data) => {
          this.aphids = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onFilterClear() {
    this.nameFc.setValue('', {emitEvent: false});
    this.retrieveAphids();
  }
}
