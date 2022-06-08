import { Component, OnInit } from '@angular/core';
import { Aphid } from 'src/app/models/aphid.model';
import { AphisApiService } from 'src/app/services/aphis-api.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-aphis',
  templateUrl: './add-aphis.component.html',
  styleUrls: ['./add-aphis.component.scss']
})
export class AddAphisComponent implements OnInit {
  aphid: Aphid = {
    name: '',
    date: '',
    length_of_body: 0,
    hind_femora_length: 0,
    hind_tibia_lenght: 0,
    number_of_setae_on_cauda: 0,
    cauda_length: 0
  };
  readonly mainFg: FormGroup;

  readonly nameFc: FormControl;
  readonly dateFc: FormControl;
  readonly lengthOfBodyFc: FormControl;
  readonly hindFemoraLengthFc: FormControl;
  readonly hindTibiaLenghtFc: FormControl;
  readonly numberOfSetaeOnCaudaFc: FormControl;
  readonly caudaLengthFc: FormControl;

  submitted = false;
  constructor(private aphisApiService: AphisApiService
) {
    this.nameFc = new FormControl(null, Validators.compose([Validators.required, Validators.min(0)]));
    this.dateFc = new FormControl(null, Validators.required);
    this.lengthOfBodyFc = new FormControl(null, Validators.min(0));
    this.hindFemoraLengthFc = new FormControl(null, Validators.min(0));
    this.hindTibiaLenghtFc = new FormControl(null, Validators.min(0));
    this.numberOfSetaeOnCaudaFc = new FormControl(null, Validators.pattern("^[0-9]*$")); // tylko nieujemne integery
    this.caudaLengthFc = new FormControl(null, Validators.min(0));

    this.mainFg = new FormGroup({
      nameFc: this.nameFc,
      dateFc: this.dateFc,
      lengthOfBodyFc: this.lengthOfBodyFc,
      hindFemoraLengthFc: this.hindFemoraLengthFc,
      hindTibiaLenghtFc: this.hindTibiaLenghtFc,
      numberOfSetaeOnCaudaFc: this.numberOfSetaeOnCaudaFc,
      caudaLengthFc: this.caudaLengthFc,

    });
  }
  ngOnInit(): void {
  }
  saveAphid(): void {
    this.mainFg.markAsDirty();
    if (this.mainFg.invalid) {
      this.mainFg.markAllAsTouched();
      return;
    }
    const data = {
      name: this.aphid.name,
      date: this.aphid.date,
      length_of_body: this.aphid.length_of_body
    };
    this.aphisApiService.create({
      name: this.nameFc.value,
      date: this.dateFc.value,
      length_of_body: this.lengthOfBodyFc.value,
      hind_femora_length: this.hindFemoraLengthFc.value,
      hind_tibia_lenght: this.hindTibiaLenghtFc.value,
      number_of_setae_on_cauda: this.numberOfSetaeOnCaudaFc.value,
      cauda_length: this.caudaLengthFc.value
    })
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
    this.mainFg.reset();
  }
}
