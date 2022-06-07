import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyAphidComponent } from './classify-aphid.component';

describe('ClassifyAphidComponent', () => {
  let component: ClassifyAphidComponent;
  let fixture: ComponentFixture<ClassifyAphidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifyAphidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyAphidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
