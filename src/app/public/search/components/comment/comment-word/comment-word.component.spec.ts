import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentWordComponent } from './comment-word.component';

describe('CommentWordComponent', () => {
  let component: CommentWordComponent;
  let fixture: ComponentFixture<CommentWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
