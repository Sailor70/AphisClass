import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AphisApiService} from 'src/app/services/aphis-api.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-aphis',
  templateUrl: './add-aphis.component.html',
  styleUrls: ['./add-aphis.component.scss']
})
export class AddAphisComponent implements OnInit {

  readonly mainFg: FormGroup;
  readonly nameFc: FormControl;
  readonly dateFc: FormControl;
  readonly lengthOfBodyFc: FormControl;
  readonly hindFemoraLengthFc: FormControl;
  readonly hindTibiaLenghtFc: FormControl;
  readonly numberOfSetaeOnCaudaFc: FormControl;
  readonly caudaLengthFc: FormControl;
  readonly fileFc: FormControl;

  // @ts-ignore
  private file: File;

  submitted = false;

  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private aphisApiService: AphisApiService,
  ) {
    const positiveRealNumberValidator = this.createValidator(Validators.pattern("^-?[0-9]+([.,][0-9]+)?$"), 'Wymagana liczba rzeczywista dodatnia');

    this.nameFc = new FormControl(null, this.createValidator(Validators.required, 'Nazwa gatunku nie może być pusta'));
    this.dateFc = new FormControl(null); // this.createValidator(Validators.required, 'Należy wypełnić datę pozyskania')
    this.lengthOfBodyFc = new FormControl(null, positiveRealNumberValidator);
    this.hindFemoraLengthFc = new FormControl(null, positiveRealNumberValidator);
    this.hindTibiaLenghtFc = new FormControl(null, positiveRealNumberValidator);
    this.numberOfSetaeOnCaudaFc = new FormControl(null, this.createValidator(Validators.pattern("^[0-9]*$"), 'Wymagana liczba całkowita dodatnia')); // tylko nieujemne integery
    this.caudaLengthFc = new FormControl(null, positiveRealNumberValidator);
    this.fileFc = new FormControl();

    this.mainFg = new FormGroup({
      name: this.nameFc,
      date: this.dateFc,
      lengthOfBody: this.lengthOfBodyFc,
      hindFemoraLength: this.hindFemoraLengthFc,
      hindTibiaLenght: this.hindTibiaLenghtFc,
      numberOfSetaeOnCauda: this.numberOfSetaeOnCaudaFc,
      caudaLength: this.caudaLengthFc,
      file: this.fileFc
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
    this.aphisApiService.create({
      name: this.nameFc.value,
      date: this.dateFc.value,
      length_of_body: this.lengthOfBodyFc.value,
      hind_femora_length: this.hindFemoraLengthFc.value,
      hind_tibia_lenght: this.hindTibiaLenghtFc.value,
      number_of_setae_on_cauda: this.numberOfSetaeOnCaudaFc.value,
      cauda_length: this.caudaLengthFc.value,
      image_url: this.file.name
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
    const formData = new FormData();
    formData.append('file', this.file);
    this.aphisApiService.post_image(formData).subscribe(
      (res) => {
        console.log(res);
        console.log(res.file);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  newAphid(): void {
    this.submitted = false;
    this.mainFg.reset();
  }

  onFileSelect(event: Event) {
    console.log('Wlazło na file select')
    // @ts-ignore
    if (event.target.files.length > 0) {
      // @ts-ignore
      this.file = event.target.files[0];
      this.fileFc.setValue(this.file.name);
      console.log(this.fileFc.value);
    }
  }

  createValidator(baseValidatorFn: ValidatorFn, errorMessage: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } | null =>
      baseValidatorFn(control) ? {numericValidator: errorMessage} : null;
  }

}
