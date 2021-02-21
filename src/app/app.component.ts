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
      `text`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/text.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `research`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/research.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `forward`,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            '../assets/icons/forward.svg'
          )
        );
        this.matIconRegistry.addSvgIcon(
          `backward`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(
              '../assets/icons/backward.svg'
            )
          );
    this.matIconRegistry.addSvgIcon(
      `arrow_left`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/arrow_left.svg'
        )
      );
      this.matIconRegistry.addSvgIcon(
        `arrow_right`,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            '../assets/icons/arrow_right.svg'
          )
        );
    this.matIconRegistry.addSvgIcon(
      `morph-condition`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/morph-condition.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `work-condition`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/work-condition.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
    `checked`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/checked.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `unchecked`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/unchecked.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `filter_remove`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/filter_remove.svg'
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
      `export`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/export.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `info`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/info.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `books`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/books.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `notae`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/notae.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `comment`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/comment.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `comment_open`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/comment_open.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `comment_close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/comment_close.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `versio`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/versio.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `rus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/rus.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `lat`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/lat.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `translate`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/translate.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `options`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/options.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `play`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/play.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `share`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/share.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `taxonomy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/taxonomy.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `add_text`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/add_text.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `add_index`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/add_index.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `chevron_right`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/chevron_right.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `expand_more`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/expand_more.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `delete`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/delete.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `add`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/add.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `project_folder`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/project_folder.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `folder_open`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/folder_open.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `login`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/login.svg'
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
      `menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/menu.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `more_vert`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/more_vert.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `admin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/admin.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `edit`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/edit.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `project`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/project.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `role`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/role.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `perm`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/perm.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `dashboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/dashboard.svg'
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
      `settings`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/settings.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `text_search`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/text_search.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `person_search`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/person_search.svg'
      )
    );
  }

  ngOnInit(): void {}
}
