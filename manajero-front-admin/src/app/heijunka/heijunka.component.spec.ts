import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeijunkaComponent } from './heijunka.component';

describe('HeijunkaComponent', () => {
  let component: HeijunkaComponent;
  let fixture: ComponentFixture<HeijunkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeijunkaComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeijunkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
