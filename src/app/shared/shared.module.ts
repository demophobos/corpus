import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';
import * as fromSharedComponents from './components';
import * as fromSharedWidgets from './widgets';
import { RedirectService } from './services/redirect.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { AngularSplitModule } from 'angular-split';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { KeysPipe } from './pipes/keys.pipe';
import {MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [
    ...fromSharedWidgets.widgets,
    ...fromSharedComponents.components,
    KeysPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatTableModule,
    MatTreeModule,
    AngularSplitModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  exports: [
    ...fromSharedWidgets.widgets,
    ...fromSharedComponents.components,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatTreeModule,
    AngularSplitModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCheckboxModule,
    KeysPipe,
    MatChipsModule
  ],
  providers: [
    DialogService,
    RedirectService
  ]
})
export class SharedModule { }
