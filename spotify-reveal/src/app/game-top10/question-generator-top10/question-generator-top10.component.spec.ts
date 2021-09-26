import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGeneratorTop10Component } from './question-generator-top10.component';

describe('QuestionGeneratorTop10Component', () => {
  let component: QuestionGeneratorTop10Component;
  let fixture: ComponentFixture<QuestionGeneratorTop10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGeneratorTop10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGeneratorTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
