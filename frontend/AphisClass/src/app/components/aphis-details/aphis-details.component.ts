import {Component, Input, OnInit} from '@angular/core';
import { Aphid } from 'src/app/models/aphid.model';
import { AphisApiService } from 'src/app/services/aphis-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aphis-details',
  templateUrl: './aphis-details.component.html',
  styleUrls: ['./aphis-details.component.scss']
})
export class AphisDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentAphid: Aphid = {
    name: '',
    date: '',
    length_of_body: 0
  };

   message = '';
  JSON: any;
  constructor(
    private aphisApiService: AphisApiService,
    private route: ActivatedRoute,
    private router: Router) { }
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
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateAphid(): void {
    this.message = '';
    this.aphisApiService.update(this.currentAphid.id, this.currentAphid)
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

}
