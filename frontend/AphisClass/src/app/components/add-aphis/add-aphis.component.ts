import { Component, OnInit } from '@angular/core';
import { Aphid } from 'src/app/models/aphid.model';
import { AphisApiService } from 'src/app/services/aphis-api.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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
    const positiveRealNumberValidator = this.createValidator(Validators.pattern("^-?[0-9]+([.,][0-9]+)?$"), 'Wymagana liczba rzeczywista dodatnia');

    this.nameFc = new FormControl(null, this.createValidator(Validators.required, 'Nazwa gatunku nie może być pusta'));
    this.dateFc = new FormControl(null, this.createValidator(Validators.required, 'Należy wypełnić datę pozyskania'));
    this.lengthOfBodyFc = new FormControl(null, positiveRealNumberValidator);
    this.hindFemoraLengthFc = new FormControl(null, positiveRealNumberValidator);
    this.hindTibiaLenghtFc = new FormControl(null, positiveRealNumberValidator);
    this.numberOfSetaeOnCaudaFc = new FormControl(null, this.createValidator(Validators.pattern("^[0-9]*$"), 'Wymagana liczba całkowita dodatnia')); // tylko nieujemne integery
    this.caudaLengthFc = new FormControl(null, positiveRealNumberValidator);

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

  createValidator(baseValidatorFn: ValidatorFn, errorMessage: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } | null =>
      baseValidatorFn(control) ? {numericValidator: errorMessage} : null;
  }

}
