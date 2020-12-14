import { AppType } from '@shared/constants';
import { Model } from './base/model';


export class User extends Model {
    type = AppType.User;
    email: string;
    password: string;

    public constructor(fields: Partial<User>) {
        super();
        Object.assign(this, fields);
     }
}