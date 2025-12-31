import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCard } from './add-new-card';

describe('AddNewCard', () => {
  let component: AddNewCard;
  let fixture: ComponentFixture<AddNewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
