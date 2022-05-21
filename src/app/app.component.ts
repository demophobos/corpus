import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title: string;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    super();
    this.title = AppConfig.AppFullTitle;
    this.RegisterIcons();
  }
  private RegisterIcons() {
    this.matIconRegistry.addSvgIcon(
      `notes`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/notes.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `read_more`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/read_more.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `menu`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/menu.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `logo`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/logo.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `research`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/research.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `filter_plus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/filter_plus.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `stat`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/stat.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `morph`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/morph.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `info`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/info.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `comment`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/comment.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `versio`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/versio.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `save`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/save.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/close.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `home`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/home.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `search`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/search.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `read_more`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/read_more.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `works`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/works.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `copy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/copy.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `next`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/next.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `before`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/before.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `bullet`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/bullet.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `toc`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/toc.svg'
      )
    );
  }

  ngOnInit(): void {}
}
