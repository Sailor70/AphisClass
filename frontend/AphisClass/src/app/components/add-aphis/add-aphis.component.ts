import { Component, OnInit } from '@angular/core';
import { Aphid } from 'src/app/models/aphid.model';
import { AphisApiService } from 'src/app/services/aphis-api.service';
@Component({
  selector: 'app-add-aphis',
  templateUrl: './add-aphis.component.html',
  styleUrls: ['./add-aphis.component.scss']
})
export class AddAphisComponent implements OnInit {
  aphid: Aphid = {
    name: '',
    date: '',
    length_of_body: 0
  };
  submitted = false;
  constructor(private aphisApiService: AphisApiService
) { }
  ngOnInit(): void {
  }
  saveAphid(): void {
    const data = {
      name: this.aphid.name,
      date: this.aphid.date,
      length_of_body: this.aphid.length_of_body
    };
    this.aphisApiService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newAphid(): void {
    this.submitted = false;
    this.aphid = {
      name: '',
      date: '',
      length_of_body: 0
    };
  }
}
