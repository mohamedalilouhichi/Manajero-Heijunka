import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeijunkaboxComponent } from './heijunkabox.component';

describe('HeijunkaboxComponent', () => {
  let component: HeijunkaboxComponent;
  let fixture: ComponentFixture<HeijunkaboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeijunkaboxComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeijunkaboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
