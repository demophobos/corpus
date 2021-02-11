import { Component, Input, OnInit } from '@angular/core';
import { ChunkView } from '@shared/models';


@Component({
  selector: 'app-comment-chunk',
  templateUrl: './comment-chunk.component.html',
  styleUrls: ['./comment-chunk.component.scss']
})
export class CommentChunkComponent implements OnInit {
  @Input() chunk: ChunkView;
  constructor() { }

  ngOnInit(): void {
  }

}
