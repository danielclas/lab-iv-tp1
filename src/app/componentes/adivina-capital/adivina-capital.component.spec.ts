import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaCapitalComponent } from './adivina-capital.component';

describe('AdivinaCapitalComponent', () => {
  let component: AdivinaCapitalComponent;
  let fixture: ComponentFixture<AdivinaCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdivinaCapitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
