import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongsAndArtistsComponent } from './top-songs-and-artists.component';

describe('TopSongsAndArtistsComponent', () => {
  let component: TopSongsAndArtistsComponent;
  let fixture: ComponentFixture<TopSongsAndArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSongsAndArtistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongsAndArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
