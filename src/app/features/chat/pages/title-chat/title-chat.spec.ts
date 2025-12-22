import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleChat } from './title-chat';

describe('TitleChat', () => {
  let component: TitleChat;
  let fixture: ComponentFixture<TitleChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
