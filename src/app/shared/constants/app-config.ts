import { FormSearchTypeEnum } from "@shared/enums";

export const AppConfig = {
    ApiUrl: 'http://localhost:3000/v2/',
    DefaultTheme: 'indigo-pink-theme',
    DefaultDialogWidth: '800',
    DefaultLoginDialogWidth: '500',
    SessionExpiresIn: 180,
    AppFullTitle: 'Corpus Latino-Rossicum',
    AppShortTitle: 'CLR',
    DefaultPageLimit: 10,
    DefaultSearchTypeValue: FormSearchTypeEnum.Form
}