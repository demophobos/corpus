import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-chunk-set',
  templateUrl: './chunk-set.component.html',
  styleUrls: ['./chunk-set.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChunkSetComponent extends BaseComponent implements OnInit {
  @Input() showVersion: boolean = false;
  showNotes: boolean = true;
  showVersionNotes: boolean = true;
  versionIsLoading: boolean = true;
  versions: ChunkView[];
  emptyVersionInfo: string;
  @Input() chunk: ChunkView;
  @Input() showMainHeaderCode: boolean = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.showVersion == true) {
      this.loadVersions();
    } else {
      this.versions = null;
    }
    if (
      changes.chunk &&
      changes.chunk.currentValue &&
      changes.chunk.previousValue
    ) {
      if (changes.chunk.currentValue.id !== changes.chunk.previousValue.id) {
        this.searchService.getNoteLinks(changes.chunk.currentValue.indexId);
        if (this.showVersion == true) {
          this.loadVersions();
        } else {
          this.versions = null;
        }
      }
    }
  }

  private loadVersions() {
    this.versionIsLoading = true;
    this.searchService
      .getInterp(this.chunk.id, this.chunk.headerLang == Language.Latin)
      .then((values: ChunkView[]) => {
        if (values.length > 0) {
          this.versions = values;
        } else {
          this.versions = null;
          this.emptyVersionInfo = 'versio deest';
        }
      })
      .then(() => {
        this.versionIsLoading = false;
        Promise.resolve();
      });
  }
}
