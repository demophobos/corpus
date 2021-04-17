import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkComponent } from './chunk.component';

describe('ChunkComponent', () => {
  let component: ChunkComponent;
  let fixture: ComponentFixture<ChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChunkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
