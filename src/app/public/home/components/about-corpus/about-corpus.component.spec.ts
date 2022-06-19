import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCorpusComponent } from './about-corpus.component';

describe('AboutCorpusComponent', () => {
  let component: AboutCorpusComponent;
  let fixture: ComponentFixture<AboutCorpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCorpusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
