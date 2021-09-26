import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoFrozenComponent } from './logo-frozen.component';

describe('LogoFrozenComponent', () => {
  let component: LogoFrozenComponent;
  let fixture: ComponentFixture<LogoFrozenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoFrozenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoFrozenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
