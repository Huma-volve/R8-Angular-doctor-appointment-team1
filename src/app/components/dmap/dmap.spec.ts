import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dmap } from './dmap';

describe('Dmap', () => {
  let component: Dmap;
  let fixture: ComponentFixture<Dmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dmap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dmap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
