import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGeneratorPlaylistComponent } from './question-generator-playlist.component';

describe('QuestionGeneratorPlaylistComponent', () => {
  let component: QuestionGeneratorPlaylistComponent;
  let fixture: ComponentFixture<QuestionGeneratorPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGeneratorPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGeneratorPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
