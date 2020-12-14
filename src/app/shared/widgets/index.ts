import { CardComponent } from './card/card.component';
import { DialogActionComponent } from './dialog-action/dialog-action.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { GridComponent } from './grid/grid.component';
import { TableComponent } from './table/table.component';

export const widgets: any[] = [
    CardComponent,
    DialogActionComponent,
    DialogContentComponent,
    DialogHeaderComponent,
    GridComponent,
    TableComponent
];

export * from './card/card.component';
export * from './dialog-action/dialog-action.component';
export * from './dialog-content/dialog-content.component';
export * from './dialog-header/dialog-header.component';
export * from './grid/grid.component';
export * from './table/table.component';