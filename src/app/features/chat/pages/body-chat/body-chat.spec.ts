import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyChat } from './body-chat';

describe('BodyChat', () => {
  let component: BodyChat;
  let fixture: ComponentFixture<BodyChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
