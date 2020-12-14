import { MenuItemType } from '@shared/enums';

export class MenuItem {
    title: string;
    action: number;
    link: string;
    icon: string;
    type: MenuItemType;
    
    public constructor(fields: Partial<MenuItem>) {
        Object.assign(this, fields);
    }
}