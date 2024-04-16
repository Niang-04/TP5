import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceOiseauComponent } from './especeoiseau.component';

describe('EspeceoiseauComponent', () => {
  let component: EspeceOiseauComponent;
  let fixture: ComponentFixture<EspeceOiseauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceOiseauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceOiseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
