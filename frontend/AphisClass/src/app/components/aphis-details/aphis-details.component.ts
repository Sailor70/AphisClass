import {Component, Input, OnInit} from '@angular/core';
import {Aphid} from 'src/app/models/aphid.model';
import {AphisApiService} from 'src/app/services/aphis-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-aphis-details',
  templateUrl: './aphis-details.component.html',
  styleUrls: ['./aphis-details.component.scss']
})
export class AphisDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentAphid: Aphid = {};

  readonly mainFg: FormGroup;
  readonly nameFc: FormControl;
  readonly dateFc: FormControl;
  readonly lengthOfBodyFc: FormControl;
  readonly hindFemoraLengthFc: FormControl;
  readonly hindTibiaLenghtFc: FormControl;
  readonly numberOfSetaeOnCaudaFc: FormControl;
  readonly caudaLengthFc: FormControl;

  message = '';

  constructor(
    private aphisApiService: AphisApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const positiveRealNumberValidator = this.createValidator(Validators.pattern("^-?[0-9]+([.,][0-9]+)?$"), 'Wymagana liczba rzeczywista dodatnia');

    this.nameFc = new FormControl(null, this.createValidator(Validators.required, 'Nazwa gatunku nie może być pusta'));
    this.dateFc = new FormControl(null); // this.createValidator(Validators.required, 'Należy wypełnić datę pozyskania')
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
    if (!this.viewMode) {
      this.message = '';
      this.getAphid(this.route.snapshot.params["id"]);
    }
  }

  getAphid(id: string): void {
    this.aphisApiService.get(id)
      .subscribe({
        next: (data) => {
          this.currentAphid = data;
          this.aphidToForm()
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  aphidToForm(): void {
    this.nameFc.setValue(this.currentAphid.name);
    this.dateFc.setValue(this.currentAphid.date);
    this.lengthOfBodyFc.setValue(this.currentAphid.length_of_body);
    this.hindFemoraLengthFc.setValue(this.currentAphid.hind_femora_length);
    this.hindTibiaLenghtFc.setValue(this.currentAphid.hind_tibia_lenght);
    this.numberOfSetaeOnCaudaFc.setValue(this.currentAphid.number_of_setae_on_cauda);
    this.caudaLengthFc.setValue(this.currentAphid.cauda_length);
    console.log(this.nameFc.value);
  }

  updateAphid(): void {
    this.message = '';
    this.aphisApiService.update(
      this.currentAphid.id,
      {
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
          this.message = res.message ? res.message : 'Pomyślnie zaktualizowano dane mszycy';
        },
        error: (e) => console.error(e)
      });
  }

  deleteAphid(): void {
    this.aphisApiService.delete(this.currentAphid.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/aphids']);
        },
        error: (e) => console.error(e)
      });
  }

  createValidator(baseValidatorFn: ValidatorFn, errorMessage: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } | null =>
      baseValidatorFn(control) ? {numericValidator: errorMessage} : null;
  }

}
