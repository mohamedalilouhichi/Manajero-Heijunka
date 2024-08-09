import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestheijunkaboxComponent } from './latestheijunkabox.component';

describe('HeijunkaboxComponent', () => {
  let component: LatestheijunkaboxComponent;
  let fixture: ComponentFixture<LatestheijunkaboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestheijunkaboxComponent ]})
    .compileComponents();

    fixture = TestBed.createComponent(LatestheijunkaboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
