import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSetting } from './password-setting';

describe('PasswordSetting', () => {
  let component: PasswordSetting;
  let fixture: ComponentFixture<PasswordSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
