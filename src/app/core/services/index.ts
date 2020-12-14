import { SnackBarService } from './snack-bar.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

export const coreServices: any[] = [
    SnackBarService,
    ApiService,
    AuthService
];

export * from './snack-bar.service';
export *  from './api.service';
export *  from './auth.service';