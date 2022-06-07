import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAphisComponent } from './add-aphis.component';

describe('AddAphisComponent', () => {
  let component: AddAphisComponent;
  let fixture: ComponentFixture<AddAphisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAphisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAphisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
