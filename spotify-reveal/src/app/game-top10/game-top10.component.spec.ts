import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTop10Component } from './game-top10.component';

describe('GameTop10Component', () => {
  let component: GameTop10Component;
  let fixture: ComponentFixture<GameTop10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTop10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
