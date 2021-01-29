import { Component, Input, OnInit } from '@angular/core';
import { ElementView } from '@shared/models';

@Component({
  selector: 'app-comment-word',
  templateUrl: './comment-word.component.html',
  styleUrls: ['./comment-word.component.scss']
})
export class CommentWordComponent implements OnInit {
  @Input() word: ElementView;
  constructor() { }

  ngOnInit(): void {
  }

}
