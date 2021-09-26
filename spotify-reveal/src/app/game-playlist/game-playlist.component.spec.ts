import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlaylistComponent } from './game-playlist.component';

describe('GamePlaylistComponent', () => {
  let component: GamePlaylistComponent;
  let fixture: ComponentFixture<GamePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
