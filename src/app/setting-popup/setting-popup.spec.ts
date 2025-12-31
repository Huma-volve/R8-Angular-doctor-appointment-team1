import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPopup } from './setting-popup';

describe('SettingPopup', () => {
  let component: SettingPopup;
  let fixture: ComponentFixture<SettingPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
