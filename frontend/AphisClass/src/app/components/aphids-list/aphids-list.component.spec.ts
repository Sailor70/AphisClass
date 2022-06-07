import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AphidsListComponent } from './aphids-list.component';

describe('AphidsListComponent', () => {
  let component: AphidsListComponent;
  let fixture: ComponentFixture<AphidsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AphidsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AphidsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
