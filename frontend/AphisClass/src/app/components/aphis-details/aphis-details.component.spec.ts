import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AphisDetailsComponent } from './aphis-details.component';

describe('AphisDetailsComponent', () => {
  let component: AphisDetailsComponent;
  let fixture: ComponentFixture<AphisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AphisDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AphisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
