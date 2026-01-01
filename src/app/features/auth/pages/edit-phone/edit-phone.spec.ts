import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhone } from './edit-phone';

describe('EditPhone', () => {
  let component: EditPhone;
  let fixture: ComponentFixture<EditPhone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPhone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPhone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
