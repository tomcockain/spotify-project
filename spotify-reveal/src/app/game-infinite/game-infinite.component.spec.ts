import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfiniteComponent } from './game-infinite.component';

describe('GameInfiniteComponent', () => {
  let component: GameInfiniteComponent;
  let fixture: ComponentFixture<GameInfiniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInfiniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfiniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
