import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dcard } from './dcard';

describe('Dcard', () => {
  let component: Dcard;
  let fixture: ComponentFixture<Dcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
