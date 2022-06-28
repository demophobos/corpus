import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-result-chunk-set',
  templateUrl: './result-chunk-set.component.html',
  styleUrls: ['./result-chunk-set.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultChunkSetComponent extends BaseComponent implements OnInit {
  @Input() showInterp: boolean = false;
  showNotes: boolean = true;
  showInterpNotes: boolean = true;
  interpIsLoading: boolean = true;
  interpChunks: ChunkView[];
  emptyInterpInfo: string;
  @Input() chunk: ChunkView;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.showInterp == true) {
      this.loadInterpData();
    } else {
      this.interpChunks = null;
    }
    if (
      changes.chunk &&
      changes.chunk.currentValue &&
      changes.chunk.previousValue
    ) {
      if (changes.chunk.currentValue.id !== changes.chunk.previousValue.id) {
        this.searchService.getNoteLinks(changes.chunk.currentValue.indexId);
        if (this.showInterp == true) {
          this.loadInterpData();
        } else {
          this.interpChunks = null;
        }
      }
    }
  }

  private loadInterpData() {
    this.interpIsLoading = true;
    this.searchService
      .getInterp(this.chunk.id, this.chunk.headerLang == Language.Latin)
      .then((values: ChunkView[]) => {
        if (values.length > 0) {
          this.interpChunks = values;
        } else {
          this.interpChunks = null;
          this.emptyInterpInfo = 'versio deest';
        }
      })
      .then(() => {
        this.interpIsLoading = false;
        Promise.resolve();
      });
  }
}
