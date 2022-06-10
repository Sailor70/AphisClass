import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AphisApiService} from "../../services/aphis-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-classify-aphid',
  templateUrl: './classify-aphid.component.html',
  styleUrls: ['./classify-aphid.component.scss']
})
export class ClassifyAphidComponent implements OnInit {

  readonly mainFg: FormGroup;
  readonly dateFc: FormControl;
  readonly lengthOfBodyFc: FormControl;
  readonly hindFemoraLengthFc: FormControl;
  readonly hindTibiaLenghtFc: FormControl;
  readonly numberOfSetaeOnCaudaFc: FormControl;
  readonly caudaLengthFc: FormControl;

  // classificationResult$: Observable<any>; //TODO reactive
  classificationResult: any;
  constructor(
    private aphisApiService: AphisApiService,
  ) {
    const positiveRealNumberValidator = this.createValidator(Validators.pattern("^-?[0-9]+([.,][0-9]+)?$"), 'Wymagana liczba rzeczywista dodatnia');

    this.dateFc = new FormControl(null); // this.createValidator(Validators.required, 'Należy wypełnić datę pozyskania')
    this.lengthOfBodyFc = new FormControl(null, positiveRealNumberValidator);
    this.hindFemoraLengthFc = new FormControl(null, positiveRealNumberValidator);
    this.hindTibiaLenghtFc = new FormControl(null, positiveRealNumberValidator);
    this.numberOfSetaeOnCaudaFc = new FormControl(null, this.createValidator(Validators.pattern("^[0-9]*$"), 'Wymagana liczba całkowita dodatnia')); // tylko nieujemne integery
    this.caudaLengthFc = new FormControl(null, positiveRealNumberValidator);

    this.mainFg = new FormGroup({
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
  submit(): void {
    this.mainFg.markAsDirty();
    if (this.mainFg.invalid) {
      this.mainFg.markAllAsTouched();
      return;
    }
    this.aphisApiService.classify({
      name: 'fake_name',
      date: this.dateFc.value,
      length_of_body: this.lengthOfBodyFc.value,
      hind_femora_length: this.hindFemoraLengthFc.value,
      hind_tibia_lenght: this.hindTibiaLenghtFc.value,
      number_of_setae_on_cauda: this.numberOfSetaeOnCaudaFc.value,
      cauda_length: this.caudaLengthFc.value
    }).subscribe({
        next: (res) => {
          console.log(res);
          this.classificationResult = res.result;
        },
        error: (e) => console.error(e)
      });
  }

  createValidator(baseValidatorFn: ValidatorFn, errorMessage: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } | null =>
      baseValidatorFn(control) ? {numericValidator: errorMessage} : null;
  }

}

